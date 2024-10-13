<script lang="ts">
    // import { TwelveLabs, SearchData, Task } from 'twelvelabs-js';
    // import { promises as fsPromises } from 'fs';
    // import * as path from 'path';
  import Card from "$lib/components/Card.svelte";
  import { writable } from "svelte/store";

  const cards = writable([{ title: "Card 1", imageUrl: "" }]);

  function addCard() {
    cards.update((currentCards) => {
      console.log("Adding new card"); // Debug log
      const newCard = {
        title: `Card ${currentCards.length + 1}`,
        imageUrl: "",
      };
      return [...currentCards, newCard];
    });
  }

  // Debug: Log cards when they change
  $: console.log("Current cards:", $cards);
</script>

<h1 class="text-2xl">Storyboard</h1>

<div class="border flex flex-wrap justify-center">
  {#each $cards as card, index (index)}
    <Card
      title={card.title}
      imageUrl={card.imageUrl}
      onAddCard={addCard}
      isLastCard={index === $cards.length - 1}
    />
  {/each}
</div>

<!-- <button class="" on:click={}>Generate a Trailer</button> -->
