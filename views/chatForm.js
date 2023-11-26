var chatForm = async (app, container) => {
  const handlePostMessageClick = await loadScript(
    "js/handlePostMessageClick.js",
    "handlePostMessageClick"
  );
  const html = `
        <form class="chat-window__form">
            <input type="text" name="message" />
            <button type="submit">Send</button>
        </form>
    `;
  container.innerHTML = html;
  const submitButton = container.querySelector("button");
  const input = container.querySelector("input");
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await handlePostMessageClick(app, input.value);
    input.value = "";
  });
};
