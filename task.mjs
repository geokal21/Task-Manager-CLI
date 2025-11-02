
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Φόρτωση εργασιών από αρχείο
function loadTasks() {
    if (!fs.existsSync(TASKS_FILE)) return [];
    const data = fs.readFileSync(TASKS_FILE);
    return JSON.parse(data);
}

// Αποθήκευση εργασιών
function saveTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Menu CLI
function mainMenu() {
    console.log(chalk.cyanBright.bold('\n=== ΔΙΑΧΕΙΡΙΣΗ ΕΡΓΑΣΙΩΝ ===\n'));
    inquirer.prompt ([
        {
            type: 'list',
            name: 'action',
            message: 'Τι θέλεις να κάνεις;',
            choices: ['Προβολή εργασιών',
                      'Προβολή ανά κατηγορία',
                      'Προσθήκη εργασίας',
                      'Σημείωσε ως ολοκληρωμένη',
                      'Διαγραφή εργασίας',
                      'Έξοδος']
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'Προβολή εργασιών':
                viewTasks();
                break;
            case 'Προβολή ανά κατηγορία':
                viewByCategory();
                break;    
            case 'Προσθήκη εργασίας':
                addTask();
                break;
            case 'Σημείωσε ως ολοκληρωμένη':
                completeTask();
                break;
            case 'Διαγραφή εργασίας':
                deleteTask();
                break;    
            case 'Έξοδος':
                console.log(chalk.greenBright('Αντίο!'));            
        }
    });
}

// Προβολή εργασιών
function viewTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log(chalk.red('Δεν υπάρχουν εργασίες.'));
    } else {
        tasks.forEach((t, i) => {
            console.log(`${chalk.cyan(i + 1)}. [${t.done ? chalk.green('OK') : chalk.yellow(' ')}] ${chalk.white(t.text)} (${chalk.gray(t.category || "Γενικά")})`);
        });
    }
    mainMenu();
}

// Προβολή εργασίων ανά κατηγορία
function viewByCategory() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("Δεν υπάρχουν εργασίες.");
        return mainMenu();
    }

    const categories = [...new Set(tasks.map(t => t.category || "Γενικά"))];
    

    inquirer.prompt ([
        {
            type: 'list',
            name: 'category',
            message: 'Διάλεξε κατηγορία',
            choices: categories
        }
    ]).then (answer => {
        const filtered = tasks.filter(t => (t.category || "Γενικά") === answer.category);
        console.log(`\nΕργασίες στην κατηγορία "${answer.category}":`);
        filtered.forEach((t, i) => {
            console.log(`${i + 1}. [${t.done ? 'OK' : ' '}] ${t.text}`);
        });
        console.log();
        mainMenu();
    });
}

// Προσθήκη εργασίας
function addTask() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'text',
            message: 'Πληκτρολόγησε την εργασία:'
        },
        {
            type: 'input',
            name: 'category',
            message: 'Σε ποια κατηγορία ανήκει; (π.χ. Δουλεία, Σπίτι, Προγραμματισμός)'
        }
    ]).then(answer => {
        const tasks = loadTasks();
        tasks.push({
           text: answer.text,
           done: false,
           category: answer.category || "Γενικά"
        });
        saveTasks(tasks);
        console.log(chalk.greenBright('Εργασία προστέθηκε!'));
        mainMenu();
    });
}

// Σημείωσε ως ολοκληρωμένη
function completeTask() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('Δεν υπάρχουν εργασίες.');
        return mainMenu();
    }
    inquirer.prompt([
        {
            type: 'list',
            name: 'taskIndex',
            message: 'Διάλεξε εργασία για να την ολοκληρώσεις.',
            choices: tasks.map((t, i) => ({
                name: `${t.text} (${t.category || "Γενικά"})`,
                value: i
            }))
        }
    ]).then(answer => {
        tasks[answer.taskIndex].done = true;
        saveTasks(tasks);
        console.log(chalk.green('Εργασία ολοκληρώθηκε!'));
        mainMenu();
    });
}    

// Διαγραφή εργασίας
function deleteTask() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('Δεν υπάρχουν εργασίες για διαγραφή.');
        return mainMenu();
    }

    inquirer.prompt([
        {
            type: 'list',
            name: 'taskIndex',
            message: 'Διάλεξε εργασία για διαγραφή:',
            choices: tasks.map((t, i) => ({
                name: `${t.text} (${t.category || "Γενικά"}) ${t.done ? 'OK' : ''}`,
                value: i
            }))
        }
    ]).then(answer => {
        // Αφαίρεση από το array
        tasks.splice(answer.taskIndex, 1);
        saveTasks(tasks);
        console.log(chalk.redBright('Η εργασία διαγράφηκε!'));
        mainMenu();
    });
}




// Εκκίνηση CLI
mainMenu();