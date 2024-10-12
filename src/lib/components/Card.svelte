<script lang="ts">
  export let title: string;
  export let imageUrl: string;

  let inputValue = "";
</script>

<div class="bg-white shadow-md rounded-lg p-6 m-4 w-96">
  <h2 class="text-xl font-bold mb-2">{title}</h2>

  <img
    src={imageUrl}
    alt={'Image here'}
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
