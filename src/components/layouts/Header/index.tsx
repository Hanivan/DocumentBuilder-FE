"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthStore } from "@/features/store/authStore";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [email, hashId] = AuthStore((s) => [s.email, s.hashId]);

  console.log(
    {
      email,
      hashId,
    },
    "==== after"
  );

  return (
    <header className="shrink bg-slate-800 block w-full max-w-screen relative">
      <nav className="container">
        <div className="flex w-full my-0 mx-auto justify-between items-center lg:m-auto">
          <div className="flex items-center p-0 m-0">
            <Link href="/" className="flex w-40 p-0 h-full max-h-16">
              <Image
                src={"/google-color-icon.svg"}
                alt="logo"
                width={300}
                height={300}
                className="w-full decoration-none cursor-pointer py-2"
              />
            </Link>
          </div>
          <div id="mobile"></div>
          <div className="lg:min-h-20 flex gap-2 text-white my-0 mx-2 w-full items-center justify-end">
            <div>
              <ul className="flex flex-nowrap justify-end items-center m-0">
                <li className="relative cursor-pointer">
                  <Link href={"/mydocuments"} className="text-white">
                    {![email, hashId]?.includes("") ? (
                      <>{`${email}_${hashId}`}</>
                    ) : (
                      <>{"My Form"}</>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center z-1">
              <Avatar className="p-0 cursor-pointer m-0 block">
                <div className="border border-lime-500 rounded-full">
                  <AvatarImage
                    alt="Avatar"
                    src="/images/Rudeus Greyrat - Mushoku Tensei II icons.jpeg"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
