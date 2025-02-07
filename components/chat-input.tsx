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
};

const ChatInput = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
}: ChatInputProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-1 pb-2">
      <form
        onSubmit={handleSubmit}
        className="w-[calc(100%-20rem)] px-4 relative"
      >
        <Textarea
          className="min-h-[110px] shadow-md shadow-primary/10 placeholder:font-mono resize-none rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
          autoFocus
          placeholder="Ask anything about BeastGames"
          value={input}
          disabled={isLoading}
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
          disabled={isLoading}
        >
          <SendIcon className="size-4" />
        </Button>
      </form>
      <p className="text-sm text-gray-500">
        <Link href={links.prime} className="underline font-mono">
          Go watch BeastGames on Amazon Prime
        </Link>
      </p>
    </div>
  );
};

export default ChatInput;
