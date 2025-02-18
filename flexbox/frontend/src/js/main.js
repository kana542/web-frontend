import {
   fetchEntries,
   deleteEntry,
   getEntryById,
   updateEntry,
} from "./fetch.js";

const cardArea = document.querySelector(".card-area2");
const fetchButton = document.querySelector(".get_entries");

const createCard = (entry) => {
   const card = document.createElement("div");
   card.className = "card";

   const imgDiv = document.createElement("div");
   imgDiv.className = "card-img";
   const img = document.createElement("img");
   img.src = "./public/diary.jpg";
   img.alt = "Diary";
   imgDiv.appendChild(img);

   const diaryDiv = document.createElement("div");
   diaryDiv.className = "card-diary";

   const fields = [
      { label: "Päivämäärä", value: entry.entry_date },
      { label: "Mieliala", value: entry.mood },
      { label: "Paino", value: `${entry.weight} kg` },
      { label: "Uni", value: `${entry.sleep_hours} tuntia` },
   ];

   fields.forEach((field) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "diary-item";

      const label = document.createElement("span");
      label.className = "diary-label";
      label.textContent = `${field.label}:`;

      const value = document.createElement("span");
      value.className = "diary-value";
      value.textContent = field.value;

      itemDiv.appendChild(label);
      itemDiv.appendChild(value);
      diaryDiv.appendChild(itemDiv);
   });

   const notesDiv = document.createElement("div");
   notesDiv.className = "notes";

   const notesLabel = document.createElement("span");
   notesLabel.className = "diary-label";
   notesLabel.textContent = "Muistiinpanot:";

   const notesValue = document.createElement("p");
   notesValue.className = "diary-value";
   notesValue.textContent = entry.notes;

   notesDiv.appendChild(notesLabel);
   notesDiv.appendChild(notesValue);
   diaryDiv.appendChild(notesDiv);

   const buttonDiv = document.createElement("div");
   buttonDiv.className = "card-buttons";

   const deleteButton = document.createElement("button");
   deleteButton.textContent = "Poista";
   deleteButton.className = "delete-button";
   deleteButton.dataset.entryId = entry.entry_id;

   buttonDiv.appendChild(deleteButton);
   diaryDiv.appendChild(buttonDiv);

   card.appendChild(imgDiv);
   card.appendChild(diaryDiv);

   return card;
};

const updateCards = async () => {
   try {
      const entries = await fetchEntries();
      if (!entries) return;

      cardArea.innerHTML = "";

      const limitedEntries = entries.slice(0, 7);

      limitedEntries.forEach((entry) => {
         const card = createCard(entry);
         cardArea.appendChild(card);
      });

      const counter = document.createElement("div");
      counter.className = "entries-counter";
      counter.textContent = `Näytetään ${limitedEntries.length} merkintää ${entries.length} merkinnästä`;
      cardArea.appendChild(counter);
   } catch (error) {
      console.error("Error updating cards:", error);
      cardArea.innerHTML =
         '<div class="error-message">Virhe haettaessa merkintöjä. Tarkista että backend on käynnissä.</div>';
   }
};

const deleteFromCards = async (id) => {
   await deleteEntry(id);
   updateCards();
};

fetchButton.addEventListener("click", updateCards);

cardArea.addEventListener("click", async (event) => {
   if (event.target.classList.contains("delete-button")) {
      const entryId = event.target.dataset.entryId;
      if (confirm("Haluatko varmasti poistaa tämän merkinnän?")) {
         await deleteFromCards(entryId);
      }
   }
});
