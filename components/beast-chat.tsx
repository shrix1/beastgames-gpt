"use client";

import React, { useState } from "react";
import ChatInput from "./chat-input";
import { type Message } from "ai";

const BeastChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)] relative">
      <div className="h-full">
        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </main>
  );
};

export default BeastChat;
