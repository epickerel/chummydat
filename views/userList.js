var userList = async (app, container) => {
  const html = `
          <div class="user-list">
              <div class="user-list__header">"Login" user:</div>
              <ul class="user-list__body">
                  ${app.users
                    .map((user) => {
                      return `
                              <li class="user-list__item">
                                  <a href="?user=${user.id}">${user.fullName}</a>
                              </li>
                          `;
                    })
                    .join("")}
              </ul>
          </div>
      `;
  container.innerHTML = html;
};
