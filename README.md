# 🧭 Task Manager CLI

A simple but useful **CLI task management tool**, written in **Node.js**, that allows you to:
- Add, view, complete, and delete tasks 
- Group tasks by **category**
- Save tasks locally in a `tasks.json` file
---

## ⚙️ Features

✅ Add new tasks

✅ Show all tasks 

✅ Show jobs by category 

✅ Mark as complete  

✅ Delete tasks  

✅ Colored output with **chalk** for easier reading  

---

## 📦 Technologies

- [Node.js](https://nodejs.org/)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Chalk](https://www.npmjs.com/package/chalk)
- File System (fs) for data storage

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<το-όνομα-σου>/<το-repo-όνομα>.git

2. Go to the project folder:
   ````bash
   cd task-manager-cli   

3. Install the dependencies:
   ````bash
   npm install

---

## 🖥️ execution
````bash
npm start
````
---

## 📘 Use

When you run the program, you will see the main menu:

=== ΔΙΑΧΕΙΡΙΣΗ ΕΡΓΑΣΙΩΝ ===
? Τι θέλεις να κάνεις;
> Προβολή εργασιών
  Προβολή ανά κατηγορία
  Προσθήκη εργασίας
  Σημείωσε ως ολοκληρωμένη
  Διαγραφή εργασίας
  Έξοδος

---

## 🧩 Παράδειγμα προσθήκης εργασίας:

Πληκτρολόγησε την εργασία: Καθαρισμός γραφείου
Σε ποια κατηγορία ανήκει; (π.χ. Δουλειά, Σπίτι, Προγραμματισμός): Σπίτι
✅ Εμφανίζεται μήνυμα:
Εργασία προστέθηκε!

---

## 📂 Αποθήκευση

Όλες οι εργασίες αποθηκεύονται τοπικά στο αρχείο:
tasks.json

---

## 🎨 Εμφάνιση εργασιών

Το πρόγραμμα χρησιμοποιεί chalk για έγχρωμη εμφάνιση:

✅ Πράσινο: Ολοκληρωμένες εργασίες
🟡 Κίτρινο: Εκκρεμείς εργασίες
🔹 Κυανό: Αρίθμηση
🔘 Γκρι: Κατηγορία

---

## 🧑‍💻 Συγγραφέας
geokal21



