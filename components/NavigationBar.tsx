"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Auth } from "./Auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation items array for reusability
const navigationItems = [
  { href: "/", label: "200期油管地道口语" },
  { href: "/expression", label: "表达素材库" },
  { href: "/feedback", label: "意见反馈" },
  { href: "/contact", label: "加入打卡群" },
] as const;

export const NavigationBar = () => {
  const pathname = usePathname();

  // Memoized function to determine if link is active
  const isActivePath = (path: string) => pathname === path;

  const getLinkClassName = (path: string) => {
    const baseClasses =
      "inline-flex items-center px-1 pt-1 text-sm font-medium";
    return `${baseClasses} ${
      isActivePath(path)
        ? "border-b-2 border-indigo-500 text-gray-900"
        : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`;
  };

  const getMobileLinkClassName = (path: string) => {
    const baseClasses = "block border-l-4 py-2 pl-3 pr-4 text-base font-medium";
    return `${baseClasses} ${
      isActivePath(path)
        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
    }`;
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {navigationItems.map(({ href, label }) => (
                <Link key={href} href={href} className={getLinkClassName(href)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <Auth />
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 pb-3 pt-2">
          {navigationItems.map(({ href, label }) => (
            <DisclosureButton
              key={href}
              as={Link}
              href={href}
              className={getMobileLinkClassName(href)}
            >
              {label}
            </DisclosureButton>
          ))}
        </div>

        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            <Auth />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
