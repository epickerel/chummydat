var handlePostMessageClick = async (app, text) => {
  await app.chatHost.postMessage(text);
  await app.chatWindow.update();
};
