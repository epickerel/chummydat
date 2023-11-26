var getRooms = async (app) => {
  let rooms = await app.db.getAll(app.constants.collections.rooms.name);
  if (!rooms?.length) {
    rooms = await app.chatHost.fetchRooms();
  }
  return rooms || [];
};
