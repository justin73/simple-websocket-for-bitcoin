// useWebSocket.js
import { useEffect, useState } from "react";

function useWebSocket(url: string, apiCall: any): string[] | null {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify(apiCall));
    };

    socket.onmessage = (event) => {
      const json = JSON.parse(event.data);
      try {
        if (json.event == "data") {
          setData(json.data.bids.slice(0, 5));
        }
      } catch (err) {
        console.log(err);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      // ws.readyState === 1 ? ws.close() : undefined;
      socket.close();
    };
  }, [apiCall, url]);

  return data;
}

export default useWebSocket;
