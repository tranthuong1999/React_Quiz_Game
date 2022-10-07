import React from "react";
import { useSelector } from "react-redux";
import { FCRadioGroup } from "../../components/FCRadioGroup";

export default function View() {
  const listQuestion = useSelector((state) => state.question.question);
  const questionTodo = useSelector((state) => state.question.pageData);

  return (
    <div>
      {listQuestion?.map((question, index) => {
        return (
          <div key={question._id}>
            <h2>
              {" "}
              {index + 1}.{question.question}
            </h2>
            <FCRadioGroup
              radioList={question.option}
              value={questionTodo[index]?.chooseAnswer}
            />
            {questionTodo[index]?.answer === "Correct" ? (
              <div style={{ color: "green" }}> True </div>
            ) : (
              <div style={{ color: "red" }}>
                False.{questionTodo[index]?.correct}{" "}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
