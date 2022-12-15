#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = ()=>new Promise((res,rej)=>setTimeout(res,2000));
async function welcome() {
const welcomeMsg = chalkAnimation.rainbow(`let's strart the game`);
await sleep();
welcomeMsg.stop();
}
let playerLife = 3;
async function askQuestion() {
    let randomNumber:number = Math.floor(Math.random() * 10 +1);
   do {
    playerLife --;
    console.log(`Player life left ${playerLife}`);
    var que = await inquirer
    .prompt([{
        type:"number",
        name:"usr_num",
        message: chalk.rgb(250,128,114)("Select any number between 1 - 10:"),
        }
    ]);
    
    if(que.usr_num === randomNumber) {
        console.log(chalk.green(`congratulations! you guessed the right number`));  
    } else if(que.usr_num < randomNumber){
        console.log(chalk.red(`Your number ${que.usr_num} is less than the guessed number`));
    }
    else if(que.usr_num > randomNumber){
        console.log(chalk.red(`Your number ${que.usr_num} is greater than the guessed number`));
    }

   } while(playerLife > 0 && randomNumber !== que.usr_num);
   if(playerLife == 0 && randomNumber !== que.usr_num){
    console.log(chalk.redBright(`Game Over`));
   }

}
async function startAgain() {
    do {
        console.clear();
        await welcome();
        playerLife = 3;
        await askQuestion();
        var restart = await inquirer.prompt([
            {
                type:"input",
                name:"start_again",
                message:chalk.rgb(250,128,114)("Do you want to restrart the game? Press Y or N:")
            }
        ])

    }while(restart.start_again==='y' || restart.start_again==='Y' || restart.start_again==='yes'|| restart.start_again==='YES');
}
startAgain();