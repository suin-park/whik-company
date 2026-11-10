import NodeIndex from "@/components/manual/NodeIndex";
import NodesHero from "@/components/manual/pages/NodesHero";
import { categories, nodes, slugOf } from "@/lib/manual/data";

export const metadata = { title: "Node reference" };

/** A description's first sentence, for the list. */
function summary(text: string | null | undefined) {
  if (!text) return null;
  const s = text.split(/(?<=[.!?。！？])\s*|:\s|：/)[0] ?? text;
  return s.length > 140 ? s.slice(0, 137) + "..." : s;
}

export default function NodesPage() {
  const list = nodes.map((n) => ({
    cls: n.cls,
    slug: slugOf(n),
    category: n.category,
    summary: { en: summary(n.help), ko: summary(n.help_ko), ja: summary(n.help_ja), zh: summary(n.help_zh) },
  }));
  return (
    <div>
      <NodesHero count={nodes.length} />
      <NodeIndex nodes={list} categories={categories.map((c) => ({ id: c.id, count: c.count }))} />
    </div>
  );
}
