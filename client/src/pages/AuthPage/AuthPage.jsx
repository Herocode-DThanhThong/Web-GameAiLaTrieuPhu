import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Volumn from "../../components/Volumn";
import startGame from "../../assets/audio/startGame.mp3";
import { useDispatch } from "react-redux";
import { TURN_OFF_VOLUMN } from "../../redux/types";
function AuthPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({
        type: TURN_OFF_VOLUMN,
      });
    };
  }, []);
  return (
    <div className="bg-game bg-no-repeat bg-cover relative w-full h-screen flex justify-center flex-col gap-2 px-2">
      <div className="flex justify-center">
        <img
          src={Logo}
          className="w-[80px] h-[80px] rounded-full shadow-lg shadow-indigo-500/50"
          alt={"Logo"}
          loading="lazy"
        />
      </div>
      <h1 className="text-center text--glitch font-bold uppercase text-[2em] sm:text-[3em] tracking-wider drop-shadow-md">
        Ai là triệu phú?
      </h1>
      <Outlet />
      <Volumn audio={startGame} />
    </div>
  );
}

export default AuthPage;
