import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useQuiz from "@/app/store";
import { ChevronDown } from "lucide-react";

type CategoryType = {
  id: number;
  name: string;
};

const Type = ["boolean", "multiple"];
const Level = ["easy", "medium", "hard"];

const DropOptions = () => {
  const config = useQuiz((state) => state.config);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const addCategory = useQuiz((state) => state.addCategory);
  const addLevel = useQuiz((state) => state.addLevel);
  const addType = useQuiz((state) => state.addType);

  useEffect(() => {
    async function fetchCategory() {
      const { trivia_categories } = await (
        await fetch("https://opentdb.com/api_category.php")
      ).json();
      setCategory([...trivia_categories]);
    }

    fetchCategory();
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row justify-evenly items-center py-5 px-4">
      {/* First Dropdown (Category) with Scrollable Content */}
      <div className="w-full md:w-1/3 my-2 md:my-0 mx-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-center items-center w-full shadow-lg hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-base">
            {config.category.name ? config.category.name : "CATEGORY"}{" "}
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-48 overflow-y-auto">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((category) => {
              return (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => addCategory(category.id, category.name)}
                >
                  {category.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Second Dropdown (Level) */}
      <div className="w-full md:w-1/3 my-2 md:my-0 mx-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-center items-center w-full shadow-lg hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-base">
            {config.level ? config.level : "LEVEL"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Label</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Level.map((e) => {
              return (
                <DropdownMenuItem key={e} onClick={() => addLevel(e)}>
                  {e}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Third Dropdown (Type) */}
      <div className="w-full md:w-1/3 my-2 md:my-0 mx-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-center items-center w-full shadow-lg hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-base">
            {config.type ? config.type : "TYPE"}
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Type.map((e) => {
              return (
                <DropdownMenuItem key={e} onClick={() => addType(e)}>
                  {e}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default DropOptions;
