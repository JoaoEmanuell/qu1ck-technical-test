import { ChatPageUi, messagesType } from "@/components/ui/chatPageUi";

export default function ChatPage() {
  const messages = [
    {
      type: "bot",
      message: "Seja bem vindo a pizzaria, em que posso ajudar?",
    },
  ];
  return <ChatPageUi messages={messages as messagesType} />;
}
