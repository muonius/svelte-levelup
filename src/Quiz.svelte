<script>
  import { fade, blur, fly, slide, scale } from "svelte/transition";
  import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
  // it will have an callback
  import Question from "./Question.svelte";
  import Modal from "./Modal.svelte";
  import { score } from "./store.js";

  let quiz = getQuiz();
  let activeQuestion = 0;
  let isModalOpen = false;

  onMount(() => {
    console.log("I mounted");
  });

  beforeUpdate(() => {
    console.log("before Update");
  });

  afterUpdate(() => {
    console.log("after Update");
  });

  onDestroy(() => {
    console.log("on destroy");
  });
  //only work on the client side

  async function getQuiz() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=25&type=multiple"
    );
    const quiz = await res.json();
    return quiz;
    // debugger;
  }

  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }

  function resetQuiz() {
    score.set(0);
    activeQuestion = 0;
    isModalOpen = false;
    quiz = getQuiz();
  }

  //reactive statement
  $: if ($score > 0) {
    isModalOpen = true;
  }

  $: questionNumber = activeQuestion + 1;
</script>

<div>
  <button on:click|once={resetQuiz}>Start New Quiz</button>

  <h3>My Score: {$score}</h3>
  <!-- reactive declaration -->
  <h4>Question #{questionNumber}</h4>

  <div class="container">
    {#await quiz}
      Loading...
    {:then data}
      {#each data.results as question, index}
        {#if index === activeQuestion}
          <div in:fly={{ x: 100 }} out:fly={{ x: -200 }} class="fade-wrapper">
            <Question {nextQuestion} {question} />
          </div>
        {/if}
      {/each}
    {/await}
  </div>
</div>
{#if isModalOpen}
  <Modal on:close={resetQuiz}>
    <h2>You won!</h2>
    <p>Congratualtions!</p>
    <button on:click={resetQuiz}>Start Over</button>
  </Modal>
{/if}

<style>
  .fade-wrapper {
    position: absolute;
  }

  .container {
    min-height: 500px;
  }
</style>
