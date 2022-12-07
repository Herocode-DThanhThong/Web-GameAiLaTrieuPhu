export const questions = [
  {
    id: 1,
    audioQuestion: "ques_1",
    question: "Bạn tên gì?",
    key: "A",
    answers: [
      { key: "A", ans: "KaitoKid" },
      { key: "B", ans: "Conan" },
      { key: "C", ans: "Sakura" },
      { key: "D", ans: "Other" },
    ],
  },
  {
    id: 2,
    audioQuestion: "ques_2",
    question: "Kênh lập trình nào của Việt Nam nhiều subscribe nhất hiện nay?",
    key: "A",
    answers: [
      { key: "A", ans: "F8" },
      { key: "B", ans: "Nodemy" },
      { key: "C", ans: "Evondev" },
      { key: "D", ans: "Henry web dev" },
    ],
  },
];

export const boardMoney = [
  { id: 1, amount: "$ 100", value: 100 },
  { id: 2, amount: "$ 200", value: 200 },
  { id: 3, amount: "$ 300", value: 300 },
  { id: 4, amount: "$ 500", value: 500 },
  { id: 5, amount: "$ 1.000", value: 1000 },
  { id: 6, amount: "$ 2.000", value: 2000 },
  { id: 7, amount: "$ 4.000", value: 4000 },
  { id: 8, amount: "$ 8.000", value: 8000 },
  { id: 9, amount: "$ 16.000", value: 16000 },
  { id: 10, amount: "$ 32.000", value: 32000 },
  { id: 11, amount: "$ 64.000", value: 64000 },
  { id: 12, amount: "$ 125.000", value: 125000 },
];

// Chart
export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 20,
        min: 0,
        max: 500,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Đồ thị thể hiện bình chọn của khán giã",
    },
  },
};

export const formateDate = (date) => {
  const dateFormate = new Date(date);
  let day = dateFormate.getDate();
  let month = dateFormate.getMonth() + 1;
  let year = dateFormate.getFullYear();

  return {
    day,
    month,
    year,
  };
};
