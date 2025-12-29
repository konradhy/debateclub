import { useState, useRef, useEffect } from "react";

export function usePrepChat(chatMessages: any[] | undefined) {
  const [chatInput, setChatInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return {
    chatInput,
    setChatInput,
    isSendingChat,
    setIsSendingChat,
    chatScrollRef,
  };
}
