import React from "react";
import Link from "next/link";
import { links } from "@/lib/constants";
import { Button } from "./ui/button";

const ChatEmptyState = ({
  setInput,
}: {
  setInput: (input: string) => void;
}) => {
  const prompts = [
    "Who is Mr. Beast, Why he conducting this show?",
    "Who are all his friends?",
    "Who are the finalist selected?",
    "Tell me about all the games played in the show",
    "What is the best moment in the show?",
    "Based on Voting, Which contestant is gonna win?",
  ];

  return (
    <div className="h-[calc(100vh-300px)] flex justify-center items-center flex-col gap-2">
      <div className="text-2xl font-bold">Ask anything about BeastGames</div>
      <p className="text-sm text-gray-500">
        If you didn't watch go watch it on{" "}
        <Link
          href={links.prime}
          className="text-blue-500 underline-offset-4 underline"
        >
          Prime Video
        </Link>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
        {prompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            className="text-sm text-gray-500 font-mono"
            onClick={() => setInput(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatEmptyState;
