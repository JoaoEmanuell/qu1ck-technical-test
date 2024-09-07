/**
 * User message component
 * Construct a div with user message
 */

interface userMessageProps {
  text: string;
}

export const UserMessage = (props: userMessageProps) => {
  return (
    <div className="flex justify-end">
      <div className="rounded-lg bg-white shadow-md px-4 py-3 max-w-[70%] animate-right-to-left">
        <p>{props.text}</p>
      </div>
    </div>
  );
};
