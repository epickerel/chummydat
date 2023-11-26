const App = async () => {
  const appView = await loadScript("views/appView.js", "appView");
  const app = {
    db: null,
    chatHost: null,
    state: {
      userId: null,
      roomId: null,
    },
    users: null,
    rooms: null,
    render: async () => {
      await appView(app);
    },
    constants: await loadScript("js/constants.js", "constants"),
  };
  const startApp = async () => {
    const appState = await loadScript("js/appState.js", "appState");
    const createChatHost = await loadScript(
      "js/chatHost/createChatHost.js",
      "createChatHost"
    );
    const createDb = await loadScript("js/database/createDb.js", "createDb");
    const getUsers = await loadScript("js/getUsers.js", "getUsers");
    const getRooms = await loadScript("js/getRooms.js", "getRooms");
    app.chatHost = await createChatHost(app);
    app.db = await createDb(app);
    app.users = await getUsers(app);
    const { user: activeUser, room: activeRoom } = appState.get();
    if (activeUser) {
      app.state.userId = activeUser;
      app.rooms = await getRooms(app);
      if (activeRoom) {
        app.state.roomId = activeRoom;
      } else {
        //        app.state.roomId = app.rooms[0].id;
        appState.set(activeUser, app.rooms[0].id);
      }
    } else {
      // no user, so delete user-specific data from local db
      // edge case not handled: user switched via url without logout
      await app.db.deleteAll(app.constants.collections.rooms.name);
      await app.db.deleteAll(app.constants.collections.messages.name);
    }
    await app.render();
  };
  await startApp();

  return app;
};

const app = App()
  .then(() => {})
  .catch(console.error);
