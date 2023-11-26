var fetchRoomChat = async (app, roomId) => {
  const db = app.db;
  const currentMessages = await db.getAll(
    app.constants.collections.messages.name
  );
  const messages = await (
    await fetch(`${app.constants.hostUrl}/rooms/${roomId}/messages`)
  ).json();
  for (const message of messages) {
    if (currentMessages.find((m) => m.id !== message.id)) {
      await db.insert(app.constants.collections.messages.name, message);
    }
  }
  return messages?.length ? messages : currentMessages;
};
