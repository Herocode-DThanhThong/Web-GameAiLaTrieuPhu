import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../redux/types";
function Modal(props) {
  const { componentModal } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <div
      onClick={(e) => {
        if (e.target.className.includes("modal-app")) {
          dispatch({
            type: HIDE_MODAL,
          });
        }
      }}
      className="fixed modal-app h-full w-full top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)]"
    >
      <div className="absolute w-[200px] ssm:w-[300px] rounded-md p-4 z-10 bg-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
        {componentModal}
      </div>
    </div>
  );
}

export default Modal;
