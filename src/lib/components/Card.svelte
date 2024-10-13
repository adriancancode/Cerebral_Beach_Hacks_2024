<script lang="ts">
  export let title: string;
  export let imageUrl: string;
  export let onAddCard: () => void;
  export let isLastCard: boolean;

  let inputValue = "";
  let savedInput = "";
  let isImageGenerated = false;

  function handleAddCard() {
    console.log("Add card button clicked"); // Debug log
    onAddCard();
  }

  async function generateImage() {
    isImageGenerated = true;
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: inputValue
        })
      });
      

      const data = await response.json();
      imageUrl = data.imageUrl;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isImageGenerated = false;
    }
  }

  $: isInputEmpty = !inputValue.trim();
  $: isAddButtonDisabled = isInputEmpty || !imageUrl;
  $: isGenerateButtonDisabled = isInputEmpty;
</script>

<div class="flex items-stretch">
  <div class="bg-white shadow-md rounded-lg p-6 m-4 w-96 flex flex-col">
    <h2 class="text-xl font-bold mb-2">{title}</h2>

    <img
      src={imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
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
      disabled={isGenerateButtonDisabled}
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isImageGenerated ? "Generate New Image" : "Generate Image"}
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
