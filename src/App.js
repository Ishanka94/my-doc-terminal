import React from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import NoPageFound from "./pages/NoPageFound";
import AuthContext from "./contexts/AuthContext";
import ProtectedWrapper from "./route-guards/ProtectedWrapper";
import { useEffect, useState } from "react";
import DoctorsDetails from "./pages/doctor-management/DoctorsDetails";
import RegistrantsList from "./pages/certificate-management/RegistrantsList";
import RegisterSessionForm from "./pages/certificate-management/RegisterSessionForm";
import SessionList from "./pages/certificate-management/SessionList";

const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/doctors-details" element={<DoctorsDetails />} />
            <Route path="/registrants-list" element={<RegistrantsList />} />
            <Route path="/training-sessions" element={<SessionList />} />
            <Route path="/register-professional" element={<RegisterSessionForm />} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
