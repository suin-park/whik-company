import type { Metadata } from "next";
import PortalPage from "@/components/business/PortalPage";

export const metadata: Metadata = {
  title: "계약 & 견적 | WHIK",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PortalPage />;
}
