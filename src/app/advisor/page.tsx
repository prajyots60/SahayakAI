"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, History, MessageCircle, Quote, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

const historyItems = [
  {
    id: "cash-crisis-oct-13",
    title: "Plan for Cash Crisis - Oct 13",
    excerpt: "Liquidity playbook with vendor negotiation tips",
  },
  {
    id: "marketing-ideas-oct-11",
    title: "Marketing Ideas - Oct 11",
    excerpt: "Festival campaign roadmap for Tier-2 cities",
  },
  {
    id: "inventory-ops-oct-09",
    title: "Inventory Ops Review - Oct 09",
    excerpt: "Optimised reorder triggers for raw materials",
  },
];

export default function AdvisorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: formatAssistantResponse(trimmed),
        sources: [
          "financial_practice_cash_flow.txt",
          "msme_growth_playbook.pdf",
        ],
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 600);
  };

  const showWelcome = messages.length === 0 && !isThinking;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <aside className="hidden w-full max-w-xs border-r border-emerald-100/70 bg-white/70 px-6 py-10 text-slate-700 lg:flex lg:flex-col">
        <div className="mb-6 flex items-center gap-3">
          <History className="h-5 w-5 text-emerald-500" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              Conversations
            </p>
            <p className="text-sm font-semibold text-slate-900">Chat history</p>
          </div>
        </div>
        <nav className="space-y-3">
          {historyItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="w-full rounded-2xl border border-emerald-100 bg-white/80 px-4 py-4 text-left text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/80 hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.excerpt}</p>
            </button>
          ))}
        </nav>
        <div className="mt-auto flex justify-between pt-6 text-xs text-emerald-600">
          <Link href="/dashboard" className="hover:underline">
            ← Back to dashboard
          </Link>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </div>
      </aside>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              AI advisor
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Ask anything, Priya.
            </h1>
            <p className="text-sm text-slate-500">
              Your always-on business partner for cash flow, growth, and risk
              mitigation. Start with one of the focus areas highlighted on your
              dashboard.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to dashboard
            </Link>
          </Button>
        </div>

        <section className="flex flex-1 flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-xl shadow-emerald-500/10">
          <div className="flex-1 overflow-y-auto rounded-2xl border border-emerald-100 bg-white/80 p-6">
            {showWelcome ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
                <MessageCircle className="mb-4 h-10 w-10 text-emerald-400" />
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-500">
                  I'm SahayakAI
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Ask me anything about improving your business.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-slate-500">
                  You can start by tapping a risk from your dashboard or
                  exploring new growth strategies. I format every recommendation
                  so you can act immediately.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatBubble key={message.id} message={message} />
                ))}
                {isThinking && (
                  <div className="flex items-center gap-2 text-xs text-emerald-500">
                    <Quote className="h-4 w-4 animate-pulse" />
                    SahayakAI is thinking...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form
            className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={3}
              placeholder="Ask about reducing payment delays or improving margins..."
              className="w-full resize-none rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Tip: Reference a focus area like “Explain causes for low cash on
                hand" to get a tailored plan.
              </div>
              <Button
                type="submit"
                disabled={isThinking}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30 disabled:opacity-60"
              >
                {isThinking ? "Thinking..." : "Send"}
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex", {
        "justify-end": isUser,
      })}
    >
      <div
        className={cn(
          "max-w-2xl rounded-2xl border px-5 py-4 shadow-sm",
          isUser
            ? "border-emerald-200 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-sm text-white"
            : "border-emerald-100 bg-white text-slate-700"
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed text-white">
            {message.content}
          </p>
        ) : (
          <article className="prose prose-sm max-w-none text-slate-700 prose-headings:text-slate-900 prose-li:marker:text-emerald-500">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </article>
        )}

        {message.role === "assistant" &&
          message.sources &&
          message.sources.length > 0 && (
            <details className="mt-4 text-xs text-emerald-500">
              <summary className="cursor-pointer list-none">ℹ️ Sources</summary>
              <ul className="mt-2 space-y-1 text-slate-500">
                {message.sources.map((source) => (
                  <li key={source} className="pl-3 text-xs">
                    • {source}
                  </li>
                ))}
              </ul>
            </details>
          )}
      </div>
    </div>
  );
}

function formatAssistantResponse(question: string) {
  return `**Summary**  
Here’s how we can tackle “${question}”:  

**Action Plan**
1. Assess the latest cash flow statements and benchmark against historical norms.
2. Engage priority vendors to re-negotiate payment terms and stagger large payables.
3. Implement a rolling 12-week liquidity forecast using your updated October data.

**Suggestions**
- Automate invoice reminders to reduce the payment delay cycle.
- Review discretionary spending for immediate savings.
- Diversify short-term financing options with low-cost credit lines.

> Note: Keep your data fresh in the dashboard so projections stay accurate.`;
}
