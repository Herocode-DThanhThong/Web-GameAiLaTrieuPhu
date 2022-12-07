import React from "react";

function Info({ user }) {
  return (
    <div className="absolute p-4 rounded-md glassmorphism bottom-[60%] w-fit left-[50%] translate-x-[-50%]">
      <h1>
        <strong className="text-blueBold">Tên người chơi:</strong>{" "}
        <span className="capitalize">{user?.displayName}</span>{" "}
      </h1>
      <h1>
        <strong className="text-blueBold">Email:</strong>{" "}
        <span className="">{user?.email}</span>{" "}
      </h1>
      <h1>
        <strong className="text-blueBold">Hạng:</strong>{" "}
        <span className="">0</span>{" "}
      </h1>
    </div>
  );
}

export default Info;
