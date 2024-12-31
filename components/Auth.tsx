// components/Auth.tsx
"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const CustomPage = () => {
  return (
    <div>
      <h1>Custom Profile Page</h1>
      <p>This is the custom profile page from a component</p>
    </div>
  );
};

export function Auth() {
  return (
    <div className="flex items-center justify-end space-x-4">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 ease-in-out shadow-sm">
            登录/注册
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
        >
          <UserButton.UserProfilePage
            label="Custom Page"
            url="custom"
            labelIcon={<DotIcon />}
          >
            <CustomPage />
          </UserButton.UserProfilePage>

          {/* You can also pass the content as direct children */}
          <UserButton.UserProfilePage
            label="Terms"
            labelIcon={<DotIcon />}
            url="terms"
          >
            <div>
              <h1>Custom Terms Page</h1>
              <p>This is the custom terms page from the children page</p>
            </div>
          </UserButton.UserProfilePage>
        </UserButton>
      </SignedIn>
    </div>
  );
}
