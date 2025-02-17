const users = [
   {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com",
      user_level: "regular",
   },
   {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com",
      user_level: "regular",
   },
   {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com",
      user_level: "admin",
   },
];

const getUsers = (req, res) => {
   res.json(users);
};

const getUserById = (req, res) => {
   console.log("getUserById", req.params.id);
   const user = users.find((user) => user.id == req.params.id);
   console.log("User found:", user);
   if (user) {
      const { id, username, email, user_level } = user;
      res.json({ id, username, email, user_level });
   } else {
      res.status(404).json({ message: "User not found" });
   }
};

const addUser = (req, res) => {
   console.log("addUser request body", req.body);
   const { username, password, email, user_level } = req.body;
   if (username && password && email) {
      const latestId = users[users.length - 1].id;
      const newUser = {
         id: latestId + 1,
         username,
         password,
         email,
         user_level,
      };
      users.push(newUser);
      res.status(201);
      return res.json({ message: "User added." });
   }
   res.status(400);
   return res.json({
      message:
         "Request should have username, password, email and user level properties.",
   });
};

const editUser = (req, res) => {
   console.log("editUser request body", req.body);
   const user = users.find((user) => user.id == req.params.id);
   if (user) {
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;
      user.user_level = req.body.user_level;
      res.json({ message: "User updated." });
   } else {
      res.status(404).json({ message: "User not found" });
   }
};

const deleteUser = (req, res) => {
   console.log("deleteUser", req.params.id);
   const index = users.findIndex((user) => user.id == req.params.id);
   if (index !== -1) {
      users.splice(index, 1);
      res.json({ message: "User deleted." });
   } else {
      res.status(404).json({ message: "User not found" });
   }
};

const login = (req, res) => {
   const { username, password } = req.body;
   if (!username) {
      return res.status(401).json({ message: "Username missing." });
   }
   const user = users.find((user) => user.username === username);
   if (user && user.password === password) {
      res.json({ message: "login ok", user });
   } else {
      res.status(401).json({ message: "Bad username/password." });
   }
};

export { getUsers, getUserById, addUser, editUser, deleteUser, login };
