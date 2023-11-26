var appState = {
  get: function () {
    const params = new URLSearchParams(window.location.search);
    return {
      user: params.get("user"),
      room: params.get("room"),
    };
  },
  set: function (user, room) {
    const params = new URLSearchParams();
    params.set("user", user);
    params.set("room", room);
    window.history.replaceState({}, "", "?" + params.toString());
  },
};
