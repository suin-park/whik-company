"use client";

import { ManualHero } from "../ui";
import { useM } from "../useM";

export default function NodesHero({ count }: { count: number }) {
  const { t } = useM();
  return <ManualHero index="R" label={t("n.label")} title={t("n.title", { n: count })} hi={t("n.hi")} lead={t("n.lead")} />;
}
