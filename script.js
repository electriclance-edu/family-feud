//globals
var promptParent, questionName, gameParent;
var currentQuestion = 0;
//functions
function onload() {
  promptParent = document.getElementById("prompts");
  gameParent = document.getElementById("gameScreen");
  endParent = document.getElementById("gameScreen");
  questionName = document.getElementById("question");
}
function start() {
  document.getElementById("titleScreen").className += " centeredVanished";
  document.getElementById("gameScreen").className = "game centered devanish";

  loadQuestion(questions[currentQuestion]);
}
function nextQuestion() {
  gameParent.style.left = "calc(50% - 30px)";
  gameParent.style.opacity = "0";
  gameParent.style.pointerEvents = "none";

  setTimeout(function(){
    if (++currentQuestion < questions.length) {
      gameParent.style.transition = "0s";
      gameParent.style.left = "calc(50% + 30px)";
      gameParent.style.transition = "0.5s";
      gameParent.style.left = "calc(50%)";
      gameParent.style.opacity = "1";
      gameParent.style.pointerEvents = "all";
      loadQuestion(questions[currentQuestion]);
    } else {
      //endParent.className += "end centered devanish";
    }
  },300);
}
function triggerWord(elem) {
  elem.className = "unlockedWord";
}
function loadQuestion(question) {
  promptParent.innerHTML = "";
  questionName.innerHTML = question.text;
  for (var i = 0; i < question.answers.length; i++) {
    promptParent.appendChild(createPrompt(question.answers[i],i + 1, question.respondents));
  }
}
function createPrompt(promptData,index,totalRespondents) {
  var prompt = document.createElement("div");
  prompt.onclick = function(){
    triggerWord(this);
  };

  var blocker = document.createElement("div");
  blocker.className = "blocker";
  var number = document.createElement("p");
  number.innerHTML = index;
  blocker.appendChild(number);
  prompt.appendChild(blocker);

  var promptText = document.createElement("p");
  promptText.innerHTML = promptData.text;
  prompt.appendChild(promptText);

  var percentage = document.createElement("div");
  percentage.className = "percentage";
  var percentageFill = document.createElement("div");
  percentageFill.style.width = `${(promptData.respondents/totalRespondents)*100}%`;
  var respondents = document.createElement("p");
  respondents.innerHTML = `${promptData.respondents} respondents`;
  percentage.appendChild(percentageFill);
  percentage.appendChild(respondents);
  prompt.appendChild(percentage);

  return prompt;
}
