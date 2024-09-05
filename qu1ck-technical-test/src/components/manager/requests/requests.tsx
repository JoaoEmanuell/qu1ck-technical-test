"use client";

type request = {
  id: number;
  request_itens: string;
  date: string;
  status: "received" | "in_progress" | "completed" | "cancelled";
};

interface RequestProps {
  requests: request[];
}

export const RequestsComponent = (props: RequestProps) => {
  return <h1>Hello</h1>;
};
