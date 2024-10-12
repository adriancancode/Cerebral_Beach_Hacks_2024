<script lang="ts">
  export let title: string;
  export let content: string;

  let count = 0;

  function incrementCount() {
    count += 1;
  }
</script>

<div class="bg-white shadow-md rounded-lg p-6 m-4">
  <h2 class="text-xl font-bold mb-2">{title}</h2>
  <p>{content}</p>
  <div class="mb-4">
    <p>Count: {count}</p>
    <button
      on:click={incrementCount}
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >Increment</button
    >
  </div>
</div>
