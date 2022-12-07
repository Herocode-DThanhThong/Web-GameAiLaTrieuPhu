import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import playGame from "../../assets/audio/play.mp3";
import { LOGIN_GOOGLE_SAGA, LOGIN_USER_SAGA } from "../../redux/types";
import playSound from "../../assets/audio/play.mp3";
import useSound from "use-sound";
function FormLogin(props) {
  const [play] = useSound(playSound);
  const { isOpenVolumn } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    // Simple Validate
    if (!formValue.email || !formValue.password)
      return alert("Vui lòng nhập đầy đủ thông tin");

    // Check email
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!formValue.email.match(regexEmail))
      return alert("Vui lòng nhập đúng định dạng email");

    // Submit value
    await dispatch({
      type: LOGIN_USER_SAGA,
      data: formValue,
      audio: playGame,
    });

    if (isOpenVolumn) play();
  };

  return (
    <div className="flex mt-4">
      <div className="mx-auto md:w-[50%] lg:w-[40%] glassmorphism rounded-md p-4 shadow-sm shadow-indigo-500/50">
        <h1 className="text-center text-blueBold capitalize text-xl sm:text-2xl font-semibold">
          Đăng nhập
        </h1>
        <div className="">
          <input
            name="email"
            type="text"
            onChange={handleChange}
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-2 px-4 mt-4 focus:border-blue-900"
            placeholder="Nhập Email"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full outline-none border bg-white border-gray-200 rounded-md py-2 px-4 mt-4 focus:border-blue-900"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="flex gap-3 items-center my-2">
          <input
            name="remember"
            id="remember"
            onChange={(e) => {
              setFormValue({
                ...formValue,
                remember: e.target.checked,
              });
            }}
            type="checkbox"
            className="rounded-md outline-none border-none "
          />
          <label htmlFor="remember" className="text-blueBold text-sm">
            Lưu tài khoản
          </label>
        </div>
        <div
          onClick={handleSubmit}
          className="mt-2 p-2 bg-blueBold hover:opacity-90 text-white rounded-md capitalize"
        >
          <p className="text-center">Chơi ngay</p>
        </div>

        <div
          onClick={() => {
            dispatch({
              type: LOGIN_GOOGLE_SAGA,
            });
          }}
          className="mt-4 p-2 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white rounded-md capitalize"
        >
          <p className="text-center capitalize">Đăng nhập bằng google</p>
        </div>

        <Link
          to={"/register"}
          className="block text-sm mt-3 ml-1 text-blueBold hover:underline"
        >
          Bạn chưa có tài khoản?{" "}
          <span className="font-semibold">Đăng kí ngay</span>
        </Link>
      </div>
    </div>
  );
}

export default FormLogin;
