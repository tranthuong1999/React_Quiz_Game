import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import {
  question,
  times,
  submits,
  onQuestion,
  resetQuestion,
  getQuestions,
} from "../../redux/questionSlice";
import { useHistory } from "react-router-dom";
import View from "../ViewTest";
import { useTimer } from "react-timer-hook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FCDialog } from "../../components/FCDialog";
import { FCRadioGroup } from "../../components/FCRadioGroup";
import { FCPagination } from "../../components/FCPagination";
import { FCButton } from "../../components/FCButton";

function QuestionTest({ expiryTimestamp }) {
  const listQuestion = useSelector((state) => state.question.question);

  const questionTodo = useSelector((state) => state.question.pageData);

  const isSubmit = useSelector((state) => state.question.submit);

  const timeRest = useSelector((state) => state.question.times);

  const isOnQuestion = useSelector((state) => state.question.onQuestion);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const time = new Date();

  const { seconds, minutes, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      alert("Time out");
      dispatch(submits(true));
      dispatch(onQuestion(true));
    },
  });

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
    if (timeRest > 0) {
      startTime(timeRest);
    }
  }, []);

  useEffect(() => {
    if (isSubmit) {
      pause(time);
    }
    dispatch(times(minutes * 60 + seconds));
  }, [time]);

  const startTime = (seconds) => {
    time.setSeconds(time.getSeconds() + seconds);
    restart(time);
  };

  const handleChangeValue = (e) => {
    dispatch(
      question({
        chooseAnswer: e.target.value,
        page: currentPage,
        id: listQuestion[currentQuestionIndex]?._id,
      })
    );
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    setCurrentQuestionIndex(value - 1);
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch(onQuestion(true));
    dispatch(submits(true));
    pause(times);
  };

  const handleReset = () => {
    setOpenReset(false);
    localStorage.clear();
    dispatch(submits(false));
    dispatch(resetQuestion());
    dispatch(onQuestion(false));
    setCurrentPage(1);
    setCurrentQuestionIndex(0);
    startTime(30);
  };

  const check = questionTodo?.find((e) => {
    return e.id === listQuestion[currentQuestionIndex]?._id;
  });

  return (
    <div className="total">
      <div className="container">
        <AccessTimeIcon
          style={{ fontSize: "35px", marginRight: "5px", marginTop: "10px" }}
        />
        <p>
          {minutes}:{seconds}
        </p>
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
            value={check?.chooseAnswer || null}
            handleChangeValue={handleChangeValue}
            disabled={isOnQuestion}
          />
        </div>
        <div>
          <FCDialog
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
export default QuestionTest;
