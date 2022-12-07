import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_RANK_SAGA, CLEAR_REMOVE_HALF_ANSWER_OPTION } from "../redux/types";
import { boardMoney } from "../utils/data";
import HelpOption from "./HelpOption";
import Score from "./Score";
import Settings from "./Settings";
import Timer from "./Timer";

function Question({ questions, currentQues, setCurrentQues, user }) {
  const dispatch = useDispatch();
  const [audio, setAudio] = useState("");
  const [currentMoney, setCurrentMoney] = useState(0);
  const [chooseAns, setChooseAns] = useState("");
  const [timer, setTimer] = useState(30);
  const [isConfirm, setIsConfirm] = useState(false);
  const [showCorrectAns, setShowCorrectAns] = useState({
    touched: false,
    key: questions[currentQues].key,
  });
  const { removeHalfAnsOption } = useSelector((state) => state.global);
  const renderAns = () => {
    // Handle case use help option 50/50
    if (removeHalfAnsOption.touched && !removeHalfAnsOption.flag) {
      let count = 0;
      return questions[currentQues]?.answers?.map(({ key, ans }, index) => {
        // Remove half ans
        if (count < 2 && key !== questions[currentQues]?.key) {
          count++;
          return (
            <button
              className={`px-4 rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]`}
              key={index}
            ></button>
          );
        }

        // * Handle remaining ans * //
        // Handle click ans
        if (chooseAns === key) {
          // Handle Show when confirmed and user choose correct ans
          if (showCorrectAns.touched && showCorrectAns.key === chooseAns) {
            return (
              <button
                disabled={showCorrectAns.touched}
                onClick={() => {
                  setChooseAns(key);
                }}
                className={`px-4 answer ${
                  !showCorrectAns.touched && "hover:opacity-90"
                } rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]`}
                key={index}
              >
                {key}. {ans}
              </button>
            );
          } else {
            // Handle click select ans
            return (
              <button
                disabled={showCorrectAns.touched}
                style={{
                  background: "blue",
                }}
                onClick={() => {
                  setChooseAns(key);
                }}
                className="px-4 hover:opacity-90 rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]"
                key={index}
              >
                {key}. {ans}
              </button>
            );
          }
        }

        // Handle Show when confirmed and user choose incorrect ans
        if (showCorrectAns.touched && showCorrectAns.key === key) {
          return (
            <button
              disabled={showCorrectAns.touched}
              onClick={() => {
                setChooseAns(key);
              }}
              className="px-4 answer hover:opacity-90 rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]"
              key={index}
            >
              {key}. {ans}
            </button>
          );
        }
        return (
          <button
            disabled={showCorrectAns.touched}
            onClick={() => {
              setChooseAns(key);
            }}
            className="px-4 hover:opacity-90 rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]"
            key={index}
          >
            {key}. {ans}
          </button>
        );
      });
    } else {
      return questions[currentQues]?.answers?.map(({ key, ans }, index) => {
        // Handle click ans
        if (chooseAns === key) {
          // Handle Show when confirmed and user choose correct ans
          if (showCorrectAns.touched && showCorrectAns.key === chooseAns) {
            return (
              <button
                disabled={showCorrectAns.touched}
                onClick={() => {
                  setChooseAns(key);
                }}
                className={`px-4 answer ${
                  !showCorrectAns.touched && "hover:opacity-90"
                } rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]`}
                key={index}
              >
                {key}. {ans}
              </button>
            );
          } else {
            // Handle click select ans
            return (
              <button
                disabled={showCorrectAns.touched}
                style={{
                  background: "blue",
                }}
                onClick={() => {
                  setChooseAns(key);
                }}
                className="px-4 hover:opacity-90 rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]"
                key={index}
              >
                {key}. {ans}
              </button>
            );
          }
        }
        if (showCorrectAns.touched && showCorrectAns.key === key) {
          return (
            <button
              disabled={showCorrectAns.touched}
              onClick={() => {
                setChooseAns(key);
              }}
              className="px-4 answer hover:opacity-90 rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]"
              key={index}
            >
              {key}. {ans}
            </button>
          );
        }
        return (
          <button
            disabled={showCorrectAns.touched}
            onClick={() => {
              setChooseAns(key);
            }}
            className="px-4 hover:opacity-90 rounded-lg bg-gradient-to-b from-[#0e0124] to-[#22074d] py-3 text-white font-semibold border-[1px]"
            key={index}
          >
            {key}. {ans}
          </button>
        );
      });
    }
  };

  // Handle When pass next question
  useEffect(() => {
    // Clear key answer old ques
    setShowCorrectAns({
      touched: false,
      key: questions[currentQues].key,
    });

    // Clear choosed answer
    setChooseAns("");

    // Reset Confirm
    setIsConfirm(false);

    // Reset Timer
    setTimer(30);

    // Clear 50/50
    if (removeHalfAnsOption.touched) {
      dispatch({
        type: CLEAR_REMOVE_HALF_ANSWER_OPTION,
      });
    }

    // Set rank for user
    // if (user.email && user.displayName && user.uid) {
    //   dispatch({
    //     type: SET_RANK_SAGA,
    //     data: {
    //       userId: user.uid,
    //       displayName: user.displayName,
    //       email: user.email,
    //       point: currentQues,
    //       createdAt: new Date().toISOString(),
    //     },
    //   });
    // }
  }, [currentQues]);
  const totalLoseMoney = useMemo(() => {
    if (currentQues <= 4) return 0;
    else if (currentQues <= 9) return boardMoney[4].value;
    return boardMoney[9].value;
  }, [currentQues]);
  return (
    <div className="flex mt-0 sm:mt-2 relative flex-col gap-4 lg:justify-end h-full px-2 pt-12 sm:pt-16 sm:pb-16 sm:px-8 w-[100%] lg:w-[80%]">
      <div className="">
        <Settings
          timer={timer}
          questions={questions}
          setCurrentQues={setCurrentQues}
          currentQues={currentQues}
          currentMoney={currentMoney}
          setCurrentMoney={setCurrentMoney}
          showCorrectAns={showCorrectAns}
          setShowCorrectAns={setShowCorrectAns}
          isConfirm={isConfirm}
          setIsConfirm={setIsConfirm}
          chooseAns={chooseAns}
        />
      </div>
      <div className="flex justify-between">
        <Timer
          timer={timer}
          setTimer={setTimer}
          setIsConfirm={setIsConfirm}
          showCorrectAns={showCorrectAns}
          setShowCorrectAns={setShowCorrectAns}
        />
        <HelpOption
          ansCallOption={questions[currentQues]?.key}
          ansChartOption={questions[currentQues]?.key}
        />
      </div>
      <div className="flex flex-col gap-12">
        <div className="border-2 relative rounded-lg bg-gradient-to-b from-[#100241] to-black border-white py-4">
          <div className="absolute top-[-2rem] left-[4rem] sm:top-[50%] sm:translate-y-[-50%] sm:left-4">
            <svg
              onClick={async () => {
                await setAudio(questions[currentQues].audio);
                document.querySelector(".audio-ques").play();
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"
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
          <h1 className="text-center text-white font-semibold">
            {questions[currentQues].question}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">{renderAns()}</div>
      </div>
      <div className="mx-auto">
        <Score
          prevCurrentMoney={
            currentMoney - boardMoney[currentQues].value > 0
              ? currentMoney - boardMoney[currentQues].value
              : 0
          }
          currentMoney={currentMoney}
          setCurrentMoney={setCurrentMoney}
          totalVictoryMoney={currentMoney + boardMoney[currentQues].value}
          totalLoseMoney={totalLoseMoney}
        />
      </div>
      {audio && <audio src={audio} className="audio-ques" />}
    </div>
  );
}

export default memo(Question);
