"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "ai",

        text:
          "Hi 👋 I am your AI Assistant. How can I help you today?",
      },
    ]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    // User Message
    const userMessage = {
      sender: "user",
      text: message,
    };

    // Show user message instantly
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      // Get logged in user
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // API Request
      const res = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userMessage: message,
            userId: user?._id,
          }),
        }
      );

      const data = await res.json();

      // AI Reply
      const aiReply = {
        sender: "ai",

        text:
          data.reply ||
          "No response from AI",
      };

      // Show AI reply
      setMessages((prev) => [
        ...prev,
        aiReply,
      ]);

    } catch (error) {

      console.error(error);

      const errorReply = {
        sender: "ai",
        text: "⚠️ Server Error",
      };

      setMessages((prev) => [
        ...prev,
        errorReply,
      ]);
    }

    // Clear Input
    setMessage("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
        >

          {open ? (
            <X className="text-white w-7 h-7" />
          ) : (
            <MessageCircle className="text-white w-7 h-7" />
          )}

        </button>

      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-28 right-6 z-50 w-[370px] h-[550px] bg-[#0F172A]/95 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${open
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
          }`}
      >

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
            AI
          </div>

          <div>

            <h2 className="text-white font-bold text-lg">
              AI Assistant
            </h2>

            <p className="text-white/70 text-sm">
              Online
            </p>

          </div>

        </div>

        {/* Messages */}
        <div className="h-[390px] overflow-y-auto p-4 space-y-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.sender ===
                "user"
                ? "ml-auto bg-cyan-500 text-white"
                : "bg-[#1E293B] text-gray-300 markdown-content"
                }`}
            >
              {msg.sender === "user" ? (
                msg.text
              ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}

        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0F172A] border-t border-gray-700">

          <div className="flex items-center gap-3">

            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              className="flex-1 bg-[#1E293B] border border-gray-600 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400 transition-all"
            />

            <button
              onClick={sendMessage}
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center hover:scale-105 transition-all"
            >

              <Send className="text-white w-5 h-5" />

            </button>

          </div>

        </div>

      </div>
    </>
  );
}