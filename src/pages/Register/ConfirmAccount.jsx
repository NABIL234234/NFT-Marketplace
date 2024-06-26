import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail, setEmail } from "../../store/slices/confirnCode";

import market from "../../../src/assets/IMAGE/PLAY.SVG/nav/Storefront.svg";

export default function ConfirmAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { email } = useSelector((state) => state.confirmCode);

  console.log(email);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(setEmail(data.email)); // Сохраняем email в Redux
    dispatch(sendEmail({email: data.email, navigate})); // Отправляем email
  };

  return (
    <div className="mt-[70px] mb-[100px]">
      <div className="max-w-6xl px-5 mx-auto font-mono">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rdd:items-center gap-[30px]"
        >
          <div className="flex items-center gap-4">
            <img src={market} alt="market" />
            <NavLink to="/" className="nav_link text-2xl rdd:text-3xl">
              NFT Marketplace
            </NavLink>
          </div>
          <div className="flex flex-col justify-center items-center gap-[15px] max-w-[400px] text-white">
            <h2 className="text-3xl mb:text-4xl font-bold">Востановление пароля</h2>
            <p className="max-w-[360px]">
              Отправьте свою почту и  <span className="text-purple-500">Nft Marketplace</span> отправит вам код подтверждения!
            </p>
          </div>
          <div className="mt-[10px]">
            <input
              type="email"
              placeholder="Почта(email)"
              name="email"
              {...register("email", { required: "Введи свой @email" })}
              className="flex items-center w-[280px] rdd:w-[300px] mb:w-[400px] p-[5px] rounded-sm text-white bg-zinc-800 outline-none border-[1px]"
            />
            {errors.email && (
              <span className="error absolute text-red-500 font-sans">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-[20px]">
            <button
              type="submit"
              className="flex justify-center items-center w-[280px] rdd:w/[300px] mb:w/[400px] h-[40px] text-white bg-purple-500 rounded-sm transition ease-in-out hover:bg-violet-600 active:bg-violet-700"
            >
              Далее
            </button>
            <NavLink
              to="/login"
              className="flex justify-center items-center text-purple-500 rounded-sm hover:text-violet-600"
            >
              назад
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
