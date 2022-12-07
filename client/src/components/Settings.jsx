import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";
import correctSound from "../assets/audio/correct.mp3";
import wrongSound from "../assets/audio/wrong.mp3";
import { boardMoney } from "../utils/data";
import victorySound from "../assets/audio/startGame.mp3";
import { SET_RANK_SAGA } from "../redux/types";

function Settings({
  setCurrentQues,
  isConfirm,
  setIsConfirm,
  showCorrectAns,
  chooseAns,
  setShowCorrectAns,
  currentMoney,
  setCurrentMoney,
  currentQues,
  questions,
  timer,
}) {
  const dispatch = useDispatch();
  const { isOpenVolumn } = useSelector((state) => state.global);
  const [playCorrectSound] = useSound(correctSound);
  const [playWrongSound] = useSound(wrongSound);
  const [playVictorySound] = useSound(victorySound);
  const { user } = useSelector((state) => state.user);
  // Handle When timer end
  useEffect(() => {
    let timeOut = "";
    // Handle when user doesn't choose answer
    if (isConfirm && !chooseAns) {
      if (isOpenVolumn) {
        playWrongSound();
      }
      toast("Bạn đã thua vì chưa chọn đáp án 😢");

      return;
    }

    if (
      chooseAns &&
      timer !== 0 &&
      isConfirm &&
      chooseAns === showCorrectAns.key
    ) {
      document.querySelector(".continue-btn").click();
    }

    // Handle When user choose answer and timer ended
    if (chooseAns && timer === 0) {
      if (chooseAns === showCorrectAns.key) {
        dispatch({
          type: SET_RANK_SAGA,
          data: {
            userId: user.uid,
            displayName: user.displayName,
            email: user.email,
            point: currentQues + 1,
            createdAt: new Date().toISOString(),
          },
        });
        // End questions and victory and user not click button confirm
        if (currentQues === questions.length - 1) {
          if (isOpenVolumn) {
            playVictorySound();
          }
        } else {
          // Doesn't end questions
          toast("Chúc mừng bạn đã vượt qua 🎉🎉");
          if (isOpenVolumn) {
            playCorrectSound();
          }
          document.querySelector(".continue-btn").click();
        }
      } else {
        if (isOpenVolumn) {
          playWrongSound();
        }
        toast("Bạn đã trả lời sai 😭😭");
        timeOut = setTimeout(() => {
          if (window.confirm("Chơi lại 🏹🏹")) {
            window.location.reload();
          }
        }, 2000);
      }
    }
    return () => {
      if (timeOut) clearTimeout(timeOut);
    };
  }, [isConfirm]);

  return (
    <div>
      <button
        onClick={() => {
          if (currentQues === questions.length - 1) {
            // window.location.reload();
          } else {
            setCurrentMoney(currentMoney + boardMoney[currentQues].value);
            setCurrentQues((prevState) => prevState + 1);
          }
        }}
        disabled={
          !isConfirm ||
          !showCorrectAns.touched ||
          showCorrectAns.key !== chooseAns
        }
        className={`continue-btn hidden mr-2 ${
          isConfirm && "cursor-pointer hover:opacity-90"
        }  rounded-md overflow-hidden border-2 border-white`}
      >
        <span
          style={{
            background:
              (!isConfirm ||
                !showCorrectAns.touched ||
                showCorrectAns.key !== chooseAns) &&
              "#9ca3af",
          }}
          className={`p-2 w-full h-full text-sm capitalize block bg-blueBold text-white font-bold`}
        >
          Tiếp tục
        </span>
      </button>
      <button
        onClick={() => {
          if (window.confirm("Bạn chắc chắn muốn dừng cuộc chơi tại đây?")) {
            window.location.reload();
          }
        }}
        className="rounded-md mr-2 cursor-pointer hover:opacity-90 overflow-hidden border-2 border-white"
      >
        <span className="p-2 w-full h-full text-sm capitalize block bg-red-600 text-white font-bold">
          Dừng cuộc chơi
        </span>
      </button>
      <button
        onClick={() => {
          if (chooseAns) {
            setShowCorrectAns({
              ...showCorrectAns,
              touched: true,
            });
            if (chooseAns === showCorrectAns.key) {
              dispatch({
                type: SET_RANK_SAGA,
                data: {
                  userId: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  point: currentQues + 1,
                  createdAt: new Date().toISOString(),
                },
              });
              // End questions and victory
              if (currentQues === questions.length - 1) {
                if (isOpenVolumn) {
                  playVictorySound();
                }
                // if (window.confirm("👑 Chúc mừng bạn đã chiến thắng 👑")) {
                //   window.location.reload();
                // }
              }

              // Doesn't end questions
              setIsConfirm(true);
              toast("Chúc mừng bạn đã vượt qua 🎉🎉");

              if (isOpenVolumn) {
                playCorrectSound();
              }
            } else {
              playWrongSound();
              toast("Bạn đã trả lời sai 😭😭");
              setTimeout(() => {
                if (window.confirm("Chơi lại 🏹🏹")) {
                  window.location.reload();
                }
              }, 2000);
            }
          } else {
            if (
              window.confirm("Bạn đã thua vì chưa chọn đáp án 😢😢. Chơi lại")
            ) {
              window.location.reload();
            }
          }
        }}
        className="rounded-md cursor-pointer hover:opacity-90 animate-bounce overflow-hidden border-2 border-white"
      >
        <span className="p-2 w-full h-full text-sm capitalize block bg-green-500  text-white font-bold">
          chốt
        </span>
      </button>
    </div>
  );
}

export default Settings;
