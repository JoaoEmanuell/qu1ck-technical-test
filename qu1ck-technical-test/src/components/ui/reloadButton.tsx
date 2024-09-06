import { sleep } from "@/utils/sleep";
import { LucideProps, RefreshCw } from "lucide-react";
import { useState } from "react";

interface reloadButtonProps extends LucideProps {}

export const ReloadButton = (props: reloadButtonProps) => {
  const [spin, setSpin] = useState<"animate-spin" | "">("");
  const propsCopy = props;

  const animate = async () => {
    setSpin("animate-spin");
    await sleep(1000); // one second
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
