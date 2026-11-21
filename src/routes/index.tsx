import { createFileRoute } from "@tanstack/react-router";
import { WeddingPage } from "@/components/WeddingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arun Sai Durga Reddy & Grashma Aniswa — Wedding Invitation" },
      {
        name: "description",
        content:
          "Join us for the wedding of Arun Sai Durga Reddy and Grashma Aniswa on Wednesday, 02 December 2026 at Sridevi Function Hall A/c, Polamuru.",
      },
      { property: "og:title", content: "Arun & Grashma — Wedding Invitation" },
      {
        property: "og:description",
        content: "Wednesday, 02 December 2026 · Muhurtham 04:45 AM · Sridevi Function Hall A/c, Polamuru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingPage,
});
