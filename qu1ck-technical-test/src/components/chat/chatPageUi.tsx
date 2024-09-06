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
import { Button } from "../ui/button";

export type messagesType = {
  type: "user" | "bot";
  message: string;
  awaitResponse?: boolean;
};

interface chatPageUiProps {
  messages: messagesType[];
}

export function ChatPageUi(props: chatPageUiProps) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [messages, setMessages] = useState<messagesType[]>(props.messages);
  const [messageComponent, setMessageComponent] = useState<JSX.Element[]>([]);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(false);

  const sendMessageToApi = async (
    message: string,
    messages: messagesType[]
  ) => {
    constructMessageComponent([
      ...messages,
      {
        type: "bot",
        message: "",
        awaitResponse: true,
      },
    ]);
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        text: message,
      }),
      signal: AbortSignal.timeout(15000), // 15 seconds
    });
    if (response.status === 201) {
      const json = await response.json();
      if (json.status) {
        changeLastMessage({
          type: "bot",
          message: json.message_for_client,
          awaitResponse: false,
        });
      } else {
        changeLastMessage({
          type: "bot",
          message: json.message_for_client
            ? json.message_for_client
            : "Desculpe, infelizmente não foi possível realizar o seu pedido!",
          awaitResponse: false,
        });
      }
    } else {
      changeLastMessage({
        type: "bot",
        message:
          "Desculpe, infelizmente não foi possível realizar o seu pedido!",
        awaitResponse: false,
      });
    }
  };

  const sendMessageAction = async () => {
    const message = inputRef?.current.value.trim();
    if (message === "") return; // not send message if is empty
    inputRef!.current.value = "";

    blockInputs(true); // block inputs

    const messagesCopy = messages;
    messagesCopy.push({
      type: "user",
      message: message,
    });
    constructMessageComponent(messagesCopy);

    await sendMessageToApi(message, messages);

    blockInputs(false);
  };

  const constructMessageComponent = (messages: messagesType[]) => {
    setMessages(messages);
    const messagesComponentToUpdate: JSX.Element[] = [];
    messages.map((message) => {
      messagesComponentToUpdate.push(
        message.type === "bot" ? (
          <BotMessage
            key={message.message}
            text={message.message}
            awaitResponse={message.awaitResponse}
          />
        ) : (
          <UserMessage key={message.message} text={message.message} />
        )
      );
    });
    setMessageComponent(messagesComponentToUpdate);
  };

  const addMessageForMessageComponent = (message: messagesType) => {
    constructMessageComponent([...messages, message]);
  };

  const blockInputs = (status: boolean) => {
    setInputsDisabled(status);
  };

  const changeLastMessage = (message: messagesType) => {
    const messagesComponentCopy = [...messageComponent];
    messagesComponentCopy.pop();
    setMessageComponent(messagesComponentCopy);
    addMessageForMessageComponent(message);
  };

  useEffect(() => {
    constructMessageComponent(messages);
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
          disabled={inputsDisabled}
        />
        <Button
          variant="purple"
          onClick={sendMessageAction}
          disabled={inputsDisabled}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
