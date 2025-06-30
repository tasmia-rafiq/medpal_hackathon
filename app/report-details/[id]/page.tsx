import { connectToDatabase } from "@/lib/database";
import Report from "@/models/Report";
import { notFound } from "next/navigation";

export default async function ReportDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  await connectToDatabase();

  const paramsId = (await params).id;

  const report = await Report.findById(paramsId).lean(); //params should be awaited before using its properties

  if (!report || Array.isArray(report) || !report.text) return notFound();

  const formatted = report.formattedText;

  return (
    <main className="min-h-screen px-6 py-12 font-poppins bg-white text-black">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-semibold">Report Details</h1>
        <p className="text-sm text-gray-500">
          Uploaded on {new Date(report.createdAt).toLocaleString()}
        </p>

        <pre className="bg-gray-50 p-4 rounded">{`HELLO ${formatted}`}</pre>
      </div>
    </main>
  );
}