<script lang="ts">
  import "../app.css";
</script>

<nav class="bg-stone-900 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="text-white text-xl font-bold">Trailer GPT</a>
    <ul class="flex space-x-4 text-orange-500">
      <li><a href="/" class="hover:text-white">Home</a></li>
      <li>
        <a href="/storyboard" class="hover:text-white">Storyboard</a>
      </li>
      <!-- Add more navigation items as needed -->
    </ul>
  </div>
</nav>

<main class="container mx-auto mt-8">
  <slot />
</main>
