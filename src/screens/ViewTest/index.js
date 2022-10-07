import React from "react";
import { useSelector } from "react-redux";
import { FCRadioGroup } from "../../components/FCRadioGroup";

export default function ViewAnswer() {
  const listQuestion = useSelector((state) => state.question.question);
  const questionTodo = useSelector((state) => state.question.pageData);

  const check = listQuestion.map((e) => {
    const chooseAnswer = questionTodo.find((item) => item.id === e._id);
    return {
      ...e,
      chooseAnswer,
    };
  });

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
              value={check[index]?.chooseAnswer?.chooseAnswer || null}
            />
            {check[index]?.chooseAnswer?.chooseAnswer.localeCompare(
              check[index].answer
            ) === 0 ? (
              <p style={{ color: "green" }}>True</p>
            ) : (
              <p style={{ color: "red" }}>
                {" "}
                False. Correct is : {check[index].answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
