import React from "react";
import { useSelector } from "react-redux";
import { formateDate } from "../utils/data";

function Rank({ ranks }) {
  const { user } = useSelector((state) => state.user);
  console.log(formateDate(ranks[0]?.createdAt));
  return (
    <table className="table-auto mx-auto rounded-none glassmorphism w-[1200px] text-white">
      <thead>
        <tr>
          <th className="py-3 font-semibold text-xl">Hạng</th>
          <th className="py-3 font-semibold text-xl">Tên người chơi</th>
          <th className="py-3 font-semibold text-xl">Email</th>
          <th className="py-3 font-semibold text-xl">Số câu đúng</th>
          <th className="py-3 font-semibold text-xl">Ngày chơi</th>
        </tr>
      </thead>
      <tbody className="border-collapse">
        {ranks?.map(
          ({ point, email, displayName, createdAt, userId }, index) => {
            let bgColor = "";
            let icon = "";
            if (user.uid === userId) {
              bgColor = "#312e81";
            } else if (index + 1 === 1) {
              bgColor = "#22c55e";
              icon = "👑";
            } else if (index + 1 === 2) {
              bgColor = "#0284c7";
              icon = "🔥";
            } else if (index + 1 === 3) {
              bgColor = "#6d28d9";
              icon = "🌺";
            }

            return (
              <tr
                key={index}
                style={{
                  background: bgColor,
                }}
              >
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">
                  {icon} {displayName} {icon}
                </td>
                <td className="text-center py-3">{email}</td>
                <td className="text-center py-3">{point}</td>
                <td className="text-center py-3">
                  {formateDate(createdAt).day +
                    "/" +
                    formateDate(createdAt).month +
                    "/" +
                    formateDate(createdAt).year}
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

export default Rank;
