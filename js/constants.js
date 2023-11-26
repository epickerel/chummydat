var constants = {
  hostUrl: "http://localhost:3000",
  dbName: "dummyChat",
  collections: {
    users: {
      name: "users",
      init: {
        keyPath: "id",
      },
      indexes: [["fullName", "fullName", { unique: false }]],
    },
    rooms: {
      name: "rooms",
      init: {
        keyPath: "id",
      },
      indexes: [
        ["participants", "participants", { unique: false }],
        ["lastMessage", "lastMessage", { unique: false }],
      ],
    },
    messages: {
      name: "messages",
      init: {
        keyPath: "id",
      },
      indexes: [
        ["user_id", "user_id", { unique: false }],
        ["body", "body", { unique: false }],
      ],
    },
  },
};
