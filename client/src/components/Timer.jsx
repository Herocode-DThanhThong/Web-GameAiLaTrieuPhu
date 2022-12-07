import React, { useEffect } from "react";

function Timer({
  currentQues,
  setIsConfirm,
  showCorrectAns,
  setShowCorrectAns,
  timer,
  setTimer,
}) {
  useEffect(() => {
    let interVal;
    if (timer === 0) {
      setIsConfirm(true);
      setShowCorrectAns({
        ...showCorrectAns,
        touched: true,
      });
    }
    if (timer > 0) {
      interVal = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interVal);
  }, [currentQues, timer]);
  return (
    <button className="rounded-full w-[55px] h-[55px] overflow-hidden border-4 border-white">
      <span className="p-2 w-full h-full text-xl block bg-blueBold text-white font-bold">
        {timer}
      </span>
    </button>
  );
}

export default Timer;
