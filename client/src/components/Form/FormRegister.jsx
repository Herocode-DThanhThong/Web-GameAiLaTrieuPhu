import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER_SAGA } from "../../redux/types";

function FormRegister(props) {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    // Simple Validate
    if (!formValue.username || !formValue.email || !formValue.password)
      return alert("Vui lòng nhập đầy đủ thông tin");

    // Check email
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!formValue.email.match(regexEmail))
      return alert("Vui lòng nhập đúng định dạng email");

    // Submit values
    dispatch({
      type: REGISTER_USER_SAGA,
      data: formValue,
    });
  };
  return (
    <div className="flex mt-4">
      <div className="mx-auto md:w-[50%] lg:w-[40%] glassmorphism rounded-md p-4 shadow-lg shadow-indigo-500/50">
        <h1 className="text-center text-blueBold capitalize text-xl sm:text-2xl font-semibold">
          Đăng ký
        </h1>
        <div className="">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="w-full outline-none border border-gray-200 rounded-md py-2 px-4 mt-4 focus:border-blue-900"
            placeholder="Nhập tên người chơi"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full outline-none border border-gray-200 rounded-md py-2 px-4 mt-4 focus:border-blue-900"
            placeholder="Nhập Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full outline-none border border-gray-200 rounded-md py-2 px-4 mt-4 focus:border-blue-900"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div
          onClick={handleSubmit}
          className="mt-4 p-2 bg-blueBold hover:opacity-90 text-white rounded-md capitalize"
        >
          <p className="text-center">Đăng ký</p>
        </div>

        <Link
          to={"/login"}
          className="block text-sm mt-3 ml-1 text-blueBold hover:underline"
        >
          <span className="font-semibold">Đăng nhập ngay</span>
        </Link>
      </div>
    </div>
  );
}

export default FormRegister;
