"use client";

import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { links } from "@/lib/constants";
import Link from "next/link";

type ChatInputProps = {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
  isLoading: boolean;
  limitReached: boolean;
};

const ChatInput = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
  limitReached,
}: ChatInputProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-1 pb-2">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[calc(100%-5rem)] xl:w-[calc(100%-8rem)] px-4 relative"
      >
        <Textarea
          className="min-h-[110px] shadow-md shadow-primary/10 placeholder:font-mono resize-none rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
          autoFocus
          placeholder={
            limitReached
              ? "Your Daily Limit is Reached (10/10). Try again in 24 hours. Sorry no money to buy openai api key :("
              : "Ask anything about BeastGames"
          }
          value={input}
          disabled={isLoading || limitReached}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          className="absolute right-6 bottom-2 size-10 rounded-full"
          disabled={isLoading || limitReached}
        >
          <SendIcon className="size-4" />
        </Button>
      </form>
      <p className="text-sm text-gray-500">
        Episodes data is from{" "}
        <Link href={links.wikipedia} className="underline">
          Wikipedia
        </Link>
        . Watch BeastGames on{" "}
        <Link href={links.prime} className="underline">
          Prime Video
        </Link>
        .
      </p>
    </div>
  );
};

export default ChatInput;
