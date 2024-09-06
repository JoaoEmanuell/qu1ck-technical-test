interface botMessageProps {
  text: string;
  awaitResponse: boolean;
}

export const BotMessage = (props: botMessageProps) => {
  const skeleton = () => {
    return (
      <div className="animate-left-to-right-2-seconds">
        <div
          role="status"
          className="max-w-sm animate-pulse bg-[#6c5ce7] rounded-lg p-4"
        >
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };
  if (props.awaitResponse) {
    return skeleton();
  }
  return (
    <div className="flex items-start gap-4 animate-left-to-right">
      <div className="rounded-lg bg-[#6c5ce7] text-white px-4 py-3 max-w-[70%]">
        <p>{props.text}</p>
      </div>
    </div>
  );
};
