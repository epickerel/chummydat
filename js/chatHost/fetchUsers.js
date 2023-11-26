var fetchUsers = async (app) => {
  const db = app.db;
  console.log("fetching users");
  // Note: I don't like side effects, but this is a quick and dirty way to do this
  db.deleteAll(app.constants.collections.users.name);
  const users = await (await fetch(`${app.constants.hostUrl}/users`)).json();
  for (const user of users) {
    await db.insert(app.constants.collections.users.name, user);
  }
  return users;
};
