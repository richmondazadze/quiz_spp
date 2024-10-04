"use client";

import useQuiz from "@/app/store";
import { ReactNode } from "react";

const QuizStateWrapper = ({ children, quiz }: { children: ReactNode, quiz: ReactNode }) => {
  const config = useQuiz((state) => state.config);
  
  console.log("QuizStateWrapper rendered, status:", config.status);
  console.log("quiz prop:", quiz);

  if (quiz === undefined) {
    console.warn("Quiz prop is undefined. Rendering children instead.");
    return <>{children}</>;
  }

  return (
    <>
      {config.status === "start" ? quiz : children}
    </>
  );
};

export default QuizStateWrapper;