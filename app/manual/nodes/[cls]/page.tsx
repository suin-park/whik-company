import { notFound } from "next/navigation";
import NodeView from "@/components/manual/pages/NodeView";
import { nodeBySlug, nodes, slugOf } from "@/lib/manual/data";

// (params is a promise in Next 15 and later)
type Props = { params: Promise<{ cls: string }> };

export function generateStaticParams() {
  return nodes.map((n) => ({ cls: slugOf(n) }));
}

export async function generateMetadata({ params }: Props) {
  const { cls } = await params;
  const n = nodeBySlug(cls);
  return { title: n ? n.cls : "Node" };
}

export default async function NodePage({ params }: Props) {
  const { cls } = await params;
  const n = nodeBySlug(cls);
  if (!n) notFound();
  const same = nodes.filter((x) => x.category === n.category);
  const at = same.indexOf(n);
  const link = (x?: (typeof nodes)[number]) => (x ? { cls: x.cls, slug: slugOf(x) } : undefined);
  return <NodeView n={n} prev={link(same[at - 1])} next={link(same[at + 1])} />;
}
