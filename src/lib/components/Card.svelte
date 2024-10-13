<script lang="ts">
  export let title: string;
  export let imageUrl: string;
  export let onAddCard: () => void;
  export let isLastCard: boolean;

  let inputValue = "";
  let isImageGenerated = false;

  function handleAddCard() {
    console.log("Add card button clicked"); // Debug log
    onAddCard();
  }

  function generateImage() {
    // For now, just set a placeholder image URL
    imageUrl = "https://via.placeholder.com/300x200";
    isImageGenerated = true;
  }

  $: isInputEmpty = !inputValue.trim();
  $: isAddButtonDisabled = isInputEmpty || !imageUrl;
  $: isGenerateButtonDisabled = isInputEmpty;
</script>

<div class="flex items-center">
  <div class="bg-white shadow-md rounded-lg p-6 m-4 w-96">
    <h2 class="text-xl font-bold mb-2">{title}</h2>

    <img
      src={imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
      alt={"Card image"}
      class="w-full h-48 object-cover mb-4 rounded"
    />

    <div class="mb-4">
      <textarea
        bind:value={inputValue}
        placeholder="Enter your description here..."
        class="border rounded px-2 py-1 w-full h-32 resize-none"
      ></textarea>
      <p class="mt-2">You entered:</p>
      <p class="mt-1 p-2 bg-gray-100 rounded">{inputValue}</p>
    </div>

    <button
      on:click={generateImage}
      disabled={isGenerateButtonDisabled}
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isImageGenerated ? "Generate New Image" : "Generate Image"}
    </button>
  </div>

  {#if isLastCard}
    <button
      on:click={handleAddCard}
      disabled={isAddButtonDisabled}
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      +
    </button>
  {/if}
</div>
