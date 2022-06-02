<script>
  let result = "";
  let correctAnswer = "b";
  let answers = ["a", "b", "c", "d"];
  let quiz = getQuiz();

  function pickAnswer(answer) {
    if (answer === correctAnswer) {
      result = "Correct!";
    } else {
      result = "OOPS";
    }
  }

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
</script>

<div>
  <button on:click={handleClick}>Get Questions </button>
  {#if result}
    <h4>{result}</h4>
  {:else}
    <h5>Please pick an answer</h5>
  {/if}

  {#await quiz}
    Loading...
  {:then data}
    <h3>
      {data.results[0].question}
    </h3>
  {/await}

  {#each answers as answer}
    <button on:click={() => pickAnswer(answer)}
      >Answer {answer.toUpperCase()}
    </button>
  {/each}
</div>

<style>
  /* h4 {
    color: red;
  } */
</style>
