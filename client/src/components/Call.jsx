import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserSupport from "../assets/img/userSupport.gif";
import { HIDE_MODAL, SET_CALL_OPTION } from "../redux/types";
function Call({ ansCallOption }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_CALL_OPTION,
    });
  }, [dispatch]);
  return (
    <>
      <h1 className="text-center mb-2">
        Người hỗ trợ: <span className="font-semibold">Kaito Kid</span>
      </h1>
      <div className="w-[100px] mx-auto h-[100px]">
        <img
          src={UserSupport}
          alt=""
          className="w-full rounded-md h-full object-cover"
        />
      </div>
      <h1 className="text-center mt-4">
        Đáp án của tôi là:{" "}
        <strong className="font-semibold text-red-600">{ansCallOption}</strong>{" "}
      </h1>
      <div
        onClick={() => {
          dispatch({
            type: HIDE_MODAL,
          });
        }}
        className="p-2 flex justify-center"
      >
        <button className="bg-blueBold hover:opacity-90 text-white outline-none rounded-md py-1 px-4">
          Thoát
        </button>
      </div>
    </>
  );
}

export default Call;
