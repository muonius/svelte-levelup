<script>
  export let question;
  export let nextQuestion;

  let isCorrect;
  let isAnswered = false;
  let answers = question.incorrect_answers.map((answer) => {
    return {
      answer,
      correct: false,
    };
  });

  let allAnswers = [
    ...answers,
    {
      answer: question.correct_answer,
      correct: true,
    },
  ];

  shuffle(allAnswers);

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function checkQuestion(correct) {
    isAnswered = true;
    isCorrect = correct;
  }

  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }
</script>

<h3>
  <!-- this cleans up html -->
  {@html question.question}
</h3>
{#if isAnswered}
  <h5>
    {#if isCorrect}
      You got it right
    {:else}
      You goofed up
    {/if}
  </h5>
{/if}
{#each allAnswers as answer}
  <button disabled={isAnswered} on:click={() => checkQuestion(answer.correct)}
    >{@html answer.answer}</button
  >
{/each}
<br />
{#if isAnswered}
  <button on:click={nextQuestion}>Next Question</button>
{/if}
