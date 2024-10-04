"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useQuiz from "@/app/store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@lottiefiles/react-lottie-player";

// Add Caveat font import
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export default function QuizPage() {
  const { config, addScore, resetQuiz } = useQuiz();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${config.numberOfQuestions}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
        );
        const { results } = await response.json();

        const shuffledResults = results.map((q: any) => ({
          ...q,
          answers: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
        }));

        setQuestions(shuffledResults);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getQuestions();
  }, [config.numberOfQuestions, config.category.id, config.level, config.type]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      setQuizEnded(true);
    }
  };

  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      addScore();
    }
  };

  const handleNewQuiz = () => {
    resetQuiz();
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setIsLoading(true);
    setQuizEnded(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Skeleton className="w-3/4 h-12 mb-4" />
        <Skeleton className="w-2/3 h-8 mb-8" />
        <div className="grid grid-cols-2 gap-4 w-3/4">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </div>
    );
  }

  if (quizEnded || !questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <span
          className={`text-6xl font-extrabold text-blue-600 ${caveat.className}`}
        >
          Quiz Completed
        </span>
        <Player
          src="https://lottie.host/513cb85f-f2b3-4980-b9b9-7e563f121e91/eagP4bPTs8.json"
          className="player"
          loop
          autoplay
          style={{ height: "300px", width: "300px" }}
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Your Score: {config.score}
        </h1>
        <button
          onClick={handleNewQuiz}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Take Another Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h1>
        <p className="text-xl text-blue-600 font-semibold mb-6">
          Score: {config.score}
        </p>
        <p
          className="text-2xl font-medium text-gray-700 mb-8"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        ></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQuestion.answers.map((answer: string, index: number) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => checkAnswer(answer)}
              className={cn(
                "py-3 px-4 text-lg font-medium rounded-lg shadow-md transition duration-300",
                {
                  "bg-white text-gray-800 hover:bg-gray-100": !selectedAnswer,
                  "bg-red-500 text-white":
                    selectedAnswer && answer !== currentQuestion.correct_answer,
                  "bg-green-500 text-white":
                    selectedAnswer && answer === currentQuestion.correct_answer,
                }
              )}
              disabled={!!selectedAnswer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {selectedAnswer && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleNext}
              className="w-full py-3 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              {isLastQuestion ? "End Quiz" : "Next Question"}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
