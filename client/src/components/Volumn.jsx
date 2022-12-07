import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TURN_OFF_VOLUMN, TURN_ON_VOLUMN } from "../redux/types";

function Volumn({ audio }) {
  const { isOpenVolumn } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const handlePlayAudio = () => {
    document.querySelector(".audio-app").play();
  };

  return (
    <>
      <div className="fixed w-[20px] h-[20px] top-[1rem] left-[1rem] hover:opacity-60 cursor-pointer">
        {isOpenVolumn ? (
          <VolumeUpIcon
            onClick={() => {
              document.querySelector(".audio-app").pause();
              dispatch({
                type: TURN_OFF_VOLUMN,
              });
            }}
            className="bg-blue-700 muted-volumn rounded-md  text-white"
          />
        ) : (
          <VolumeMuteIcon
            onClick={() => {
              handlePlayAudio();
              dispatch({
                type: TURN_ON_VOLUMN,
              });
            }}
            className="bg-blue-700 rounded-md animate-bounce text-white "
          />
        )}
      </div>
      <audio src={audio} loop className="audio-app"></audio>
    </>
  );
}

export default Volumn;
