import { signInWithGoogle } from "@/lib/auth-actions";
import { FileText, Chrome, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-[90vh] flex items-center justify-between gap-4 pr-4">
      <div className="self-stretch h-[100%] w-[100%] overflow-hidden relative">
        <Image src={"/image1.jpg"} alt="Sign In" width={900} height={10} className="w-[100%]! h-[100%]! object-cover" />
      </div>
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl shadow-black-300 p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={200} height={40} />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-black-200 mb-2">
            Welcome Back
          </h1>
          <p className="text-black-300">
            Sign in to access your medical reports dashboard
          </p>
        </div>

        <div className="space-y-4">
          <form action={signInWithGoogle}>
            <button
              type="submit"
              className="w-full bg-white border-2 border-gray-200 text-black-200 py-3 px-4 rounded-lg hover:border-secondary hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5 text-red-500" />
              <span className="font-medium">Sign in with Google</span>
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-black-300">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-black-200 mb-3">
              Why sign in?
            </h3>
            <ul className="text-xs text-black-300 space-y-1">
              <li>• Save and organize your medical reports</li>
              <li>• Access your reports from any device</li>
              <li>• Secure cloud storage for your health data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
