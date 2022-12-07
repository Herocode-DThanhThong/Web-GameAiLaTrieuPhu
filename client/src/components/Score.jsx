import React from "react";
import { memo } from "react";
import CountUp from "react-countup";
function Score({
  currentMoney,
  totalVictoryMoney,
  totalLoseMoney,
  prevCurrentMoney,
}) {
  return (
    <>
      <div className="rounded-md overflow-hidden">
        <span className="text-center p-2 rounded-md w-full h-full mt-2 border-2 text-sm  block bg-blueBold text-white font-bold">
          Số tiền hiện tại bạn đang có:{" "}
          <span className="font-semibold text-red-500 ">
            <CountUp start={prevCurrentMoney} end={currentMoney} /> $
          </span>
        </span>
        <span className="text-center p-2 rounded-md w-full h-full mt-2 border-2 text-sm  block bg-blueBold text-white font-bold">
          Số tiền bạn nhận được nếu vượt qua:{" "}
          <span className="font-semibold text-red-500 ">
            <CountUp
              start={currentMoney}
              end={totalVictoryMoney}
              duration={2.25}
            />{" "}
            $
          </span>
        </span>
        <span className="text-center p-2 rounded-md w-full h-full mt-2 border-2 text-sm  block bg-blueBold text-white font-bold">
          Số tiền bạn nhận được nếu thua hoặc dừng cuộc chơi:{" "}
          <span className="font-semibold text-red-500">
            <CountUp
              start={currentMoney}
              end={totalLoseMoney}
              duration={2.25}
            />{" "}
            $
          </span>
        </span>
      </div>
    </>
  );
}

export default memo(Score);
