import inquirer from "inquirer";
import chalk from "chalk";

interface Contact {
    Name: string,
    Title: string,
    ContNum: number,
    Email: string,
    Address: string
}

let contactDiary: Contact[] = [];

async function createList() {
    let answer = await inquirer.prompt([
        {
            name: "addName",
            type: "input",
            message: chalk.cyanBright.bold("Enter contact Name:"),
        },
        {
            name: "addTitle",
            type: "input",
            message: chalk.redBright.bold("Enter contact Position Title:"),
        },
        {
            name: "addNum",
            type: "input",
            message: chalk.greenBright.bold("Enter contact phone No.:"),
        },
        {
            name: "addEmail",
            type: "input",
            message: chalk.blueBright.bold("Enter contact e-mail address:"),
        },
        {
            name: "addAddress",
            type: "input",
            message: chalk.gray.bold("Enter address details:"),
        },
    ]);

    contactDiary.push({
        Name: answer.addName,
        Title: answer.addTitle,
        ContNum: Number(answer.addNum),
        Email: answer.addEmail,
        Address: answer.addAddress,
    });

    console.log(chalk.redBright.inverse("\n\t Contact added successfully"));
    await edit();
}

async function delCont() {
    let answer = await inquirer.prompt({
        name: "delete",
        type: "list",
        message: chalk.cyanBright.italic("Are you sure you want to delete the last contact?"),
        choices: ["Yes", "No"]
    });

    if (answer.delete === "Yes") {
        contactDiary.pop();
        console.log(chalk.redBright.inverse("\n\t Contact deleted successfully"));
    } else {
        console.log(chalk.green.inverse("\n\t No contacts were deleted"));
    }

    await edit();
}

async function update() {
    if (contactDiary.length === 0) {
        console.log(chalk.red.bold("\n No contacts to update."));
        await edit();
        return;
    }

    let answer = await inquirer.prompt({
        name: "updateName",
        type: "list",
        message: chalk.cyanBright.bold("Select the contact to update:"),
        choices: contactDiary.map(contact => contact.Name)
    });

    let updateCont = contactDiary.find(contact => contact.Name === answer.updateName);

    if (updateCont) {
        let newDetails = await inquirer.prompt([
            {
                name: "newName",
                type: "input",
                message: chalk.cyanBright.bold("Enter new contact Name:"),
                default: updateCont.Name,
            },
            {
                name: "newTitle",
                type: "input",
                message: chalk.redBright.bold("Enter new contact Position Title:"),
                default: updateCont.Title,
            },
            {
                name: "newNum",
                type: "input",
                message: chalk.greenBright.bold("Enter new contact phone No.:"),
                default: updateCont.ContNum.toString(),
            },
            {
                name: "newEmail",
                type: "input",
                message: chalk.blueBright.bold("Enter new contact e-mail address:"),
                default: updateCont.Email,
            },
            {
                name: "newAddress",
                type: "input",
                message: chalk.gray.bold("Enter new address details:"),
                default: updateCont.Address,
            },
        ]);

        updateCont.Name = newDetails.newName;
        updateCont.Title = newDetails.newTitle;
        updateCont.ContNum = Number(newDetails.newNum);
        updateCont.Email = newDetails.newEmail;
        updateCont.Address = newDetails.newAddress;

        console.log(chalk.green.inverse("\n\t Contact updated successfully"));
    }

    await edit();
}

async function search() {
    if (contactDiary.length === 0) {
        console.log(chalk.red.bold("\n No contacts to search."));
        await edit();
        return;
    }

    let answer = await inquirer.prompt({
        name: "searchName",
        type: "input",
        message: chalk.cyanBright.bold("Enter the name of the contact to search:")
    });

    let foundContacts = contactDiary.filter(contact => contact.Name.toLowerCase().includes(answer.searchName.toLowerCase()));

    if (foundContacts.length > 0) {
        console.log(chalk.green.bold("\n Found contacts:"));
        console.log(foundContacts);
    } else {
        console.log(chalk.red.bold("\n No contacts found with that name."));
    }

    await edit();
}

async function exit(){
    let answer = await inquirer.prompt(
        {
            name:"select",
            type:"list",
            message:chalk.redBright.bold("\t Are you sure, you wish to exit the program?"),
            choices:["Yes","No"]
        });

        switch(answer.select){
            case "Yes":
                console.log(chalk.greenBright.inverse("\n\t Thak You for using Contact Mangement System"));
                break;
            case "No":
                await edit();
        }
};

async function edit() {
    let answer = await inquirer.prompt({
        name: "edit",
        type: "list",
        message: chalk.green.inverse("\n What would you like to do?"),
        choices: ["viewList", "addMore", "delete", "updateExisting", "searchContact","exit"]
    });

    switch (answer.edit) {
        case "viewList":
            console.log(chalk.blueBright.bold(`\n Here is the updated Contact List \n`));
            console.log(contactDiary);
            console.log(chalk.yellow.inverse("\n\t Select desired operation from the given list!!!"));
            await edit();
            break;
        case "addMore":
            await createList();
            break;
        case "delete":
            await delCont();
            break;
        case "updateExisting":
            await update();
            break;
        case "searchContact":
            await search();
            break;
        case "exit":
            await exit();
            break;
    }
}

console.log(chalk.blue.inverse("\n\t ✔🎁💕 Welcome to Contact Management System 💕🎁✔ \n"));
await createList();
