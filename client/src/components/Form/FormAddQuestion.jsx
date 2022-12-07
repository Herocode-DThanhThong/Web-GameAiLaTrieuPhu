import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_QUESTION_SAGA, HIDE_MODAL } from "../../redux/types";
function FormAddQuestion(props) {
  const dispatch = useDispatch();
  const [dataQues, setDataQues] = useState({
    question: "",
    key: "",
    audio: "",
  });

  const [ansKeyA, setAnsKeyA] = useState("");
  const [ansKeyB, setAnsKeyB] = useState("");
  const [ansKeyC, setAnsKeyC] = useState("");
  const [ansKeyD, setAnsKeyD] = useState("");

  const handleChange = (e) => {
    const { name } = e.target;

    // Question
    if (name === "question")
      setDataQues({
        ...dataQues,
        question: e.target.value,
      });

    // Ans
    if (name === "A") setAnsKeyA(e.target.value);
    else if (name === "B") setAnsKeyB(e.target.value);
    else if (name === "C") setAnsKeyC(e.target.value);
    else setAnsKeyD(e.target.value);
  };
  const handleSubmit = () => {
    // Validate data
    if (
      !ansKeyA ||
      !ansKeyB ||
      !ansKeyC ||
      !ansKeyD ||
      !dataQues.question ||
      !dataQues.key ||
      !dataQues.audio
    )
      return alert("Thông tin bạn nhập không đủ!. Vui lòng kiểm tra lại");
    // Submit
    dispatch({
      type: ADD_QUESTION_SAGA,
      data: {
        ...dataQues,
        answers: [
          { key: "A", ans: ansKeyA },
          { key: "B", ans: ansKeyB },
          { key: "C", ans: ansKeyC },
          { key: "D", ans: ansKeyD },
        ],
      },
    });
  };
  return (
    <>
      <h1 className="text-center font-semibold text-xl">Thêm câu hỏi</h1>
      <div className="px-2 py-2">
        <div className="mb-4">
          <p className="font-semibold mb-2 capitalize text-sm">Câu hỏi</p>
          <input
            onChange={handleChange}
            name="question"
            type="text"
            placeholder="Nhập câu hỏi của bạn..."
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-2 px-4 focus:border-blue-900"
          />
        </div>
        <div className="mb-4 flex gap-2 items-center">
          <span className="font-semibold mb-2 capitalize">A. </span>
          <input
            name="A"
            onChange={handleChange}
            type="text"
            placeholder="Nhập đáp án..."
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-1 px-4 focus:border-blue-900"
          />
          <input
            type="radio"
            name="key"
            onChange={(e) => {
              if (e.target.checked) {
                setDataQues({
                  ...dataQues,
                  key: "A",
                });
              }
            }}
          />
        </div>
        <div className="mb-4 flex gap-2 items-center">
          <span className="font-semibold mb-2 capitalize">B. </span>
          <input
            onChange={handleChange}
            name="B"
            type="text"
            placeholder="Nhập đáp án..."
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-1 px-4 focus:border-blue-900"
          />
          <input
            type="radio"
            name="key"
            onChange={(e) => {
              if (e.target.checked) {
                setDataQues({
                  ...dataQues,
                  key: "B",
                });
              }
            }}
          />
        </div>
        <div className="mb-4 flex gap-2 items-center">
          <span className="font-semibold mb-2 capitalize">C. </span>
          <input
            onChange={handleChange}
            name="C"
            type="text"
            placeholder="Nhập đáp án..."
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-1 px-4 focus:border-blue-900"
          />
          <input
            type="radio"
            name="key"
            onChange={(e) => {
              if (e.target.checked) {
                setDataQues({
                  ...dataQues,
                  key: "C",
                });
              }
            }}
          />
        </div>
        <div className="mb-4 flex gap-2 items-center">
          <span className="font-semibold mb-2 capitalize">D. </span>
          <input
            name="D"
            onChange={handleChange}
            type="text"
            placeholder="Nhập đáp án..."
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-1 px-4 focus:border-blue-900"
          />
          <input
            type="radio"
            name="key"
            onChange={(e) => {
              if (e.target.checked) {
                setDataQues({
                  ...dataQues,
                  key: "D",
                });
              }
            }}
          />
        </div>
        <div className="mb-4 ">
          <p className="font-semibold mb-2 capitalize text-sm">
            giọng đọc (* .mp3)
          </p>
          <input
            onChange={(e) => {
              setDataQues({
                ...dataQues,
                audio: Array.from(e.target.files),
              });
            }}
            name="audio"
            type="file"
            accept=".mp3"
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-1 px-4 focus:border-blue-900"
          />
        </div>
      </div>

      <div className="">
        <button
          onClick={() => {
            dispatch({
              type: HIDE_MODAL,
            });
          }}
          className="mr-2 bg-red-500 hover:opacity-90 text-white outline-none rounded-md py-1 px-4"
        >
          Thoát
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:opacity-90 text-white outline-none rounded-md py-1 px-4"
        >
          Thêm
        </button>
      </div>
    </>
  );
}

export default FormAddQuestion;
