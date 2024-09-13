import { useEffect, useState, useCallback } from "react";
import AC from "agora-chat";

function useAgoraChat(username, password) {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = AgoraChat.createClient({
      appkey: "your_agora_appkey",
    });

    client
      .login(username, password)
      .then(() => {
        setConnected(true);
        console.log("Agora Chat Connected");

        client.on("message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      })
      .catch((err) => {
        console.error("Failed to connect Agora Chat:", err);
      });

    return () => {
      client.logout();
    };
  }, [username, password]);

  const sendMessage = useCallback(
    (to, msgText) => {
      const msg = AgoraChat.createTextMessage({
        to,
        message: msgText,
      });
      if (connected) {
        client.sendMessage(msg);
      }
    },
    [connected]
  );

  return { messages, sendMessage, connected };
}
