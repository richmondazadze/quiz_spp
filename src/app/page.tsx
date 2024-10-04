"use client";

import React from "react";
import { motion } from "framer-motion";
import useQuiz from "./store";
import Button from "@/components/Button";
import DropOptions from "@/components/DropOptions";
// Add Caveat font import
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export default function Home() {
  const { config, addNumberOfQuestions } = useQuiz();

  const handleNumberOfQuestionsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 5 && value <= 50) {
      addNumberOfQuestions(value);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center rounded-lg items-center min-h-screen bg-gradient-to-b from-blue-100 to-white py-6 px-4 sm:py-10 sm:px-6"
    >
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 sm:mb-12 text-center"
      >
        <div className={`${caveat.className}`}>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
            Welcome to
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gray-900 leading-none mt-2">
            Richverse Trivia Quiz
          </span>
        </div>
      </motion.h1>
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 sm:p-8 my-6 sm:my-10 rounded-lg shadow-xl w-full max-w-2xl bg-white"
      >
        <div className="mb-6">
          <label
            htmlFor="numberOfQuestions"
            className="block mb-2 text-2sm font-medium font-bold text-gray-900"
          >
            Number of Questions
          </label>
          <input
            type="number"
            id="numberOfQuestions"
            value={config.numberOfQuestions}
            onChange={handleNumberOfQuestionsChange}
            min={5}
            max={50}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-300 hover:border-blue-300"
            required
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full space-y-4 sm:space-y-6">
          <DropOptions />
          <Button />
        </div>
      </motion.section>
    </motion.section>
  );
}
