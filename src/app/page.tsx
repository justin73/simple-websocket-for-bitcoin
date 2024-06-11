"use client";
import useWebSocket from "./hooks/useWebSocket";

const apiCall = {
  event: "bts:subscribe",
  data: { channel: "order_book_btcusd" },
};

export default function Home() {
  const data = useWebSocket("wss://ws.bitstamp.net", apiCall);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item}>
            <p> {item}</p>
          </div>
        );
      })}
    </div>
  );
}
