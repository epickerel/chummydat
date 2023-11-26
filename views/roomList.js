var roomList = async (app, container) => {
  const html = `
        <div class="room-list">
            <div>Rooms</div>
            <ul>
                ${app.rooms
                  .map((room) => {
                    return `
                            <li class="${
                              room.id === app.state.roomId ? " active" : ""
                            }">
                                <a href="?user=${app.state.userId}&room=${
                      room.id
                    }">${room.id}</a>
                            </li>
                        `;
                  })
                  .join("")}
            </ul>
        </div>
    `;
  container.innerHTML = html;
};
