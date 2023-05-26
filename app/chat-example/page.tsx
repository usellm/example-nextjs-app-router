"use client";
import React, { useState } from "react";
import useLLM, { OpenAIMessage } from "usellm";

export default function ChatExample() {
  const [history, setHistory] = useState<OpenAIMessage[]>([]);
  const [inputText, setInputText] = useState("");

  const llm = useLLM({ serviceUrl: "/api/llm" });

  async function handleSend() {
    if (!inputText) {
      return;
    }
    const newHistory = [...history, { role: "user", content: inputText }];
    setHistory(newHistory);
    setInputText("");

    llm.chat({
      messages: newHistory,
      stream: true,
      onStream: ({ message }) => setHistory([...newHistory, message]),
    });
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <h1 className="text-lg font-bold mb-4 px-4">
        This is useLLM chat Example
      </h1>
      {history.length > 0 && (
        <div className="max-w-4xl w-full flex-1 overflow-y-auto px-4">
          {history.map((message, idx) => (
            <div key={idx} className="my-4">
              <div className="font-semibold text-gray-800 dark:text-gray-50">
                {message.role.toUpperCase()}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {message.content}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full py-4 flex px-4">
        <input
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter message here"
          value={inputText}
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 border border-white focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-transparent text-white  hover:bg-gray-800 dark:text-white h-10 py-2 px-4 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
