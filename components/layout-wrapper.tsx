"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutWrapper({
  children,
  navComponent,
}: {
  children: React.ReactNode;
  navComponent: React.ReactNode; // Accept navComponent as a prop
}) {
  const pathname = usePathname();
  const hideNav = pathname === "/landing";

  return (
    <div className={!hideNav ? "sm:grid sm:grid-cols-[256px,1fr]" : ""}>
      {!hideNav && navComponent} {/* Conditionally render navComponent */}
      <main className="py-4 px-4 flex flex-col gap-4 min-h-screen">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
