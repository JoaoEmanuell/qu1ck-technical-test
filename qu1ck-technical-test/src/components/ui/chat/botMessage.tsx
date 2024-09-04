interface botMessageProps {
  text: string;
}

export const BotMessage = (props: botMessageProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-[#6c5ce7] text-white px-4 py-3 max-w-[70%]">
        <p>{props.text}</p>
      </div>
    </div>
  );
};
