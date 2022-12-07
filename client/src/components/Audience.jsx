import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_AUDIENCE_ANSWER_OPTION } from "../redux/types";
import { options } from "../utils/data";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Audience({ ansChartOption }) {
  const labels = useMemo(() => {
    return ["A", "B", "C", "D"];
  }, []);
  const data = useMemo(() => {
    return labels.map((item, index) => {
      if (item === ansChartOption) return 50 * labels.length;
      return 50 * index;
    });
  }, [ansChartOption, labels]);

  const dataChart = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          fill: true,
          label: "Lượt bình chọn",
          backgroundColor: "rgb(75, 192, 192)",
          data: data.map((value) => value),
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
  }, [labels, data]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_AUDIENCE_ANSWER_OPTION,
    });
  }, [dispatch]);

  return (
    <>
      <h1 className="text-center mb-2 capitalize font-semibold">
        lượt bình chọn
      </h1>
      <Bar options={options} data={dataChart} />
    </>
  );
}

export default memo(Audience);
