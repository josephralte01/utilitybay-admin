"use client";

import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { GeistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable
        )}
      >
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
            <div className="mt-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
