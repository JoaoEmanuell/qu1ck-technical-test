import { LucideProps, RefreshCw } from "lucide-react";
import { useState } from "react";

interface reloadButtonProps extends LucideProps {}

export const ReloadButton = (props: reloadButtonProps) => {
  const [spin, setSpin] = useState<"animate-spin" | "">("");
  const propsCopy = props;

  const animate = async () => {
    setSpin("animate-spin");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second
    setSpin("");
  };

  const onClickHandler = (mouse: any) => {
    animate();
    propsCopy.onClick(mouse);
  };

  const customClassName = `${propsCopy.className} ${spin}`;

  return (
    <RefreshCw
      {...props}
      onClick={onClickHandler}
      className={customClassName}
    />
  );
};
