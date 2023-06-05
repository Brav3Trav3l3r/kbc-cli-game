#!/usr/bin/env node

import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName = "";

const timer = () => new Promise((r) => setTimeout(r, 2000));

async function welcome() {
  const rainbow = chalkAnimation.rainbow(
    'Welcome to "Who wants to be a millionaire".'
  );
  await timer();
  rainbow.stop();

  console.log(`${chalk.bgBlue("How to play")} 
    Answer all questions correctly to earn your ${chalk.green("freedom!")},
    else you ${chalk.red("die")}.
    Are you ${chalk.yellowBright("ready")}? 
    `);
}

async function getName() {
  const name = await input({
    message: "Enter your name.",
  });
  playerName = name || "Player";
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await timer();

  if (isCorrect) {
    spinner.success({
      text: `Good job ${playerName}. That's a correct answer`,
    });
  } else {
    spinner.error({ text: `🐀🐀🐀 Game over, you died` });
    process.exit(1);
  }
}

async function question1() {
  const answer = await select({
    message: "In Greek mythology, who is the goddess of wisdom?\n",
    choices: [
      { value: "Aphrodite" },
      { value: "Athena" },
      { value: "Hera" },
      { value: "Artemis" },
    ],
  });
  return handleAnswer(answer === "Athena");
}

async function question2() {
  const answer = await select({
    message: "Which of the following is NOT a primary taste sensation?",
    choices: [
      { value: "Sweet" },
      { value: "Sour" },
      { value: "Bitter" },
      { value: "Spicy" },
    ],
  });
  return handleAnswer(answer === "Spicy");
}
async function question3() {
  const answer = await select({
    message: "Which continent is the least populous?",
    choices: [
      { value: "Africa" },
      { value: "Asia" },
      { value: "Europe" },
      { value: "Australia" },
    ],
  });
  return handleAnswer(answer === "Australia");
}
async function question4() {
  const answer = await select({
    message: 'Who wrote the novel "Pride and Prejudice"?',
    choices: [
      { value: "Charlotte Brontë" },
      { value: "Jane Austen" },
      { value: "Virginia Woolf" },
      { value: "Emily Dickinson" },
    ],
  });
  return handleAnswer(answer === "Jane Austen");
}
async function question5() {
  const answer = await select({
    message: "What is the largest organ in the human body?",
    choices: [
      { value: "Liver" },
      { value: "Brain" },
      { value: "Skin" },
      { value: "Intestine" },
    ],
  });
  return handleAnswer(answer === "Skin");
}
async function question6() {
  const answer = await select({
    message: 'Which planet is known as the "Morning Star" or "Evening Star"?',
    choices: [
      { value: "Venus" },
      { value: "Mars" },
      { value: "Jupiter" },
      { value: "Mercury" },
    ],
  });
  return handleAnswer(answer === "Mercury");
}
async function question7() {
  const answer = await select({
    message:
      "Which psychological disorder is characterized by a person having multiple distinct identities?",
    choices: [
      { value: "Dissociative identity disorder" },
      { value: "Schizophrenia" },
      { value: "Bipolar disorder" },
      { value: " Obsessive-compulsive disorder" },
    ],
  });
  return handleAnswer(answer === "Dissociative identity disorder");
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} you earn your freedom`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");
    process.exit(0);
  });
}

await welcome();
await getName();
await question1();
await timer()
await question2();
await timer()
await question3();
await question4();
await question5();
await question6();
await question7();
winner();
