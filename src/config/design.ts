import type { DesignDirection } from "../lib/site-builder";

export const teslaInspiredDesign = {
  id: "tesla-inspired",
  name: "Tesla-inspired premium minimal",
  sourceBrief: "GET_DESIGN.md",
  tokens: {
    accent: "#3E6AE1",
    canvas: "#FFFFFF",
    text: "#171A20",
    mutedText: "#5C5E62",
    alternateSurface: "#F4F4F4",
    radius: "4px",
    transition: "0.33s cubic-bezier(0.5, 0, 0, 0.75)"
  },
  defaultVariants: {
    hero: "full-bleed-media",
    services: "quiet-grid",
    "media-feature": "split-media",
    proof: "split-media",
    gallery: "editorial-pair",
    lead: "automation-ready"
  }
} satisfies DesignDirection;
