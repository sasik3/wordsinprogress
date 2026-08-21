
let currentWords = 0;
let goalWords = 1000;
const wordCount = document.getElementById("wordCount");
const percentage = document.getElementById("percentage");
const wordInput = document.getElementById("wordInput");
const goalInput = document.getElementById("goalInput");
const updateWords = document.getElementById("updateWords");
const updateGoal = document.getElementById("updateGoal");
const progressBar = document.getElementById("progressBar");
const pathLength = progressBar.getTotalLength();
progressBar.style.strokeDasharray = pathLength;
progressBar.style.strokeDashoffset= pathLength;
let i = 0;
   var message = "words in progress."; 
   var speed = 100;
   function type() {
    if(i < message.length) {
        document.getElementById("type").innerHTML += message.charAt(i);
        i++;
        setTimeout(type, speed);
    }
   }
    type();




function updateUI() {
    wordCount.textContent = currentWords;
    const progress = Math.min(currentWords/goalWords, 1);
    const percent = Math.round(progress * 100);
    percentage.textContent = `${percent}%`;
    const offset = pathLength * (1- progress);
    progressBar.style.strokeDashoffset = offset;
}
updateWords.addEventListener("click", () => {
    currentWords = Number(wordInput.value);
    chrome.storage.local.set({
    currentWords: currentWords,
});
    updateUI();
});
updateGoal.addEventListener("click", () => {
    goalWords = Number(goalInput.value);
     chrome.storage.local.set({
    goal: goalWords
});
    updateUI();  
});
updateUI();
chrome.storage.local.get(
    ["currentWords", "goal"],
    (data) => {
        currentWords = data.currentWords || 0;
        goalWords = data.goal || 1000;
        wordInput.value = currentWords;
        goalInput.value = goalWords;
        updateUI();
    }
);


/*const progressBar = document.getElementById("progressBar");
const pathLength = progressBar.getTotalLength();
console.log("Path length:", pathLength);
progressBar.style.strokeDasharray = pathLength;
progressBar.style.strokeDashoffset = pathLength;
setTimeout(() => {
    progressBar.style.strokeDashoffset = pathLength / 2;
}, 1000);*/