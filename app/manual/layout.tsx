import type { Metadata } from "next";
import type { ReactNode } from "react";
import ManualShell from "@/components/manual/ManualShell";
import { categories } from "@/lib/manual/data";
import "./manual.css";

export const metadata: Metadata = {
  title: { default: "WHIK Studio Manual", template: "%s | WHIK Studio Manual" },
  description: "WHIK Studio manual: getting started, guides, and every node and option.",
};

export default function ManualLayout({ children }: { children: ReactNode }) {
  return <ManualShell categories={categories.map((c) => ({ id: c.id, ko: c.ko, count: c.count }))}>{children}</ManualShell>;
}
