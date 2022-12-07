import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import _ from "lodash";

function ProtectedRouteGame(props) {
  const { user } = useSelector((state) => state.user);
  return _.isEmpty(user) && user !== null ? (
    <div className="bg-blueBold relative bg-no-repeat bg-cover w-full h-screen flex flex-col lg:flex-row gap-4">
      <Loading />
    </div>
  ) : user === null ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
}

export default ProtectedRouteGame;
