import React from "react";
import Link from "next/link";
import { links } from "@/lib/constants";
import { Button } from "./ui/button";

const ChatEmptyState = ({
  setInput,
  limitReached,
}: {
  setInput: (input: string) => void;
  limitReached: boolean;
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
      <div className="text-2xl font-bold text-center">
        Ask anything about BeastGames
      </div>
      <p className="text-sm text-gray-500 text-center">
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
            className="text-xs md:text-sm text-gray-500 font-mono text-wrap xl:text-nowrap"
            onClick={() => setInput(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>

      {limitReached && (
        <div className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-4">
          Note: If you are getting rate limit exceeded error, please try again
          in 24 hours.
        </div>
      )}
    </div>
  );
};

export default ChatEmptyState;
