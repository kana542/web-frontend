export const fetchEntries = async () => {
   try {
      const response = await fetch("http://localhost:3000/api/entries");
      if (!response.ok) {
         throw new Error("Failed to fetch entries");
      }
      console.log("Entries fetched");
      return await response.json();
   } catch (error) {
      console.error("Failed to fetch entries", error);
   }
};

export const getEntryById = async (id) => {
   try {
      const response = await fetch(`http://localhost:3000/api/entries/${id}`);
      if (!response.ok) {
         throw new Error("Failed to fetch entry");
      }
      console.log("Entry fetched");
      return await response.json();
   } catch (error) {
      console.error("Failed to fetch entry", error);
   }
};

export const updateEntry = async (id, entry) => {
   try {
      const response = await fetch(`http://localhost:3000/api/entries/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(entry),
      });

      if (!response.ok) {
         throw new Error("Failed to update entry");
      }
      console.log("Entry updated");
   } catch (error) {
      console.error("Failed to update entry", error);
   }
};

export const deleteEntry = async (id) => {
   try {
      const response = await fetch(`http://localhost:3000/api/entries/${id}`, {
         method: "DELETE",
      });

      if (!response.ok) {
         throw new Error("Failed to delete entry");
      }
      console.log("Entry deleted");
   } catch (error) {
      console.error("Failed to delete entry", error);
   }
};
