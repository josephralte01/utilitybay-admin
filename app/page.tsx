'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background text-foreground">
      <div className="flex items-center justify-between w-full max-w-2xl mb-8">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={140}
          height={32}
          className="dark:invert"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm">🌙 Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(val) => setTheme(val ? "dark" : "light")}
          />
        </div>
      </div>

      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="py-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            🚀 Welcome to UtilityBay Admin
          </h1>
          <p className="text-muted-foreground mb-6 text-center">
            Start building your powerful dashboard. Edit{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-xs">
              app/page.tsx
            </code>{" "}
            and save to reload.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="https://vercel.com/new" target="_blank">
                Deploy Now
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://nextjs.org/docs" target="_blank">
                Read Docs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <Link
          href="https://nextjs.org/learn"
          target="_blank"
          className="hover:underline"
        >
          Learn
        </Link>
        <Link
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          className="hover:underline"
        >
          Templates
        </Link>
        <Link
          href="https://nextjs.org"
          target="_blank"
          className="hover:underline"
        >
          nextjs.org →
        </Link>
      </footer>
    </main>
  );
}
