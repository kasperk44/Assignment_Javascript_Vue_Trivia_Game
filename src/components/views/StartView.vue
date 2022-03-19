<template>
    <h1>Welcome to Trivia!</h1>

    <input class="input-text" id="nameInput" type="text" placeholder="Enter your name" v-model="name" /><br>

    <input class="input-text" id="numOfQuestionInput" type="text" placeholder="Number of questions" v-model="numberOfQuestions" /><br>

    <select class="input-text" name="difficulty" id="difficulty" v-model="difficulty">
        <option value="" selected> Select difficulty </option>
        <option value="easy"> Easy </option> 
        <option value="medium"> Medium </option> 
        <option value="hard">Hard</option>  
    </select><br>

    <select class="input-text" name="category" id="category" v-model="category"> 
        <option value="" selected> Select category </option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books </option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals & Theatres</option>
        <option value="14">Entertainment: Television </option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science & Nature Science</option>
        <option value="18">Computers Science</option>
        <option value="19">Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science Gadgets</option>
        <option value="31">Entertainment: Japanese & Anime  Manga</option>
        <option value="32">Entertainment: Cartoon & Animations</option>  
    </select><br>

    <button class="answerButton" @click="begin">Play</button>
</template>

<script setup>
import { ref, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { attemptLogin } from "../utils/TriviaAPI.js";

const router = useRouter();

const name = ref("");
const numberOfQuestions = ref();
const difficulty = ref("");
const category = ref("");

/**
 * This function will be called after the 'Play' button has been clicked.
 * If every input has been filled in, an login attempt will be made and the current question url will be added to local storage. 
 */
function begin() {
    if(name.value == "" || numberOfQuestions.value == 0 || difficulty.value == "" || category.value == ""){
        alert("Given input is not correct. Please enter the correct input.")
    }
    else{
        attemptLogin(name.value);
        localStorage.setItem('questionsURL', getQuestionsUrl());
        localStorage.setItem('basicURL', getCurrentWindowUrl());
        setTimeout(() => {
            router.push('/questions')
            }, 500
        );
    }
}

/**
 * QuestionURL will be retrieved from the given user input.
 */
function getQuestionsUrl(){
    const questionsURL = `https://opentdb.com/api.php?amount=${numberOfQuestions.value}&category=${category.value}&difficulty=${difficulty.value}`;
    
    return questionsURL;
}

/**
 * Gets the current window url.
 */
function getCurrentWindowUrl(){
    const currentWindow = window.location.href;

    return currentWindow;
}

</script>

<style>

</style>
