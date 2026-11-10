import { notFound } from "next/navigation";
import NodeView from "@/components/manual/pages/NodeView";
import { nodeBySlug, nodes, slugOf } from "@/lib/manual/data";

export function generateStaticParams() {
  return nodes.map((n) => ({ cls: slugOf(n) }));
}

export function generateMetadata({ params }: { params: { cls: string } }) {
  const n = nodeBySlug(params.cls);
  return { title: n ? n.cls : "Node" };
}

export default function NodePage({ params }: { params: { cls: string } }) {
  const n = nodeBySlug(params.cls);
  if (!n) notFound();
  const same = nodes.filter((x) => x.category === n.category);
  const at = same.indexOf(n);
  const link = (x?: (typeof nodes)[number]) => (x ? { cls: x.cls, slug: slugOf(x) } : undefined);
  return <NodeView n={n} prev={link(same[at - 1])} next={link(same[at + 1])} />;
}
