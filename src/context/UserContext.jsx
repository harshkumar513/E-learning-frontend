import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const loginUser = async (email, password, navigate, fetchMyCourse) => {
    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);

      localStorage.setItem("token", data.token);

      setUser(data.user);
      setIsAuth(true);

      navigate("/");

      if (fetchMyCourse) {
        fetchMyCourse();
      }
    } catch (error) {
      setIsAuth(false);
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const registerUser = async (name, email, password, navigate) => {
    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);

      localStorage.setItem("activationToken", data.activationToken);

      navigate("/verify");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const verifyOtp = async (otp, navigate) => {
    setBtnLoading(true);

    const activationToken = localStorage.getItem("activationToken");

    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);

      localStorage.removeItem("activationToken");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification Failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token,
        },
      });

      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");

      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        btnLoading,
        loading,
        loginUser,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster position="top-center" />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);