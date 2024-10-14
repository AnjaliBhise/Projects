import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useSound from 'use-sound';
import correctSound from "../Sounds/correct.mp3";
import wrongSound from "../Sounds/wrong.mp3";
import './QueScreen.css';  // Import your CSS file here

const QueScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question
  const [timerActive, setTimerActive] = useState(true); // To control the timer
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
      correctAnswer: "C) Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["A) Venus", "B) Saturn", "C) Mars", "D) Jupiter"],
      correctAnswer: "C) Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["A) Charles Dickens", "B) William Shakespeare", "C) Mark Twain", "D) George Orwell"],
      correctAnswer: "B) William Shakespeare",
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["A) Elephant", "B) Blue Whale", "C) Giraffe", "D) Great White Shark"],
      correctAnswer: "B) Blue Whale",
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["A) Brazil", "B) Germany", "C) France", "D) Argentina"],
      correctAnswer: "C) France",
    }
  ];

  const navigate = useNavigate();

  // Load sounds
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  // Timer functionality
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setShowFeedback(true);
      setTimeout(() => {
        alert("Time is up! Redirecting to home page...");
        navigate('/');
      }, 2000);
    }
  }, [timeLeft, timerActive, navigate]);

  const handleAnswerClick = (answer) => {
    // Stop the timer when an answer is clicked
    setTimerActive(false);

    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    
    // Play the appropriate sound
    if (isCorrect) {
      playCorrect(); // Play correct sound
    } else {
      playWrong(); // Play wrong sound
    }

    setIsAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      if (currentQuestionIndex === questions.length - 1) {
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowFeedback(false);
          setTimeLeft(30); // Reset timer for the next question
          setTimerActive(true); // Restart the timer
        }, 2000);
      }
    } else {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="row w-100">
          <div className="col-12 text-center">
            <h1 className="mb-4" style={{ fontSize: '1.5rem',color: "white" }}>Question {currentQuestionIndex + 1}:</h1>
            <p className="question mb-3">{questions[currentQuestionIndex].question}</p>
            <div className="text-left mb-3 timer"> {/* Added class for timer */}
              Time Left: {timeLeft} seconds
            </div>
            <ul className="list-unstyled answers"> {/* Added class for answers */}
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li
                  key={index}
                  className="answer" // Applied class here
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
    
            {showFeedback && (
              <p className="mt-3 feedback"> {/* Added class for feedback */}
                {isAnswerCorrect
                  ? 'Answer is correct!'
                  : 'Incorrect answer! Redirecting to home page...'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
};

export default QueScreen;
