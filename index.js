const STORE = [
  {
    question: "What is the first region you experience in Pokemon?",
    answers: ["Hoenn", "Kanto", "Johto", "Galar", "Kalos"],
    correctAnswer: "Kanto"
  },
  {
    question: "What Pokemon is #25 in the national Pokedex?",
    answers: ["Magikarp", "Chansey", "Zubat", "Pikachu", "Mewtwo"],
    correctAnswer: "Pikachu"
  },
  {
    question: "What type is Eevee?",
    answers: ["Grass", "Water", "Dragon", "Fighting", "Normal"],
    correctAnswer: "Normal"
  },
  {
    question: "Who is the second gym leader in Kanto?",
    answers: ["Misty", "Giovanni", "Blane", "Koga", "Brock"],
    correctAnswer: "Misty"
  },
  {
    question: "How many badges are needed to enter the Pokemon League?",
    answers: ['three', 'twelve', 'eight', 'fourteen', 'ten'],
    correctAnswer: 'eight'
  }
];

let score = 0;
let questionNumber = 0;
let currentQuestion = STORE[questionNumber].question;

function updateQuestionNumber() {
  if(questionNumber < 5){
    questionNumber++;
    $(".questionCounter").text(questionNumber+1);
  }
}

function updateScore() {
  score++;
  $(".scoreCounter").text(score);
}

function resetQuiz() {
  score = 0;
  questionNumber = 0;
  $('.startQuiz').show();
  $(`<button type="button" class="startButton" id="startButton">Start Quiz</button>`).appendTo('.startQuiz')
  $('.choiceDisplay').empty()
  beginQuiz()
}

$(document).on("click", ".startButton", function(event) {
    event.preventDefault();
    $(".startQuiz").hide();
    $("feedbackDisplay").hide();
    $(".resultsDisplay").hide();
    $(".choiceDisplay").hide();
    $(".questionDisplay").show();
    $(".questionCounter").text(`${questionNumber + 1}`);
    $('.scoreCounter').text(`${score}`)
    $(".startButton").text("Submit Answer");
    console.log("click event ran, rendering question.");
    renderForm();
    $(".questionNumber").text(1);
    $("button").removeClass("startButton");
    $("#startButton").hide();
    renderQuestion()
 })



function beginQuiz() {
  console.log('beginning quiz')
   score = 0;
   questionNumber = 0;
  $(".questionDisplay").hide();
  
 ;
}

function renderForm() {
  console.log('rendering form')
  $(".choiceDisplay").show();

    $(".choiceDisplay").append(
      `<form>
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answers" required>${STORE[questionNumber].answers[0]}</input><br></br>
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answers" required>${STORE[questionNumber].answers[1]}</input><br></br>
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answers" required>${STORE[questionNumber].answers[2]}</input><br></br>
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answers" required>${STORE[questionNumber].answers[3]}</input><br></br>
        <input type="radio" value="${STORE[questionNumber].answers[4]}" name="answers" required>${STORE[questionNumber].answers[4]}</input><br></br>
        <button type="submit" class="submitButton">Submit Answer</button>
    </form>`);

}

function renderQuestion() {
  if (questionNumber < STORE.length) {
    return createQuestion(questionNumber);
  } 
}

function createQuestion(questionNumber) {
  console.log(STORE[questionNumber].question);
  $('.questionDisplay').html(`<p>${STORE[questionNumber].question}</p>`)
 
}

function submitAnswer() {
  if(questionNumber <= 4) {
    $(".choiceDisplay").on("submit", function(event) {
      event.preventDefault();
      let selected = $("input:checked").val(); 
      let trueAnswer = STORE[questionNumber].correctAnswer;
    console.log(selected)
      if (selected === trueAnswer) {
        goodJob();
      } else {
        tryAgain();
      }
    });
  }
}

function goodJob() {
  //$(".choiceDisplay").hide();
  $(".feedbackDisplay").show();
  $(".feedbackDisplay").html(`<p>Great Job! That was correct!</p>`);
  $('<button type="submit" class="nextButton">Next Question</button>').appendTo(
    ".feedbackDisplay"
  );
  updateScore();
}

function tryAgain() {
  //$(".choiceDisplay").hide();
  $(".feedbackDisplay").show();
  $(".feedbackDisplay").html(
    `<p>Better luck next time. The correct answer was ${
      STORE[questionNumber].correctAnswer
    }</p>`
  );
  $('<button type="submit" class="nextButton">Next Question</button>').appendTo(
    ".feedbackDisplay"
  );
}

function nextQuestion() {
  $(".feedbackDisplay").on("click", '.nextButton', function(event) {
    
    console.log(questionNumber)
    if (questionNumber == 4){
      finalResults()
    } else {
      updateQuestionNumber();
      renderQuestion();
      $('.choiceDisplay').empty()
      renderForm()  
      $(".feedbackDisplay").hide();
      $('.choiceDisplay').show();
      }
    });
}

function finalResults(){
  $('.questionDisplay').html(`<p>You got ${score} correct</p>`);
  $('.feedbackDisplay').hide();
  $('.choiceDisplay').hide();
  $('.resultsDisplay').show();
  console.log('results ran')
  $('.resultsDisplay').append(`<p class="showScore">You got ${score} correct</p>`)
  $('<button type="submit" class="restartButton">Try Again?</button>').appendTo(
    '.questionDisplay')
  $('.questionDisplay').on('click', function(event){
    resetQuiz()
  });
};

function renderQuiz() {
  beginQuiz();
  submitAnswer();
  nextQuestion();
}
$(renderQuiz);
