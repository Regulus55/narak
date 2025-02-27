import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// react icons
import { GrSearch } from "react-icons/gr";
import { MainExplain } from "../data/HomeData";
import { useForm } from "react-hook-form";

interface searchStockInput {
  searchInput: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchInput: "",
    },
  });

  const searchInput = watch("searchInput");

  const searchStockHandler = (userInput: searchStockInput) => {
    const { searchInput } = userInput;
    console.log("우와", searchInput);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(searchStockHandler)}
        className="flex h-12 w-full max-w-5xl mt-4 rounded-lg border-2 border-gray-300 bg-white relative "
      >
        <input
          id="stockSymbol"
          type="text"
          {...register("searchInput", {
            required: "주식 이름을 입력하세요",
          })}
          className="w-full p-2 rounded-lg  relative"
        />
        <button
          type="submit"
          className="w-10 h-10 p-1 right-0.5 top-0.5 absolute"
        >
          <GrSearch className="w-full h-full" />
        </button>
        {errors.searchInput && (
          <span className="text-red-500 left-2 top-12 absolute">
            {errors.searchInput.message}
          </span>
        )}
      </form>

      {/*  */}

      <MainExplain />
    </div>
  );
};

export default Home;
