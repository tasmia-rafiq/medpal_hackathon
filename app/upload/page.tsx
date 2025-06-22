import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OcrReader from "@/components/OcrReader";

export default async function UploadPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen px-6 py-16 bg-white font-poppins text-black">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-semibold mb-4">Upload Your Report</h1>
        <p className="text-black-300 mb-8">
          Add your medical records to keep everything in one safe place.
        </p>
        <OcrReader />
      </div>
    </main>
  );
}