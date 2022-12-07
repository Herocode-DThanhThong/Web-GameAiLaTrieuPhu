import React, { useEffect } from "react";
import { boardMoney } from "../utils/data";

function BoardMoney({ currentQues }) {
  useEffect(() => {
    if (currentQues > 0) {
      document.querySelector(".board-money").scrollTo({
        top: 25,
        behavior: "smooth",
      });
    }
  }, [currentQues]);
  return (
    <>
      <div className="board-money bg-blueBold py-2 h-full overflow-auto lg:relative px-2 w-[100%] lg:w-[20%] lg:flex lg:justify-center  lg:flex-col lg:h-full gap-2">
        <h1 className="text-white text-xl text-center mb-2">Bảng điện tử</h1>
        {boardMoney.map(({ amount, id }, index) => (
          <p
            style={{
              backgroundImage:
                currentQues === index &&
                "linear-gradient(to right, #a855f7 , #ec4899)",
            }}
            className={`flex gap-16 items-center rounded-md px-2 ${
              id % 5 === 0
                ? "bg-gradient-to-r from-[#f7b42c] to-[#fc575e] text-red-600 "
                : "text-gray-300"
            }`}
            key={index}
          >
            <span className="font-thin text-base lblock w-1">{id}</span>
            <span className="font-semibold text-base ">{amount}</span>
          </p>
        ))}
      </div>
    </>
  );
}

export default BoardMoney;
