import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  question,
  submits,
  onQuestion,
  resetQuestion,
  getQuestions,
} from "../../redux/questionSlice";
import { useHistory } from "react-router-dom";
import View from "../View";
import "./style.scss";
import { FCDialog } from "../../components/FCDialog";
import { FCRadioGroup } from "../../components/FCRadioGroup";
import { FCPagination } from "../../components/FCPagination";
import { FCButton } from "../../components/FCButton";

function Question() {
  const [answer, setAnswer] = useState("");
  const [chooseAnswer, setChooseAnswer] = useState();
  const [on, setOn] = useState(false);
  const listQuestion = useSelector((state) => state.question.question);

  const questionTodo = useSelector((state) => state.question.pageData);

  const isSubmit = useSelector((state) => state.question.submit);

  const isOnQuestion = useSelector((state) => state.question.onQuestion);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);

  const [openReset, setOpenReset] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenReset = () => {
    setOpenReset(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseReset = () => {
    setOpenReset(false);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  useEffect(() => {
    if (answer) {
      dispatch(
        question({
          chooseAnswer,
          answer,
          on,
          page: currentPage,
          correct: listQuestion[currentQuestionIndex].answer,
        })
      );
    }
  }, [answer]);

  const handleChangeValue = (e) => {
    const chooseAnswer = e.target.value;
    const answerCorrect = listQuestion[currentQuestionIndex]?.answer;
    if (chooseAnswer.localeCompare(answerCorrect) === 0) {
      setAnswer("Correct");
    }
    if (chooseAnswer.localeCompare(answerCorrect) !== 0) {
      setAnswer("False");
    }
    setChooseAnswer(chooseAnswer);
    setOn(true);
  };

  const handleChangePage = (event, value) => {
    console.log("handle change", value);
    if (value > currentQuestionIndex + 1) {
      return;
    }
    setCurrentPage(value);
    setCurrentQuestionIndex(value - 1);
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch(onQuestion(true));
    dispatch(submits(true));
  };

  const handleReset = () => {
    setOpenReset(false);
    localStorage.clear();
    dispatch(submits(false));
    dispatch(resetQuestion());
    dispatch(onQuestion(false));
    setCurrentPage(1);
    setCurrentQuestionIndex(0);
  };
  const endGame = () => {
    alert("End game");
    dispatch(submits(true));
  };
  const handleBtnNext = () => {
    if (currentPage + 1 > listQuestion.length) {
      endGame();
      return;
    }
    setAnswer("");
    setCurrentPage(currentPage + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="total">
      <div className="container">
        <div className="child1">
          <FCPagination
            totalPage={listQuestion.length}
            handleChange={handleChangePage}
            page={currentPage}
          />
          <div className="btn-button">
            <FCButton
              text="Back"
              color="primary"
              handleAction={() => history.push("/")}
            />
            <FCButton
              text="Submit"
              color="success"
              handleAction={handleClickOpen}
            />
            <FCButton
              text="Reset"
              color="error"
              handleAction={handleClickOpenReset}
            />
          </div>
        </div>
        <div className="child2">
          <h2>
            {currentQuestionIndex + 1}.
            {listQuestion[currentQuestionIndex]?.question}
          </h2>
          <FCRadioGroup
            radioList={listQuestion[currentQuestionIndex]?.option}
            value={questionTodo[currentQuestionIndex]?.chooseAnswer || null}
            handleChangeValue={handleChangeValue}
            disabled={questionTodo[currentQuestionIndex]?.on || isOnQuestion}
          />
          <div style={{ color: "red" }}>
            {questionTodo[currentQuestionIndex]?.answer}
          </div>
          {questionTodo[currentQuestionIndex]?.chooseAnswer && (
            <FCButton text="Next" color="error" handleAction={handleBtnNext} />
          )}
        </div>
        <div>
          <FCDialog
            title="Submit"
            open={open}
            handleClose={handleClose}
            content="Are you sure you want to submit your test?"
            handleCancel={handleClose}
            handleSubmit={handleSubmit}
            nameBtn="Submit"
          />
        </div>
        <div>
          <FCDialog
            title="Reset"
            open={openReset}
            content=" Are you sure you want to reset your test?"
            handleCancel={handleCloseReset}
            handleSubmit={handleReset}
            nameBtn="Reset"
          />
        </div>
      </div>
      <div className="view-result">{isSubmit && <View />}</div>
    </div>
  );
}
export default Question;
