"use client";
/* eslint-disable react/no-unescaped-entities */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MOhVtsWozfO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect, useRef, useState } from "react";
import { BotMessage } from "./botMessage";
import { UserMessage } from "./userMessage";

export type messagesType = { type: "user" | "bot"; message: string }[];

interface chatPageUiProps {
  messages: messagesType;
}

export function ChatPageUi(props: chatPageUiProps) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [messages, setMessages] = useState(props.messages);
  const [messageComponent, setMessageComponent] = useState<
    JSX.Element[] | null
  >(null);

  const sendMessageAction = () => {
    const message = inputRef?.current.value;
    messages.push({
      type: "user",
      message: message,
    });
    setMessages(messages);
    inputRef!.current.value = "";
    constructMessagesComponent(messages);
  };

  const constructMessagesComponent = (messages: messagesType) => {
    setMessageComponent(
      messages.map((message) => {
        if (message.type === "bot") {
          return <BotMessage key={message.message} text={message.message} />;
        }
        return <UserMessage key={message.message} text={message.message} />;
      })
    );
  };

  useEffect(() => {
    constructMessagesComponent(messages);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messageComponent}
      </main>
      <div className="bg-white border-t border-gray-200 p-4 flex items-center">
        <input
          type="text"
          placeholder="Escreva a sua mensagem..."
          className="flex-1 rounded-lg bg-gray-100 border-none focus:ring-0 focus:border-none px-4 py-2 mr-2"
          ref={inputRef}
          onKeyDown={(key) => {
            if (key.code === "Enter" || key.code === "NumpadEnter")
              sendMessageAction();
          }}
        />
        <button
          className="bg-[#6c5ce7] text-white rounded-lg px-4 py-2 hover:bg-[#5a4ec7]"
          onClick={sendMessageAction}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
