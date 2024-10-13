<script lang="ts">
  export let title: string;
  export let onAddCard: (imageUrl: string, description: string) => void;
  export let isLastCard: boolean;
  export let previousImageDescription: string = "";

  let inputValue = "";
  let savedInput = "";
  let savedImageUrl = "";
  let isImageGenerated = false;
  let imageDescription = "";
  let isLoading = false;

  function handleAddCard() {
    console.log("Add card button clicked");
    savedInput = inputValue;
    onAddCard(savedImageUrl, imageDescription);
  }

  async function generateImage() {
    isLoading = true;
    isImageGenerated = true;
    try {
      const basePrompt = `Generate a single high-quality storyboard style image using this script: ${inputValue}. The image should depict a single scene or moment, not a grid or multiple images.`;
      const fullPrompt = previousImageDescription
        ? `${basePrompt} Maintain consistency with the previous image, which was described as: ${previousImageDescription}. Ensure the style, color palette, and overall aesthetic are similar.`
        : basePrompt;

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });

      const data = await response.json();
      savedImageUrl = data.imageUrl; // Update savedImageUrl directly
      imageDescription = data.description || inputValue;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isImageGenerated = false;
      isLoading = false;
    }
  }

  $: isInputEmpty = !inputValue.trim();
  $: isAddButtonDisabled = isInputEmpty || !savedImageUrl;
  $: isGenerateButtonDisabled = isInputEmpty;
</script>

<div class="flex items-stretch">
  <div class="bg-white shadow-md rounded-lg p-6 m-4 w-96 flex flex-col">
    <h2 class="text-xl font-bold mb-2">{title}</h2>

    <img
      src={savedImageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
      alt={"Card image"}
      class="w-full h-48 object-cover mb-4 rounded"
    />

    <div class="flex-grow flex flex-col">
      <textarea
        bind:value={inputValue}
        placeholder="Enter your description here..."
        class="border rounded px-2 py-1 w-full h-32 resize-none mb-2"
      ></textarea>
      <div class="flex-grow">
        {#if savedInput}
          <div class="border rounded p-2 h-full">
            <p class="font-semibold">You entered:</p>
            <textarea
              class="border rounded px-2 py-1 w-full h-32 resize-none mb-2 overflow-y-auto"
              readonly>{savedInput}</textarea
            >
          </div>
        {/if}
      </div>
    </div>

    <button
      on:click={generateImage}
      disabled={isLoading}
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {#if isLoading}
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Generating...
      {:else}
        Generate Image
      {/if}
    </button>
  </div>

  {#if isLastCard}
    <button
      on:click={handleAddCard}
      disabled={isAddButtonDisabled}
      class="self-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      +
    </button>
  {/if}
</div>
