import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User, PlusCircle, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

const MobileNavigation = ({ isUserLoggedIn, userImage, providers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:hidden relative" id="mobileNAV">
      {isUserLoggedIn ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      ) : (
        <>
          {providers && (
            <div className="flex gap-4">
              {Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn text-lg py-3 px-6"
                >
                  Sign In
                </button>
              ))}
            </div>
          )}
        </>
      )}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-64 bg-zinc-800 rounded-lg shadow-lg py-2 z-10"
        >
          {isUserLoggedIn ? (
            <>
              <div className="px-6 py-4 border-b border-gray-500">
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <Image
                    src={userImage || "/assets/images/logo.svg"}
                    alt="user"
                    width={60}
                    height={60}
                    className="rounded-full mx-auto"
                  />
                </Link>
              </div>
              <Link
                href="/profile"
                className="block px-6 py-3 text-base text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <User className="inline-block mr-3" size={20} /> My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="block px-6 py-3 text-base text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle className="inline-block mr-3" size={20} /> Create
                Prompt
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-6 py-3 text-base text-white hover:bg-gray-700"
              >
                <LogOut className="inline-block mr-3" size={20} /> Sign Out
              </button>
            </>
          ) : (
            <>
              {providers && (
                <div className="px-4 py-2">
                  {Object.values(providers).map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => signIn(provider.id)}
                      className="block w-full text-left px-6 py-3 text-base text-white hover:bg-gray-700 mb-2"
                    >
                      Sign In with {provider.name}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
