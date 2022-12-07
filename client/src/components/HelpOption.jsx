import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import callSound from "../assets/audio/call.mp3";
import openHelpOptionSound from "../assets/audio/SoundHelpOption.mp3";
import { SET_REMOVE_HALF_ANSWER_OPTION, SHOW_MODAL } from "../redux/types";
import Audience from "./Audience";
import Call from "./Call";

function HelpOption({ ansCallOption, ansChartOption }) {
  const dispatch = useDispatch();
  const [playCallSound] = useSound(callSound);
  const [playOpenHelpOptionSound] = useSound(openHelpOptionSound);
  const { isOpenVolumn, callOption, removeHalfAnsOption, audienceAnsOption } =
    useSelector((state) => state.global);
  return (
    <div className="text-white flex items-center gap-4">
      <button
        disabled={callOption}
        style={{
          background: callOption && "#9ca3af",
        }}
        onClick={() => {
          if (isOpenVolumn) {
            playCallSound();
            setTimeout(() => {
              dispatch({
                type: SHOW_MODAL,
                component: <Call ansCallOption={ansCallOption} />,
              });
            }, 1000);
          } else {
            dispatch({
              type: SHOW_MODAL,
              component: <Call ansCallOption={ansCallOption} />,
            });
          }
        }}
        className={`rounded-md  ${
          !callOption && "hover:opacity-80 cursor-pointer"
        }  bg-blueBold overflow-hidden border-2 border-white`}
      >
        <span className="p-2 w-full h-full text-xl block  text-white font-bold">
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </span>
      </button>
      <button
        disabled={removeHalfAnsOption.touched}
        style={{
          background: removeHalfAnsOption.touched && "#9ca3af",
        }}
        onClick={() => {
          if (isOpenVolumn) {
            playOpenHelpOptionSound();
          }
          dispatch({
            type: SET_REMOVE_HALF_ANSWER_OPTION,
          });
        }}
        className={`rounded-md  ${
          !removeHalfAnsOption.touched && "hover:opacity-80 cursor-pointer"
        }  bg-blueBold overflow-hidden border-2 border-white`}
      >
        <span className="p-2 w-full h-full text-xl block  text-white font-bold">
          50 / 50
        </span>
      </button>
      <button
        onClick={() => {
          if (isOpenVolumn) {
            playOpenHelpOptionSound();
          }
          dispatch({
            type: SHOW_MODAL,
            component: <Audience ansChartOption={ansChartOption} />,
          });
        }}
        disabled={audienceAnsOption}
        style={{
          background: audienceAnsOption && "#9ca3af",
        }}
        className={`rounded-md  ${
          !audienceAnsOption && "hover:opacity-80 cursor-pointer"
        }  bg-blueBold overflow-hidden border-2 border-white`}
      >
        <span className="p-2 w-full h-full text-xl block  text-white font-bold">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default memo(HelpOption);
