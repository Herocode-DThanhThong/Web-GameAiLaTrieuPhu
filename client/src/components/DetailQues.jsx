import React from "react";
import { useDispatch } from "react-redux";
import { HIDE_MODAL } from "../redux/types";

function DetailQues({ question, answers }) {
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="text-center font-semibold">{question}</h1>
      <div className="">
        {answers.map((item, index) => (
          <p
            key={index}
            className="mb-2 p-1 text-ellipsis overflow-hidden whitespace-nowrap text-black rounded-sm"
          >
            <strong>{item.key}.</strong> {item.ans}
          </p>
        ))}
      </div>
      <button
        onClick={() => {
          dispatch({
            type: HIDE_MODAL,
          });
        }}
        className="block mx-auto bg-blueBold hover:opacity-90 text-white outline-none rounded-md py-1 px-4"
      >
        Thoát
      </button>
    </>
  );
}

export default DetailQues;
