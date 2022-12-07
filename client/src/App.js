import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FormLogin from "./components/Form/FormLogin";
import FormRegister from "./components/Form/FormRegister";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import { auth } from "./firebase/firebase";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import GamePage from "./pages/GamePage/GamePage";
import RankPage from "./pages/RankPage/RankPage";
import ProtectedRouteAdmin from "./protectedRoute/ProtectedRouteAdmin";
import ProtectedRouteAuth from "./protectedRoute/ProtectedRouteAuth";
import ProtectedRouteGame from "./protectedRoute/ProtectedRouteGame";
import { ADD_NAVIGATE, SET_USER } from "./redux/types";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, showModal } = useSelector((state) => state.global);
  useEffect(() => {
    dispatch({
      type: ADD_NAVIGATE,
      navigate,
    });
  }, [navigate, dispatch]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user: ", user);
      dispatch({
        type: SET_USER,
        user,
      });
    });
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route element={<ProtectedRouteAuth />}>
          <Route element={<AuthPage />}>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormRegister />} />
          </Route>
        </Route>
        <Route element={<ProtectedRouteGame />}>
          <Route path="/" element={<GamePage />} />
        </Route>
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<ProtectedRouteGame />}>
          <Route path="/rank" element={<RankPage />} />
        </Route>
      </Routes>

      {loading && <Loading />}
      {showModal && <Modal />}
    </>
  );
}

export default App;
