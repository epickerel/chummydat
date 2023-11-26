var postMessage = async (app, text) => {
  const db = app.db;
  const { roomId, userId } = app.state;
  const message = {
    sender: userId,
    text,
  };
  const response = await fetch(
    `${app.constants.hostUrl}/rooms/${roomId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );
  const newMessage = await response.json();
  try {
    await db.insert(app.constants.collections.messages.name, newMessage);
  } catch (error) {
    console.error(error);
  }
};
