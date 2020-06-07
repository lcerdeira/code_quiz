// jQuery initial function
$(document).ready(function() {

    // Questions List
    var questionsArray = [{
            question: "1. Inside which HTML element do we put the JavaScript?",
            answers: {
                0: "\"script\"",
                1: "\"js\"",
                2: "\"scripting\"",
                3: "\"javascript\""
            },
            correctAnswer: "0"
        },
        {
            question: "2. Where is the correct place to insert a JavaScript?",
            answers: {
                0: "The \"head\" section",
                1: "Both the \"head\" section and the \"body\" section",
                2: "The \"body\" section",
                3: "In the Style Sheet"
            },
            correctAnswer: "1"
        },
        {
            question: "3. What is the correct attribute for referring to an external script called \"123\.js\"?",
            answers: {
                0: "src=",
                1: "name=",
                2: "href=",
                3: "loc="
            },
            correctAnswer: "0"
        },
        {
            question: "4. How do you write \"Hello World\" in an alert box?",
            answers: {
                0: "alert(\"Hello World\"); ",
                1: "msg(\"Hello World\");",
                2: "msgBox(\"Hello World\");",
                3: "alertBox(\"Hello World\");"
            },
            correctAnswer: "0"
        },
        {
            question: "5. How do you create a function in JavaScript?",
            answers: {
                0: "function myFunction() ",
                1: "function:myFunction()",
                2: "function = myFunction()",
                3: "toFunction = myFunction()"
            },
            correctAnswer: "0"
        },
        {
            question: "6. How do you call a function named \"myFunction\"?",
            answers: {
                0: "call function myFunction()",
                1: "myFunction()",
                2: "call myFunction()",
                3: "here myFunction() myFunction()"
            },
            correctAnswer: "1"
        },
        {
            question: "7. How to write an IF statement in JavaScript?",
            answers: {
                0: "if i = 5",
                1: "if i == 5 then",
                2: "if (i == 5)  ",
                3: "if i = 5 then"
            },
            correctAnswer: "2"
        },
        {
            question: "8. How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
            answers: {
                0: "if (i <> 5)",
                1: "if i =! 5 then",
                2: "if i <> 5",
                3: "if (i != 5)"
            },
            correctAnswer: "3"
        },
        {
            question: "9. How does a WHILE loop start?",
            answers: {
                0: "while (i <= 10)",
                1: "while (i <= 10; i++)",
                2: "while i = 1 to 10",
                3: "for i = 1 to 10"
            },
            correctAnswer: "0"
        },
        {
            question: "10. How can you add a comment in a JavaScript?",
            answers: {
                0: "//This is a comment ",
                1: "!--This is a comment--",
                2: "'This is a comment",
                3: "/-This is a comment "
            },
            correctAnswer: "0"
        },
    ];

    // Variables
    var n = 0;
    var counter = 0;
    var totalTime = 30;
    var highScores = [];

    // when Start Quiz button is clicked...
    $(".start").on("click", questionTime);
    $(".start").on("click", startTimer);
    $(".resultButton").on("click", resultsPage);
    $(".resultButton").on("click", getHighScores);

    // Questions List is called, initial page is hidden
    function questionTime() {

        // Display setting
        $(".initialPage").css("display", "none");
        $(".scoreSection").css("display", "block");

        // Show question
        $(".questionsContainer").text(questionsArray[n].question);
        $(".questionsContainer").append($("<hr>"));

        // Create Answer List
        for (i = 0; i < 4; i++) {
            var list = $("<li>");
            $(list).text((i + 1) + ".");

            // Create Answer Buttons
            var newButtons = $("<button>" + questionsArray[n].answers[i] + "</button>");
            newButtons.attr("class", "buttons");
            $(newButtons).attr("value", i);

            $(list).append(newButtons);
            $(".questionsContainer").append(list);
            $(".questionsContainer").append($("<hr>"));

            newButtons.on("click", rightWrong);
        };

        // Determine if answer = right or wrong, then what happens when finished
        function rightWrong() {
            console.log($(this).prop("value"));
            var userAnswer = $(this).prop("value");

            // If answer is right or wrong and theres no more questions
            if (userAnswer === questionsArray[n].correctAnswer && n === 9) {
                console.log("thats all");
                counter++;
                getHighScores();
                resultsPage();
                $(".counter").text(counter);
            }
            if (userAnswer != questionsArray[n].correctAnswer && n === 9) {
                console.log("thats all");
                getHighScores();
                resultsPage();
            }

            // If answer is right or wrong and there is more questions
            else if (userAnswer === questionsArray[n].correctAnswer && n < 9) {
                console.log("correct");
                n++;
                counter++;
                questionTime();
                $(".counter").text(counter)
                if (totalTime < 0) {
                    totalTime = 0;
                }
            } else if (userAnswer != questionsArray[n].correctAnswer && n < 9) {
                console.log("incorrect");
                n++;
                if (totalTime > 0) {
                    totalTime -= 5;
                }
                if (totalTime < 0) {
                    totalTime = 0;
                }
                questionTime();
                $(".counter").text(counter);
            };
        };
    };

    // Timer Function
    function startTimer() {

        var countingDown = setInterval(function() {
            $(".countDown").text(totalTime);
            totalTime--;
            console.log(totalTime)
                // What happens when time runs out  
            if (totalTime === -1) {
                $(".countDown").text("");
                getHighScores();
                resultsPage();
                clearInterval(countingDown);
            }
            // What happens if questions are finished before time runs out
            else if (n === 9) {
                clearInterval(countingDown);
            };
        }, 1000);
    };

    // Results Page
    function resultsPage() {

        // What is displayed
        $(".resultContainer").css("display", "block");
        $(".results").css("display", "block");
        $(".questionsContainer").css("display", "none");
        $(".initialPage").css("display", "none");
        $(".scoreOne").css("display", "none");
        $(".timeOne").css("display", "none");

        // clear list
        $(".resultsList").text("");

        // When a user logs their score
        for (var i = 0; i < highScores.length; i++) {
            var high = highScores[i];

            var list = $("<li>");
            list.text(high);
            list.attr("data-index", i);
            list.attr("class", "highScoreList");

            var removeButton = $("<button>");
            removeButton.attr("class", "remove");
            removeButton.text("x");

            list.append(removeButton);
            $(".resultsList").append(list);
        };
    };

    // Retrieving high scores from local storage
    function getHighScores() {
        var savedHighScores = JSON.parse(localStorage.getItem("highScores"));
        if (savedHighScores !== null) {
            highScores = savedHighScores;
        };
        resultsPage();
    };

    // Saving high scores to local storage
    function saveHighScores() {
        localStorage.setItem("highScores", JSON.stringify(highScores));
    };

    // When the user submits their name
    $(".resultsForm").on("submit", function(event) {
        event.preventDefault();
        var highScoreText = $(".resultsText").val();
        if (highScoreText === "") {
            return;
        };

        highScores.push(highScoreText + ":" + " Score = " + counter + " TimeLeft = " + (totalTime + 1) + " ");
        $(".resultsText").val("");

        resultsPage();
        saveHighScores();
    });

    // Removing a high score from the list
    $(".resultsList").on("click", function(event) {
        var input = event.target;

        if (input.matches("button") === true) {
            var index = input.parentElement.getAttribute("data-index");
            highScores.splice(index, 1);

            saveHighScores();
            resultsPage();
        };
    });
});