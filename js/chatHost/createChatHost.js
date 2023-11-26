var createChatHost = async (app) => {
  const db = app.db;
  const fetchUsers = await loadScript(
    "js/chatHost/fetchUsers.js",
    "fetchUsers"
  );
  const fetchRooms = await loadScript(
    "js/chatHost/fetchRooms.js",
    "fetchRooms"
  );
  const fetchRoomChat = await loadScript(
    "js/chatHost/fetchRoomChat.js",
    "fetchRoomChat"
  );
  const postMessage = await loadScript(
    "js/chatHost/postMessage.js",
    "postMessage"
  );
  const api = {
    fetchUsers: async () => {
      return fetchUsers(app);
    },
    fetchRooms: async () => {
      return fetchRooms(app);
    },
    fetchRoomChat: async (roomId) => {
      return fetchRoomChat(app, roomId);
    },
    postMessage: async (message) => {
      return postMessage(app, message);
    },
  };
  return api;
};
