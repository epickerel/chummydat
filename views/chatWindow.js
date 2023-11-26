var chatWindow = async (app, container) => {
  const usersMap = app.users.reduce((acc, user) => {
    acc[user.id] = user.fullName;
    return acc;
  }, {});
  const render = async () => {
    const roomId = app.state.roomId;
    const messages = await app.chatHost.fetchRoomChat(roomId);
    const html = `
      <ul>
        ${messages
          .map((message) => {
            return `
              <li class="message">
                <div class="message-author">${usersMap[message.sender]}</div>
                <div class="message-text">${message.text}</div>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
    container.innerHTML = html;
  };
  app.chatWindow = {
    update: render,
  };
  await render();
};
