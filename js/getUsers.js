var getUsers = async (app) => {
  let users = await app.db.getAll(app.constants.collections.users.name);
  if (!users?.length) {
    users = await app.chatHost.fetchUsers();
  }
  return users || [];
};
