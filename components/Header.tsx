import Link from "next/link";
import { BadgePlus, User2Icon } from "lucide-react";
import { auth } from "@/auth";
import { signOutSession } from "@/lib/auth-actions";
import Image from "next/image";

const Header = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-poppins">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={200} height={100} />
        </Link>

        {/* RENDERING THE BELOW BASED ON IF USER IS LOGGED IN OR NOT */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            <Link href={"/"} className="nav-menu">
              Home
            </Link>
            {/* <Link href={"/upload"} className="nav-menu">
              Upload Report
            </Link> */}
          </div>
          {session && session?.user ? (
            <>
              <Link
                href={"/dashboard"}
                className="primary_btn !text-[16px] !bg-white !text-black-100 flex items-center gap-2"
              >
                Dashboard
              </Link>


              {/* zehra added new page */}

                            <Link
                href={"/rag"}
                className="primary_btn !text-[16px] !bg-white !text-black-100 flex items-center gap-2"
              >
                Use Rag
              </Link>

              <form action={signOutSession}>
                <button type="submit">Logout</button>
              </form>

              {/* <Link href={`/user/${session?.id}`}>
                <UserAvatar id={session?.id} size="size-10" />
              </Link> */}

              {/* <ProfileDropdown
                userAvatar={<UserAvatar id={session?.id} size="size-10" />}
                session={session}
              /> */}
            </>
          ) : (
            <Link href={'/signin'} className="flex items-center gap-2 primary_btn">
              <User2Icon size={15} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
