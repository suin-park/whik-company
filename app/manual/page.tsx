import Home from "@/components/manual/pages/Home";
import { categories, nodes } from "@/lib/manual/data";

export const metadata = { title: "WHIK Studio Manual" };

export default function ManualHome() {
  return <Home count={nodes.length} categories={categories.map((c) => ({ id: c.id, count: c.count }))} />;
}
