// Copyright         : 2024 Aaron Gearheart
// Validated         : Apr 18 2024
// Powered By Gearheart Studios

var questions = document.querySelectorAll(".col .text");

if (questions.length === 0) {
  alert("Failed to save dictionary. Make sure you are on the course words page!");
} else {
  var questionsDict = [];
  for (let i = 1; i < questions.length; i = i + 2) {
    questionsDict.push({
      question: questions[i].innerHTML,
      answers: questions[i - 1].innerHTML
    });
  }
  localStorage.setItem("questionsDict", JSON.stringify(questionsDict));
  alert("Question dictionary saved!");
}
