import { fetchUsers } from "./fetch.js";

const userTableBody = document.getElementById("user-table-body");
const fetchButton = document.getElementById("fetch-users");

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

fetchButton.addEventListener("click", updateTable);
