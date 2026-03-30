import type { Metadata } from "next";
import { HomePageShell } from "@/components/app/homepage-shell";

export const metadata: Metadata = {
  title: "Learn ISO 27001 through real cybersecurity workflows",
  description:
    "ISO 27001 Lab makes ISO/IEC 27001 easier to understand for regular learners, operators, and security teams through guided modules, practice labs, and mock exams.",
};

export default function HomePage() {
  return <HomePageShell />;
}
