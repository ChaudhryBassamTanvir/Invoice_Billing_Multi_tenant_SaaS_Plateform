import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatData } from "@/app/lib/chat-data";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "No message provided." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "API key missing." },
        { status: 500 }
      );
    }

    const knowledgeBase = chatData.faqs
      .map(
        (faq) =>
          `Keywords: ${faq.keywords.join(", ")}\nAnswer: ${faq.answer}`
      )
      .join("\n\n");

    const systemPrompt = `
You are Nimbus Support Bot.

You ONLY answer questions related to:
- Dashboard
- Invoices
- Customers
- Profile

Use ONLY the information below.
If the question is unrelated, reply exactly:
"${chatData.fallback}"

Nimbus Knowledge Base:
${knowledgeBase}
`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent(`
${systemPrompt}

User Question:
${message}
`);

    const reply = result.response.text();
    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json(
      { reply: "Server error while contacting AI." },
      { status: 500 }
    );
  }
}
