"use client";
export const Sidebar = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => (
  <aside
    className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:relative md:min-h-screen z-50`}
  >
    <div className="h-full overflow-y-auto">
      <div className="p-4">{children}</div>
    </div>
  </aside>
);
