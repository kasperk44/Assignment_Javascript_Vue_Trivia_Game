// functions which do api requests
const apiURL = "https://noroff-assignment-trivia-api.herokuapp.com"; 
const apiKey = "J@McQfTjWnZr4u7x!A%D*G-KaPdRgUkXp2s5v8y/B?E(H+MbQeThVmYq3t6w9z$C";

/**
 * An login will be attempted.
 * If successful, user will be added to the local storage.
 * The register function will be called if user doesn't exist.
 */
export function attemptLogin(name) {
  fetch(`${apiURL}/trivia?username=${name}`)
    .then((response) => response.json())
    .then((results) => {
      if (results.length == 0) {
        register(name);
      } else {;
        localStorage.setItem('user',JSON.stringify(results))
        return results
      }
    })
    .catch((error) => {});
}

/**
 * A user will be registered to the api.
 */
export function register(name) {
  fetch(`${apiURL}/trivia`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: name,
      highScore: 0,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not create new user");
      }
      return response.json();
    })
    .then((newUser) => {
      localStorage.setItem('user',JSON.stringify(newUser))
      console.log(newUser);
    })
    .catch((error) => {});
}

/**
 * A score will be set if the user score is higher than his/her current high score.
 */
export function setScore(userId, score) {
  fetch(`${apiURL}/trivia/${userId}`, {
    method: 'PATCH', // NB: Set method to PATCH
    headers: {
        'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // Provide new highScore to add to user with id 1
        highScore: score  
    })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not update high score')
      }
      return response.json()
    })
    .then(updatedUser => {
      // updatedUser is the user with the Patched data
    })
    .catch(error => {
  })
}