<template>
  <div class="container">
    <h1>Result Page</h1>
    <p>Score: {{score}}</p>
    <button class="answerButton" @click="backToStart">Back To Start</button>
    <button class="answerButton" @click="replay">Replay</button>
    <div class="row">
      <div class="div-box">
        <h2>Questions</h2>
        <div class="in-box" v-for="question in questionObject">
          {{question.question}}
        </div>
      </div>
      <div class="div-box1">
        <h2>Correct Answers</h2>
        <div class="in-box" v-for="question in questionObject">
          {{question.correct_answer}}
        </div>
      </div>
      <div class="div-box2">
        <h2>Given Answers</h2>
        <div class="in-box" v-for="answer in answerObject">
          {{answer.answer}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { setScore } from "../utils/TriviaAPI.js";

let score = 0;

const user = JSON.parse(localStorage.getItem(`user`));

const allQuestions = localStorage.getItem(`allQuestions`);
const givenAnswers = localStorage.getItem(`givenAnswers`);

const tempAnswers = givenAnswers.split(',{');
const tempQuestions = allQuestions.split(',{');

let questionObject = [];
let answerObject = [];

tempQuestions.forEach(question => {
  questionObject.push(JSON.parse(question));
});

tempAnswers.forEach(answer => {
  answerObject.push(JSON.parse(answer));
});

/**
 * Check if correct answer is the same as the user given answer.
 */
for (let i = 0; i < answerObject.length; i++) {
  if(questionObject[i].correct_answer == answerObject[i].answer){
    score += 10;
  }
}

/**
 * Add the new high score to the api if the current score is higher than the current high score.
 */
if(score > user[0].highScore){
  setScore(user[0].id, score);
}

/**
 * Start page will be reloaded.
 */
function backToStart(){
  window.location.assign("http://localhost:3000/")
}

/**
 * Question page will be reloaded and the current questions will be removed.
 */
function replay(){
  localStorage.removeItem(`givenAnswers`);
  localStorage.removeItem(`allQuestions`);
  localStorage.removeItem(`correctAnswers`);
  window.location.assign("http://localhost:3000/questions")
}

</script>

<style>

</style>