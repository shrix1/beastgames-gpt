"use client";

import React, { useState } from "react";
import ChatInput from "./chat-input";
import { type Message } from "ai";

const BeastChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((messages) => [
      ...messages,
      { role: "user", content: input, id: crypto.randomUUID() },
      { role: "system", content: "Thinking...", id: crypto.randomUUID() },
    ]);

    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: messages, prompt: input }),
      });
      const data = await response.text();
      setMessages((prevMessages) => {
        const messagesWithoutThinking = prevMessages.slice(0, -1);
        return [
          ...messagesWithoutThinking,
          { role: "assistant", content: data, id: crypto.randomUUID() },
        ];
      });
    } catch (error) {
      console.error("Error completing request:", error);
      setMessages((prevMessages) => {
        const messagesWithoutThinking = prevMessages.slice(0, -1);
        return [
          ...messagesWithoutThinking,
          { role: "assistant", content: "Error", id: crypto.randomUUID() },
        ];
      });
    } finally {
      setIsLoading(false);
      setInput("");
    }
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
