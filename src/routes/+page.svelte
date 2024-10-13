<script lang="ts">
  import Start from "$lib/components/Start.svelte";
  import SourceCode from "$lib/components/SourceCode.svelte";
</script>

<div class="min-h-screen flex flex-col">
  <main class="flex-grow flex items-center mx-auto p-4">
    <div class="flex flex-col md:flex-row gap-4 justify-center">
      <section class="w-full md:w-5/12 text-center">
        <h1 class="text-6xl font-bold mb-6">Trailer GPT</h1>
        <p class="text-xl">
          Generate a trailer for a horror movie based on your personal
          requirements using this AI-Powered Movie Trailer Generator
        </p>
      </section>
      <section class="flex items-center justify-center">
        <Start />
      </section>
    </div>
  </main>
  <SourceCode />

  <footer class="py-4">
    <p class="text-center text-sm">
      2024 Adrian Vazquez, Kyle Ho, and Daniel Rubio
    </p>
  </footer>
</div>
