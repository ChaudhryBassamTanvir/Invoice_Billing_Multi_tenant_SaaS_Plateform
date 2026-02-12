'use client';

import darkTheme from '@/app/lib/dark-theme';
import { lusitana } from '@/app/ui/fonts';
import { useState, useEffect,useRef } from 'react';
// import { chatData } from '@/app/lib/chat-data';
import { chatData } from '@/app/lib/chat-data';
// import { askGemini } from '@/app/lib/gemini';

/* ---------------- JSON DATA (SOURCE OF TRUTH) ---------------- */




/* ---------------- TYPES ---------------- */

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

/* ---------------- COMPONENT ---------------- */

export default function ChatBotPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  /* ---------------- LOGIC ---------------- */
const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('nimbusChatMessages');
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      // default bot greeting
      setMessages([
        {
          sender: 'bot',
          text: 'Ask anything related to dashboard, invoices, customers or profile.',
        },
      ]);
    }
  }, []);

  // Save messages to localStorage whenever they change (keep last 15)
 useEffect(() => {
    if (messages.length > 0) {
      const last15 = messages.slice(-15);
      localStorage.setItem('nimbusChatMessages', JSON.stringify(last15));
    }

    // Scroll to bottom whenever messages change    // Scroll to bottom whenever messages change

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


//   *********************SEND MSG**********************
const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  // Show user message immediately
  setMessages((prev) => [
    ...prev,
    { sender: 'user', text: userMessage },
  ]);

  setInput('');
  setLoading(true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    // Show Gemini response
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: data.reply },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: 'Something went wrong.' },
    ]);
  } finally {
    setLoading(false);
  }
};



  /* ---------------- UI ---------------- */
return (
  <main className="p">
      <div className="flex w-full items-center justify-between mb-3">
        <h1 className={`${lusitana.className} text-2xl ${darkTheme.title}`}>
          ChatBot & FAQs
        </h1>
      </div>

      <div
        className={`
          relative flex flex-col
          w-full
          h-[520px] sm:h-[520px] md:h-[520px]
          rounded-lg border bg-gray-50
          ${darkTheme.container} ${darkTheme.border}
        `}
      >
        {/* Header */}
        <div className="border-b px-4 py-3">
          <p className="text-xs text-gray-500">
            Ask about invoices, customers, or profile
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[70%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm
                  ${msg.sender === 'user'
                    ? 'bg-violet-600 text-white rounded-br-sm'
                    : `bg-white ${darkTheme.text} border rounded-bl-sm`}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && <p className="text-xs text-gray-400">Nimbus Bot is typing…</p>}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (Sticky Bottom) */}
        <div
          className={`
            sticky bottom-0 border-t bg-white
            ${darkTheme.bg} ${darkTheme.border}
            px-4 py-3
          `}
        >
  <div className="flex flex-col sm:flex-row gap-2">
  <input
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={e => e.key === 'Enter' && sendMessage()}
    placeholder="Type your question…"
    className={`
      w-full sm:flex-1
      rounded-lg border px-4 py-2 text-sm
      outline-none focus:ring-2 focus:ring-violet-500
      placeholder:text-gray-400
      ${darkTheme.border} ${darkTheme.text} ${darkTheme.bg}
    `}
  />

  <button
    onClick={sendMessage}
    className="
      w-full sm:w-auto
      rounded-lg bg-violet-600 px-5 py-2
      text-sm text-white transition
      hover:bg-violet-700 active:scale-95
    "
  >
    Send
  </button>
</div>

        </div>
      </div>
    </main>
  );

}
