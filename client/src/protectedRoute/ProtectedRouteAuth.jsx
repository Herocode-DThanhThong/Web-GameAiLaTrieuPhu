import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import _ from "lodash";
import Loading from "../components/Loading";
function ProtectedRouteAuth(props) {
  const { user } = useSelector((state) => state.user);
  return _.isEmpty(user) && user !== null ? (
    <div className="bg-blueBold relative bg-no-repeat bg-cover w-full h-screen flex flex-col lg:flex-row gap-4">
      <Loading />
    </div>
  ) : user === null ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRouteAuth;
