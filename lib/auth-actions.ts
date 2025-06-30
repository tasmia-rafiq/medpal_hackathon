"use server";

import { signIn , signOut} from "@/auth";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
    await signIn("google", { redirectTo: "/rag" });
}

export async function signOutSession() {
    await signOut({ redirectTo: "/" });
}