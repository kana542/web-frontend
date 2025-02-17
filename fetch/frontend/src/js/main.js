import { fetchUsers, createNewUser, deleteUser, getUserById } from "./fetch.js";

const userTableBody = document.getElementById("users-table-body");
const fetchButton = document.getElementById("fetch-users");
const newUserButton = document.getElementById("create-user");
const dialog = document.querySelector(".info_dialog");
const closeButton = document.querySelector(".close-button");

const createUserRow = (user) => {
   const tr = document.createElement("tr");

   const usernameTd = document.createElement("td");
   usernameTd.textContent = user.username;

   const emailTd = document.createElement("td");
   emailTd.textContent = user.email;

   const infoTd = document.createElement("td");
   const infoButton = document.createElement("button");
   infoButton.textContent = "Info";
   infoButton.classList.add("info-button");
   infoTd.appendChild(infoButton);

   const deleteTd = document.createElement("td");
   const deleteButton = document.createElement("button");
   deleteButton.textContent = "Delete";
   deleteButton.classList.add("delete-button");
   deleteTd.appendChild(deleteButton);

   const idTd = document.createElement("td");
   idTd.textContent = user.id;

   tr.append(usernameTd, emailTd, infoTd, deleteTd, idTd);

   return tr;
};

const updateTable = async () => {
   const users = await fetchUsers();
   userTableBody.replaceChildren(...users.map((user) => createUserRow(user)));
};

const deleteFromTable = async (id) => {
   await deleteUser(id);
   updateTable();
};

const createUser = async () => {
   const username = document.getElementById("username").value;
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   const user_level = document.getElementById("user_level").value;
   await createNewUser(username, email, password, user_level);
   updateTable();
};

fetchButton.addEventListener("click", updateTable);

userTableBody.addEventListener("click", async (event) => {
   if (event.target.classList.contains("delete-button")) {
      const row = event.target.closest("tr");
      const cells = row.getElementsByTagName("td");
      const id = cells[4].textContent;
      await deleteFromTable(id);
   }
});

userTableBody.addEventListener("click", async (event) => {
   if (event.target.classList.contains("info-button")) {
      const row = event.target.closest("tr");
      const cells = row.getElementsByTagName("td");
      const id = cells[4].textContent;
      const user = await getUserById(id);
      console.log(user);

      document.getElementById("dialog-user-id").textContent = user.id;
      document.getElementById("dialog-user-name").textContent = user.username;
      document.getElementById("dialog-user-email").textContent = user.email;
      document.getElementById("dialog-user-role").textContent = user.user_level;

      dialog.showModal();
   }
});

newUserButton.addEventListener("click", createUser);

closeButton.addEventListener("click", () => {
   dialog.close();
});
