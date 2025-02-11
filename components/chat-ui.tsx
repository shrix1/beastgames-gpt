"use client";

import React from "react";
import ChatInput from "./chat-input";
import { Markdown } from "./markdown";
import { ScrollArea } from "./ui/scroll-area";
import { useChat } from "ai/react";
import { TextShimmer } from "./ui/text-shimmer";
import ChatEmptyState from "./chat-empty-state";
import { Vote } from "./app-sidebar/main-sidebar";
import { finalSix } from "@/lib/constants";

const ChatUI = ({ votes }: { votes: Vote[] }) => {
  const finalSixWithVotes = finalSix.map((person) => ({
    ...person,
    voteCount: votes.filter((vote) => vote.person_id.toString() === person.id)
      .length,
  }));

  console.log(finalSixWithVotes);
  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    body: {
      votes: finalSixWithVotes,
    },
  });

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)] relative container lg:px-12 xl:px-20 mx-auto">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <ChatEmptyState setInput={setInput} />
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : message.role === "assistant"
                    ? "bg-gray-100 text-black"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {message.role === "user" ? (
                  message.content
                ) : (
                  <Markdown>{message.content}</Markdown>
                )}
              </span>
            </div>
          ))
        )}
        {isLoading && (
          <TextShimmer className="text-sm bg-gray-100">
            Cooking up a data
          </TextShimmer>
        )}
      </ScrollArea>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </main>
  );
};

export default ChatUI;
