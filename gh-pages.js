let ghpages = require("gh-pages");

ghpages.publish(
  "public", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/muonius/svelte-levelup.git", // Update to point to your repository
    user: {
      name: "muonius", // update to use your name
      email: "freda.y.zhao@gmail.com", // Update to use your email
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
