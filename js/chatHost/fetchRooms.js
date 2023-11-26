var fetchRooms = async (app) => {
  const db = app.db;
  // Note: I don't like side effects, but this is a quick and dirty way to do this
  db.deleteAll(app.constants.collections.rooms.name);
  const rooms = await (
    await fetch(`${app.constants.hostUrl}/users/${app.state.userId}/rooms`)
  ).json();
  for (const room of rooms) {
    await db.insert(app.constants.collections.rooms.name, room);
  }
  return rooms;
};
