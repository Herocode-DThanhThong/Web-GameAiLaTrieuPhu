import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import waitMus from "../../assets/audio/wait.mp3";
import "../../assets/css/main.css";
import BoardMoney from "../../components/BoardMoney";
import Info from "../../components/Info";
import Question from "../../components/Question";
import Volumn from "../../components/Volumn";
import {
  GET_ALL_QUESTION_SAGA,
  SIGN_OUT_SAGA,
  TURN_OFF_VOLUMN,
} from "../../redux/types";
import { randomQuesFromDB } from "../../utils/func";
import { Link } from "react-router-dom";
// import { questions } from "../../utils/data";

function GamePage(props) {
  const [play, setPlay] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { questions } = useSelector((state) => state.questions);
  const [currentQues, setCurrentQues] = useState(0);
  const dispatch = useDispatch();
  const questionsMix = useMemo(() => {
    return randomQuesFromDB(questions, 12);
  }, [questions]);
  console.log("questionsMix: ", questionsMix);
  useEffect(() => {
    dispatch({
      type: GET_ALL_QUESTION_SAGA,
    });
    return () => {
      dispatch({
        type: TURN_OFF_VOLUMN,
      });
    };
  }, [dispatch]);
  return (
    <div className="bg-game overflow-auto ssm:overflow-hidden relative bg-no-repeat bg-cover w-full h-screen flex flex-col lg:flex-row gap-4">
      {/* Start Game */}
      {!play && (
        <div
          onClick={() => {
            setPlay(true);
          }}
          className="mx-auto capitalize rounded-md h-full flex-col justify-center flex px-4 py-2 text-white cursor-pointer"
        >
          <span className="bg-blueBold px-4 py-2 rounded-md capitalize text-xl animate-pulse">
            Bắt đầu
          </span>
        </div>
      )}

      {!play && <Info user={user} />}
      {!play && (
        <Link to="/rank">
          <button className="absolute capitalize hover:opacity-90 w-fit  rounded-md top-[60%] left-[50%] translate-x-[-50%] bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 ">
            👑 bảng xếp hạng 👑
          </button>
        </Link>
      )}

      {/* Questions */}
      {play && currentQues < questionsMix.length && (
        <Question
          user={user}
          currentQues={currentQues}
          setCurrentQues={setCurrentQues}
          questions={questionsMix}
        />
      )}

      {/* BoardMoney Right */}
      {play && currentQues < questionsMix.length && (
        <BoardMoney currentQues={currentQues} />
      )}

      {/* Sign Out Action */}
      <div
        onClick={() => {
          if (window.confirm("Bạn chắc chắn muốn thoát khỏi game?")) {
            dispatch({
              type: SIGN_OUT_SAGA,
            });
          }
        }}
        className="absolute z-40 left-[4rem] top-[0.8rem]"
      >
        <span className="text-red-500 font-semibold capitalize cursor-pointer hover:opacity-90 hover:underline">
          Đăng xuất
        </span>
      </div>

      {/* Audio For Each Question */}
      <Volumn audio={waitMus} />
    </div>
  );
}

export default GamePage;
