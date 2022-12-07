import React from "react";
import { Puff } from "react-loader-spinner";
function Loading(props) {
  return (
    <div className="fixed h-full w-full z-40 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)]">
      <div className="absolute z-50 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
        <Puff color="#00BFFF" height={80} width={80} />
      </div>
    </div>
  );
}

export default Loading;
