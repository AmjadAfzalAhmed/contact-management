import inquirer from "inquirer";
import chalk from "chalk";

interface Contact{
    name: string;
    type: string;
    contNum: number
}
let contactDiary:Contact[]= [];

async function createList(){
    let answer = await inquirer.prompt([
        {
            name:"addName",
            type:"input",
            message:chalk.cyanBright.bold("Enter contact Name:"),
        },
        {
            name:"addType",
            type:"input",
            message:chalk.greenBright.bold("Enter contact type:"),
        },
        {
            name:"addNumber",
            type:"input",
            message:chalk.blueBright.bold("Enter Number:"),
        }
    ]);
    
    contactDiary.push({
        name: answer.addName,
        type:answer.addType,
        contNum: answer.addNumber
    });

    console.log(chalk.redBright.inverse("\t Contacdt added successfully"));
    await edit();
    console.log("\n",contactDiary)
};
console.log(chalk.greenBright.inverse("\t ✔🎁💕 Welcome to Contact Management System 💕🎁✔ \n"))
await createList();

async function edit(){
    let answer = await inquirer.prompt([
        {
            name:"edit",
            type:"list",
            message:chalk.green.inverse("\n What would you like to do"),
            choices:["addMore","delete","viewList","searchContact","updateExisting"]
        }
    ])
}
