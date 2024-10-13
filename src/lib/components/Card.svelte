<script lang="ts">
  export let title: string;
  export let imageUrl: string;
  export let onAddCard: () => void;
  export let isLastCard: boolean;

  let inputValue = "";

  function handleAddCard() {
    console.log("Add card button clicked"); // Debug log
    onAddCard();
  }
</script>

<div class="flex items-center">
  <div class="bg-white shadow-md rounded-lg p-6 m-4 w-96">
    <h2 class="text-xl font-bold mb-2">{title}</h2>

    <img
      src={imageUrl}
      alt={"Image here"}
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
  </div>

  {#if isLastCard}
    <button
      on:click={handleAddCard}
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ml-2"
    >
      +
    </button>
  {/if}
</div>
