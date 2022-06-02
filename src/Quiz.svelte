<script>
  import Question from "./Question.svelte";
  let quiz = getQuiz();
  let activeQuestion = 1;

  async function getQuiz() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=25&type=multiple"
    );
    const quiz = await res.json();
    return quiz;
    // debugger;
  }

  function handleClick() {
    quiz = getQuiz();
  }
  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }
</script>

<div>
  <button on:click={handleClick}>Start New Quiz</button>

  <h3>My Score: 0</h3>

  {#await quiz}
    Loading...
  {:then data}
    {#each data.results as question, index}
      {#if index === activeQuestion}
        <Question {nextQuestion} {question} />
      {/if}
    {/each}
  {/await}
</div>
