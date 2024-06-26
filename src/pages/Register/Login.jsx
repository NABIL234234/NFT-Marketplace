import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { getUserLogin } from "../../store/actions/asyncAction";
import { useForm } from "react-hook-form";
import Inputs from "../../components/inputs/Inputs";
import { FaKey, FaUser, FaUnlockAlt } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SingUpImg from "../../assets/IMAGE/SECTION/SingUpImg.png";
import User from "../../assets/IMAGE/PLAY.SVG/nav/User.png";
import Password from "../../assets/IMAGE/PLAY.SVG/nav/LockKey.svg";

import "./login.scss";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        getUserLogin({ newUser: data, navigate })
      );

      if (getUserLogin.fulfilled.match(resultAction)) {
        const { id, tokens } = resultAction.payload;

        if (tokens && tokens.access_token) {
          localStorage.setItem("accessToken", tokens.access_token);
          localStorage.setItem("userId", id);
          window.dispatchEvent(new Event("storage"));
          navigate(from, { replace: true });
        } else {
          throw new Error("Токен не найден в ответе сервера");
        }
      } else {
        setLoginError("Неправильное имя пользователя или пароль");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  const handleCloseError = () => {
    setLoginError("");
  };
  
  return (
    <section className="mdd:flex gap-[15px] md:gap-[40px] lg:gap-[60px] xl:gap-[150px] font-mono">
      <div>
        <img src={SingUpImg} alt="SingUpImg" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center p-[15px]"
      >
        <div className="flex flex-col">
          <div className="text-white pt-[20px]">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Войдите в свой аккаунт
            </h3>
            <p className="max-w-[410px] mdd:max-w-[400px] pt-[10px] lgg:pt-[20px]">
              Добро пожаловать! Введите свои данные и начните создавать,
              собирать и продавать NFT.
            </p>
          </div>
          <div className="flex flex-col gap-[25px] md:gap-[25px] pt-[15px] mdd:pt-[20px]">
            <div className="relative">
              <FaUser className="absolute top-[29%] left-[4%] z-10 text-xl" />
              <Inputs
                type="text"
                icons={User}
                placeholder="Имя пользователя"
                {...register("username", {
                  required: "Введите имя пользователя",
                })}
              />
              {errors.username && (
                <span className="error absolute text-red-500 font-sans">{errors.username.message}</span>
              )}
            </div>
            <div className="relative">
              <FaUnlockAlt className="absolute top-[29%] left-[4%] z-10 text-xl" />
              <Inputs
                type={showPassword ? "text" : "password"}
                icons={Password}
                placeholder="Пароль"
                {...register("password", {
                  required: "Введите пароль",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать как минимум 6 символов!",
                  },
                })}
              />
              <div className="absolute top-[-6%] left-[300px]">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    color: "black",
                    position: "absolute",
                    right: 10,
                    top: 10,
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              {errors.password && (
                <span className="error absolute text-red-500 font-sans">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="flex justify-center items-center gap-[10px] w-[150px] h-[40px] rounded-xl bg-purple-500 text-white transition ease-in-out delay-150 hover:bg-white hover:text-black active:bg-purple-400"
            >
              <IoLogIn />
              Логин
            </button>
            <div>
              <NavLink
                to="/register"
                className="flex justify-center items-center gap-[20px] w-[300px] p-[3px] rounded-md bg-purple-500 text-white transition ease-in-out delay-150 hover:bg-white hover:text-black active:bg-purple-400"
              >
                Регистрация
              </NavLink>
            </div>
            <div className="flex justify-center items-center gap-[20px] w-[300px] p-[3px] rounded-md bg-white text-black transition ease-in-out delay-150 hover:bg-purple-500 hover:text-white active:bg-purple-400">
              <FaKey />
              <NavLink to="/confirmAccount">Не помните свой пароль?</NavLink>
            </div>
          </div>
          ;
        </div>
      </form>
      {loginError && (
        <div className="error-message-container">
          <div className="error-message">
            {loginError}
            <button className="close-button" onClick={handleCloseError}>
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
