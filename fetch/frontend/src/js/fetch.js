export const fetchUsers = async () => {
    try {
       const response = await fetch("http://localhost:3000/api/users");
       if (!response.ok) {
          throw new Error("Failed to fetch users");
       }
       return await response.json();
    } catch (error) {
       console.error("Failed to fetch users", error);
       return [];
    }
 };
