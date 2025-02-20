import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../personalQuestions.json";
import "./css/PQ.css";
import Footer from "./Footer";
import Nav2 from "./Nav2";

const PQ = () => {
  const [gradeLevel, setGradeLevel] = useState("");
  const [userQuestions, setUserQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setGradeLevel(parsedUser.gradeLevel || "");
      setUserQuestions(questionsData[parsedUser.gradeLevel] || []);
    }
  }, []);

  const handleCheckboxToggle = (question, option) => {
    setAnswers((prev) => {
      const currentAnswers = prev[question] || [];
      return {
        ...prev,
        [question]: currentAnswers.includes(option)
          ? currentAnswers.filter((item) => item !== option)
          : [...currentAnswers, option],
      };
    });
  };

  const handleSubmit = () => {
    alert("Success! Your responses have been recorded.");
    console.log("User Answers:", answers);
    navigate("/nextStep");
  };

  return (
    <>
   <Nav2/>
    <div className="questions-container">
      <h2>Personal Questions</h2>
      {userQuestions.length > 0 ? (
        userQuestions.map((q, index) => (
          <div key={index} className="question-block">
            <p>{index + 1}. {q.question}</p>
            {q.options.map((option, optIndex) => (
              <div key={optIndex} className="option">
                <input
                  type="checkbox"
                  checked={answers[q.question]?.includes(option) || false}
                  onChange={() => handleCheckboxToggle(q.question, option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No questions available for your grade level.</p>
      )}
      <button className="submit-btn" onClick={ ()=> window.location.href = '/exam'}>Submit Answers</button>
    </div>
    <Footer/>
    </>
  );
};

export default PQ;
