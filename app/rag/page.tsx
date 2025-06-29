// app/rag/page.tsx
import RagPageClient from "./RagPage";
import { connectToDatabase } from "@/lib/database";
import User from "@/models/User";
import { auth } from "@/auth";

export default async function RagPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return <div>User not found.</div>;
  }

  return <RagPageClient userId={user._id.toString()} />;
}
