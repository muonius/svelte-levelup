<script>
  import Quiz from "./Quiz.svelte";
</script>

<h1>Level Up Art Quiz</h1>
<div>
  <Quiz />
</div>

<style>
  :global(body) {
    background: purple;
  }

  h1 {
    color: white;
    text-align: center;
  }

  div {
    background: white;
    border-radius: 15px;
    padding: 40px;
  }
</style>
