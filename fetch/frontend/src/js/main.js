import { fetchUsers, createNewUser, deleteUser, getUserById } from "./fetch.js";

const userTableBody = document.getElementById("users-table-body");
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

const deleteFromTable = async (id) => {
    await deleteUser(id);
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
        alert(
            `Username: ${user.username}\nEmail: ${user.email}\nID: ${user.id}`
        );
    }
});
