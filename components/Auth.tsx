// components/Auth.tsx
"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Auth() {
  return (
    <div className="flex items-center justify-end space-x-4">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 ease-in-out shadow-sm">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
      </SignedIn>
    </div>
  );
}
