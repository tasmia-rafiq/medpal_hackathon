import { NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together(); // Uses process.env.TOGETHER_API_KEY automatically

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        {
          role: "system",
          content: `
          You are a medical assistant AI. From the extracted medical report text, analyze the test results queitly and identify **only the abnormal or flagged values**

          🔒 DO NOT write any explanations, analysis, or internal thoughts.
          🔒 DO NOT respond if all values are normal.
          🔒 DO NOT write in full sentences or paragraphs.

          ✅ ONLY output these two sections if abnormalities exist:

          **Abnormal test results:**
          - [Test Name]

          **Next Steps:**
          - [One-line action per abnormal test]

          EXAMPLE OUTPUT OF WHAT TO RETURN IN RESPONSE:
          **Abnormal test results:**
          - **Red Blood Cell Count** : 14.5 x10¹²/L -> ELEVATED; (normal range: 4.2–5.9 x10¹²/L)
          **Next Steps:**
          - Consider further investigation for polycythemia.
          `,
          // content: `
          // You are a medical assistant AI. From the extracted medical report text, analyze the test results and identify **only the abnormal or flagged values**.

          // Return clear, **concise medical insights** or actions for each abnormal finding.
          // Focus only on issues.
          // Use bullet points.
          // Be brief and medically relevant.
          // Do not include normal results.
          // Do not include raw values, reference ranges, or tables.
          // Do not write in long paragraphs.

          // Example output:
          // - High glucose levels may suggest diabetes risk; follow-up test advised.
          // - Elevated LDL cholesterol increases cardiovascular risk; lifestyle changes recommended.
          // - Low hemoglobin may indicate anemia; consider iron studies.
          // `.trim(),
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.5,
      max_tokens: 1024,
    });

    const formatted =
      response.choices?.[0]?.message?.content ?? "Formatting failed.";
    return NextResponse.json({ success: true, formatted });
  } catch (error) {
    console.error("Together AI Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to format using Together AI" },
      { status: 500 }
    );
  }
}
