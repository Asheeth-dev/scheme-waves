import { createFileRoute } from "@tanstack/react-router";
import SahaayApp from "@/components/SahaayApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahaay — Cancer Scheme & Financial Aid Finder (India)" },
      {
        name: "description",
        content:
          "Answer a few voice questions in English, Hindi or Kannada and get a printable report of the government schemes, NGO grants and help desks you qualify for.",
      },
      { property: "og:title", content: "Sahaay — Cancer Financial Aid Navigator" },
      {
        property: "og:description",
        content:
          "Voice-first eligibility check in English, Hindi and Kannada for Indian cancer schemes, NGO grants and hospital help desks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SahaayApp,
});
