import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import Rank from "../../components/Rank";
import { GET_ALL_RANK_USER } from "../../redux/types";

function RankPage(props) {
  const dispatch = useDispatch();
  const { ranks } = useSelector((state) => state.ranks);
  useEffect(() => {
    dispatch({
      type: GET_ALL_RANK_USER,
    });
  }, [dispatch]);
  return (
    <div className="bg-game p-4 bg-no-repeat bg-cover w-full h-screen">
      <h1 className="text-center capitalize text-white text-2xl font-bold">
        👑 Bảng xếp hạng 👑
      </h1>
      <div className="mt-4 h-[80%] w-[100%] overflow-auto px-4">
        <Rank ranks={ranks} />
      </div>

      <div className="flex items-center gap-2 justify-center py-4">
        <button
          onClick={() => {
            dispatch({
              type: GET_ALL_RANK_USER,
            });
          }}
          className="hover:opacity-90 inline-flex items-center py-2 px-4  text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Xem thêm
        </button>
        <Link to="/">
          <button className="hover:opacity-90 inline-flex items-center py-2 px-4  text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Trang Chủ
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RankPage;
