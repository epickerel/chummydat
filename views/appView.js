var appView = async (app) => {
  if (!app.state.userId) {
    const userList = await loadScript("views/userList.js", "userList");
    await userList(app, document.getElementById("userlist"));
    // Yes, I could set a logged-in class on the body, but since I'm not using SASS or LESS, I'd rather not make the selectors a mile long
    document.getElementById("app").style.display = "none";
    document.getElementById("logout").style.display = "none";
  } else if (app.state.roomId) {
    const roomList = await loadScript("views/roomList.js", "roomList");
    const chatWindow = await loadScript("views/chatWindow.js", "chatWindow");
    const chatForm = await loadScript("views/chatForm.js", "chatForm");
    await roomList(app, document.getElementById("roomlist"));
    await chatWindow(app, document.getElementById("chat"));
    await chatForm(app, document.getElementById("chatForm"));
  } else {
    const header = document.getElementById("header");
    header.innerHTML = "Reloading, please wait...";
    window.location.reload();
  }
};
