export const fetchUsers = async () => {
   try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
         throw new Error("Failed to fetch users");
      }
      console.log("Users fetched");
      return await response.json();
   } catch (error) {
      console.error("Failed to fetch users", error);
   }
};

export const createNewUser = async (username, email, password) => {
   try {
      const response = await fetch("http://localhost:3000/api/users", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
         throw new Error("Failed to create new user");
      }
      console.log("New user created");
   } catch (error) {
      console.error("Failed to create new user", error);
   }
};

export const deleteUser = async (id) => {
   try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
         method: "DELETE",
      });

      if (!response.ok) {
         throw new Error("Failed to delete user");
      }
      console.log("User deleted");
   } catch (error) {
      console.error("Failed to delete user", error);
   }
};
