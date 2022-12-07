import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailQues from "../../components/DetailQues";
import FormAddQuestion from "../../components/Form/FormAddQuestion";
import {
  DELETE_QUESTION_SAGA,
  GET_ALL_QUESTION_SAGA,
  SHOW_MODAL,
} from "../../redux/types";
function AdminPage(props) {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);
  const [audio, setAudio] = useState("");

  useEffect(() => {
    dispatch({
      type: GET_ALL_QUESTION_SAGA,
    });
  }, [dispatch]);
  const renderQuestion = () => {
    return questions?.map(
      ({ question, key, audio, answers, id, public_id }, index) => (
        <div
          key={index}
          className="w-[200px] border-[1px] rounded-md shadow-sm py-2 px-2"
        >
          <h1 className="text-ellipsis py-1 bg-blueBold rounded-sm text-base text-white px-2 overflow-hidden whitespace-nowrap">
            <strong>{index + 1}.</strong> {question}
          </h1>

          <div className="px-2 mt-2">
            {answers.map((x, y) => (
              <p
                key={y}
                style={{
                  background: x.key === key && "#4ade80",
                  color: x.key === key && "#fff",
                }}
                className="mb-2 p-1 text-ellipsis overflow-hidden whitespace-nowrap text-black rounded-sm"
              >
                <strong>{x.key}.</strong> {x.ans}
              </p>
            ))}
          </div>

          <div className="flex gap-4">
            <svg
              style={{
                color: questions.length <= 12 && "#ccc",
                background: questions.length <= 12 && "#eee",
              }}
              onClick={() => {
                if (questions.length > 12) {
                  if (window.confirm("Bạn chắc chắn muốn xóa câu hỏi này?")) {
                    dispatch({
                      type: DELETE_QUESTION_SAGA,
                      data: {
                        id,
                        publicID: public_id,
                      },
                    });
                  }
                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 hover:opacity-90 p-1 bg-blueBold rounded-md cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>

            <svg
              onClick={() => {
                dispatch({
                  type: SHOW_MODAL,
                  component: (
                    <DetailQues question={question} answers={answers} />
                  ),
                });
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-teal-500 hover:opacity-90 p-1 bg-blueBold rounded-md cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              onClick={async () => {
                await setAudio(audio);
                document.querySelector(".audio-ques").play();
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:opacity-75 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
        </div>
      )
    );
  };
  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <h1 className="text-center font-semibold uppercase text-2xl">
        Quản lí câu hỏi
      </h1>
      <p>
        <span className="font-semibold text-[18px]">Chú ý: </span>{" "}
        <span className="capitalize text-red-500 text-sm">
          số lượng câu hỏi phải lớn hơn 12 mới thực hiện được chức năng xóa
        </span>
      </p>
      <div className="flex justify-center flex-wrap gap-4 mt-2">
        {renderQuestion()}
      </div>
      <div
        onClick={() => {
          dispatch({
            type: SHOW_MODAL,
            component: <FormAddQuestion />,
          });
        }}
        className="fixed bottom-3 p-3 rounded-full cursor-pointer hover:opacity-90 right-3 bg-blueBold text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      {audio && <audio src={audio} className="audio-ques" />}
    </div>
  );
}

export default AdminPage;
