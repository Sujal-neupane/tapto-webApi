"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
          {user.fullName?.[0]?.toUpperCase() || "U"}
        </span>
        <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <div className="px-4 py-2 text-sm text-gray-700">{user.fullName}</div>
          <div className="px-4 py-2 text-xs text-gray-500">{user.email}</div>
          <hr />
          <button
            className="w-full text-black text-left px-4 py-2 hover:bg-gray-100 text-sm"
            onClick={() => {
              setOpen(false);
              router.push("/user/orders");
            }}
          >
            My Orders
          </button>
          <button
            className="w-full text-black text-left px-4 py-2 hover:bg-gray-100 text-sm"
            onClick={() => {
              setOpen(false);
              router.push("/user/profile");
            }}
          >
            Profile
          </button>
          <button
          className="w-full text-black text-left px-4 py-2 hover:bg-gray-100 text-sm"
          onClick={()=>{
            setOpen(false);
            router.push("/user")
          }}
          >
            Settings
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            onClick={() => {
              logout();
              setOpen(false);
              router.replace("/auth/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}