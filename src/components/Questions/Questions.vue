<template>
    <Question v-if="questions.value" :questionProp="questions.value"/>
    <button class="answerButton" @click="answerQuestion" id="boolean0" hidden>True</button>
    <button class="answerButton" @click="answerQuestion" id="boolean1" hidden>False</button>
    <button class="answerButton" @click="answerQuestion" id="multiple0" hidden></button>
    <button class="answerButton" @click="answerQuestion" id="multiple1" hidden></button>
    <button class="answerButton" @click="answerQuestion" id="multiple2" hidden></button>
    <button class="answerButton" @click="answerQuestion" id="multiple3" hidden></button>

</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import Question from './Question.vue'
import { useRouter } from "vue-router";
import { attemptLogin } from "../utils/TriviaAPI.js";

let allQuestionsArray = [];
let allQuestions = [];
let givenAnswers = [];
let correctAnswers = [];

const router = useRouter();

let iterator = 0;

const questions = reactive({});

/**
 * After button is clicked answer is added to an array and stored in the database.
 * Current question is added to an array.
 */
document.addEventListener('click', function(e) {
    if(e.target.id != '' && e.target.id != 'app'){
        if(iterator != 0){
            allQuestionsArray.push('{' + JSON.stringify(allQuestions[iterator]))
            givenAnswers.push('{' + JSON.stringify({answer: e.target.innerText}));
        }
        else{
            allQuestionsArray.push(JSON.stringify(allQuestions[iterator]))
            givenAnswers.push(JSON.stringify({answer: e.target.innerText}));
        }
        localStorage.setItem(`givenAnswers`, givenAnswers);
        iterator++;
        nextQuestion();
    }
}, false);

/**
 * Questions are fetched before mount and added to an array.
 * Questions are parsed to fix character entity names.
 */
onBeforeMount(() => {
    fetch(localStorage.getItem(`questionsURL`)) 
    .then(response => response.json())
    .then(result => {
        if(result.response_code == 1){
            alert("There are not enough questions for this category and difficulty. Please try again.")
            window.location.assign("https://glacial-forest-18966.herokuapp.com/")
        }
        else{
            const user = JSON.parse(localStorage.getItem(`user`));

            if(user.username == null){
                attemptLogin(user[0].username)
            }
            else{
                attemptLogin(user.username)
            }

            allQuestions = result.results; 

            allQuestions = JSON.stringify(allQuestions).replace(/&quot;/g, "&apos;");
            allQuestions = JSON.parse(htmlDecode(allQuestions));

            questions.value = allQuestions[0];
            getAnswers();
        }
    });
})

/**
 * A decoder to parse character entity names to normal characters.
 */
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

/**
 * Next question will be called.
 * If there are no questions left, correct answers and questions will be pushed to local storage.
 */
function nextQuestion(){
    if(allQuestions.length > iterator){
        questions.value = allQuestions[iterator];
        getAnswers();
    }
    else{
        console.log(givenAnswers);
        localStorage.setItem(`correctAnswers`, correctAnswers);
        localStorage.setItem(`allQuestions`, allQuestionsArray);

        router.push('/result');
    }
}

/**
 * Answers are being called and put into a randomized position.
 * If the question is a true or false, only two questions will be displayed.
 */
function getAnswers(){
    let randomNumber1 = new Array(2).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5);  
    let randomNumber2 = new Array(4).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5);

    let answer1 = document.getElementById('multiple' + randomNumber2[0]);
    let answer2 = document.getElementById('multiple' + randomNumber2[1]);
    let answer3 = document.getElementById('multiple' + randomNumber2[2]);
    let answer4 = document.getElementById('multiple' + randomNumber2[3]);
    let answerTrue = document.getElementById('boolean' + randomNumber1[0]);
    let answerFalse = document.getElementById('boolean' + randomNumber1[1]);

    if(questions.value.type == 'boolean'){

        answer1.hidden = true;
        answer2.hidden = true;
        answer3.hidden = true;
        answer4.hidden = true;
        answerTrue.hidden = false;
        answerFalse.hidden = false;

        answerTrue.innerText = questions.value.correct_answer;
        answerFalse.innerText = questions.value.incorrect_answers[0];

        correctAnswers.push(answerTrue.innerText);
    }
    else{
        answer1.hidden = false;
        answer2.hidden = false;
        answer3.hidden = false;
        answer4.hidden = false;
        answerTrue.hidden = true;
        answerFalse.hidden = true;

        answer1.innerText = questions.value.correct_answer;
        answer2.innerText = questions.value.incorrect_answers[0];
        answer3.innerText = questions.value.incorrect_answers[1];
        answer4.innerText = questions.value.incorrect_answers[2];

        correctAnswers.push(answer1.innerText);
    }
}

</script>

<style>

</style>