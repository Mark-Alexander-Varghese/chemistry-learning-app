// src/components/InteractiveQuiz.jsx
import React, { useState, useEffect } from 'react';
import { Check, X, ChevronRight, RefreshCcw, AlertCircle } from 'lucide-react';
import './InteractiveQuiz.css';

const InteractiveQuiz = ({ chapterId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Quiz questions mapped to chapter IDs
  const quizQuestions = {
    'lech101': [
      {
        question: "What is the central science that connects physical sciences with life sciences?",
        options: [
          "Physics",
          "Biology",
          "Chemistry",
          "Geology"
        ],
        correctAnswer: 2,
        explanation: "Chemistry is often called the 'central science' because it connects physics with other natural sciences such as biology, geology, and environmental science."
      },
      {
        question: "Which of the following is NOT a state of matter?",
        options: [
          "Solid",
          "Liquid",
          "Gas",
          "Energy"
        ],
        correctAnswer: 3,
        explanation: "The three common states of matter are solid, liquid, and gas. Plasma is the fourth state. Energy is not a state of matter but a property of matter."
      },
      {
        question: "What is the process called when a solid changes directly to a gas without becoming a liquid?",
        options: [
          "Evaporation",
          "Sublimation",
          "Condensation",
          "Deposition"
        ],
        correctAnswer: 1,
        explanation: "Sublimation is the phase transition where a solid directly turns into a gas without passing through the liquid state, such as dry ice (solid CO₂) turning directly into CO₂ gas."
      }
    ],
    'lech102': [
      {
        question: "What particle has a negative charge and orbits the nucleus?",
        options: [
          "Proton",
          "Neutron",
          "Electron",
          "Photon"
        ],
        correctAnswer: 2,
        explanation: "Electrons are subatomic particles with a negative electrical charge that orbit around the nucleus of an atom."
      },
      {
        question: "Who proposed the planetary model of the atom?",
        options: [
          "John Dalton",
          "J.J. Thomson",
          "Ernest Rutherford",
          "Niels Bohr"
        ],
        correctAnswer: 2,
        explanation: "Ernest Rutherford proposed the planetary model of the atom after his gold foil experiment, suggesting that atoms have a dense, positively charged nucleus with electrons orbiting around it."
      }
    ],
    // Add more questions for other chapters
  };

  // Default to first chapter if the provided chapter has no questions
  const currentQuestions = quizQuestions[chapterId] || quizQuestions['lech101'];

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setQuizComplete(false);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswerIndex(answerIndex);
    setIsAnswered(true);
    
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isAnswerCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswerIndex(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(prev => !prev);
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {!quizComplete ? (
        <>
          <div className="quiz-header">
            <h2>Chapter Quiz</h2>
            <div className="quiz-progress">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </div>
          </div>

          <div className="quiz-question">
            <h3>{currentQuestion.question}</h3>
            
            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    selectedAnswerIndex === index 
                      ? isCorrect 
                        ? 'correct' 
                        : 'incorrect' 
                      : ''
                  } ${isAnswered && index === currentQuestion.correctAnswer ? 'correct' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                >
                  <span className="option-text">{option}</span>
                  {isAnswered && (
                    <span className="option-icon">
                      {index === currentQuestion.correctAnswer ? (
                        <Check className="check-icon" />
                      ) : (
                        selectedAnswerIndex === index ? (
                          <X className="x-icon" />
                        ) : null
                      )}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {isAnswered && (
              <div className="quiz-feedback">
                <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? (
                    <span>Correct! Well done.</span>
                  ) : (
                    <span>Incorrect. The right answer is: {currentQuestion.options[currentQuestion.correctAnswer]}</span>
                  )}
                </div>
                
                {currentQuestion.explanation && (
                  <div className="explanation-container">
                    <button className="explanation-toggle" onClick={toggleExplanation}>
                      <AlertCircle size={16} className="explanation-icon" />
                      {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                    </button>
                    
                    {showExplanation && (
                      <div className="explanation-content">
                        {currentQuestion.explanation}
                      </div>
                    )}
                  </div>
                )}
                
                <button className="next-button" onClick={handleNextQuestion}>
                  {currentQuestionIndex < currentQuestions.length - 1 ? (
                    <>Next Question <ChevronRight size={16} /></>
                  ) : (
                    <>Complete Quiz <ChevronRight size={16} /></>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="quiz-results">
          <h2>Quiz Complete!</h2>
          <div className="score-display">
            <div className="score-value">{score}/{currentQuestions.length}</div>
            <div className="score-label">
              {score === currentQuestions.length 
                ? 'Perfect Score!' 
                : score >= currentQuestions.length * 0.7 
                  ? 'Great Job!' 
                  : 'Keep Practicing!'}
            </div>
          </div>
          
          <div className="results-actions">
            <button className="restart-button" onClick={resetQuiz}>
              <RefreshCcw size={16} /> Take Quiz Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuiz;