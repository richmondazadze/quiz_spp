"use client";

import React from "react";
import { motion } from "framer-motion";
import useQuiz from "@/app/store";

const Button = () => {
  const addStatus = useQuiz((state) => state.addStatus);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => addStatus("start")}
      type="button"
      className="w-full md:w-2/3 py-3 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      Start Quiz Now
    </motion.button>
  );
};

export default Button;
