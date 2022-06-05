<script>
  import { fade, blur, fly, slide, scale } from "svelte/transition";
  import Question from "./Question.svelte";
  let quiz = getQuiz();
  let activeQuestion = 0;
  let score = 0;

  async function getQuiz() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=25&type=multiple"
    );
    const quiz = await res.json();
    return quiz;
    // debugger;
  }

  // function handleClick() {
  //   quiz = getQuiz();
  // }
  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }

  function resetQuiz() {
    score = 0;
    quiz = getQuiz();
  }

  function addToScore() {
    score = score + 1;
  }
</script>

<div>
  <button on:click={resetQuiz}>Start New Quiz</button>

  <h3>My Score: {score}</h3>
  <h4>Question #{activeQuestion + 1}</h4>

  {#await quiz}
    Loading...
  {:then data}
    {#each data.results as question, index}
      {#if index === activeQuestion}
        <div in:fly={{ x: 100 }} out:fly={{ x: -200 }} class="fade-wrapper">
          <Question {addToScore} {nextQuestion} {question} />
        </div>
      {/if}
    {/each}
  {/await}
</div>

<style>
  .fade-wrapper {
    position: absolute;
  }
</style>
