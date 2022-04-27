let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let incorrectText = "You typed incorrect sentence";



let time = 0;
let timeInterval = setInterval(function() {
    timerEl.textContent = time;
    time = time + 1;
}, 1000);

function createProcess() {
    if (quoteDisplayEl.textContent === quoteInputEl.value) {
        clearInterval(timeInterval);
        timerEl.textContent = time - 1;
        resultEl.textContent = "You typed in " + timerEl.textContent + " seconds";
    } else if (quoteInputEl.value === "") {
        resultEl.textContent = "Write the sentence first.";
    } else {
        resultEl.textContent = incorrectText;

    }

}

function getQuote() {
    let options = {
        method: "GET"
    }
    let link = "https://apis.ccbp.in/random-quote";
    speedTypingTestEl.classList.add("d-none");
    spinnerEl.classList.remove("d-none");
    fetch(link, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            speedTypingTestEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none");
            quoteDisplayEl.textContent = jsonData.content;

        });
}

function getNewQuote() {
    getQuote();
    quoteInputEl.value = "";
    clearInterval(timeInterval);
    time = 0;
    timeInterval = setInterval(function() {
        timerEl.textContent = time;
        time = time + 1;
    }, 1000);

}

submitBtnEl.addEventListener("click", createProcess);
resetBtnEl.addEventListener("click", getNewQuote);
getQuote();