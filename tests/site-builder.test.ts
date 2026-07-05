import { describe, expect, it } from "vitest";
import {
  collectPendingFacts,
  createSiteModel,
  type ClientFacts,
  type DesignDirection,
  type PageConfig
} from "../src/lib/site-builder";

const client: ClientFacts = {
  businessName: "Apex Detail Studio",
  category: "premium automotive detailing",
  location: "Austin, TX",
  serviceArea: ["Austin", "Round Rock", "Cedar Park"],
  phone: "(512) 555-0198",
  email: "hello@example.com",
  primaryOffer: "ceramic coating and paint correction",
  trustSignals: ["insured mobile team", "five-year ceramic warranty"],
  services: [
    {
      title: "Paint correction",
      description: "Multi-stage correction for swirl marks, haze, and oxidation."
    }
  ]
};

const design: DesignDirection = {
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
    proof: "split-media",
    gallery: "editorial-pair",
    lead: "automation-ready"
  }
};

const page: PageConfig = {
  id: "detailing-landing",
  title: "Apex Detail Studio",
  mediaLibrary: {
    hero: {
      id: "hero",
      type: "image",
      src: "https://example.com/hero.jpg",
      alt: "black coupe in a clean detailing studio"
    },
    processVideo: {
      id: "processVideo",
      type: "video",
      src: "https://example.com/process.mp4",
      poster: "https://example.com/process-poster.jpg",
      alt: "detailer applying ceramic coating"
    }
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      headline: "Mirror finish, delivered without noise.",
      media: [{ assetId: "hero", placement: "background", overlay: "dark" }],
      ctas: [
        { label: "Book a detail", href: "#lead", intent: "primary" },
        { label: "View services", href: "#services", intent: "secondary" }
      ]
    },
    {
      id: "proof",
      type: "proof",
      variant: "split-media",
      headline: "A quieter way to protect daily drivers.",
      media: [{ assetId: "processVideo", placement: "right" }],
      facts: [
        { label: "ceramic warranty", value: "5 years" },
        { label: "average install", value: "1 day" }
      ],
      needsFacts: ["replace warranty length with signed client terms"]
    },
    {
      id: "lead",
      type: "lead",
      headline: "Route every lead to the next step.",
      integration: {
        formAction: "https://n8n.example/webhook/apex-detail",
        bookingUrl: "https://cal.example/apex",
        chatbotIntent: "vehicle-detailing-intake"
      }
    }
  ]
};

describe("createSiteModel", () => {
  it("resolves ordered sections, design variants, media placements, and automation settings", () => {
    const model = createSiteModel({ client, design, page });

    expect(model.title).toBe("Apex Detail Studio");
    expect(model.sections.map((section) => section.id)).toEqual(["hero", "proof", "lead"]);
    expect(model.sections[0].variant).toBe("full-bleed-media");
    expect(model.sections[0].media[0]).toMatchObject({
      placement: "background",
      asset: { id: "hero", type: "image" }
    });
    expect(model.sections[1].media[0]).toMatchObject({
      placement: "right",
      asset: { id: "processVideo", type: "video" }
    });
    expect(model.sections[2].integration?.chatbotIntent).toBe("vehicle-detailing-intake");
  });

  it("rejects duplicate section IDs and unknown media references", () => {
    expect(() =>
      createSiteModel({
        client,
        design,
        page: {
          ...page,
          sections: [
            ...page.sections,
            { id: "hero", type: "gallery", headline: "Duplicate" }
          ]
        }
      })
    ).toThrow(/Duplicate section id: hero/);

    expect(() =>
      createSiteModel({
        client,
        design,
        page: {
          ...page,
          sections: [
            {
              id: "bad-media",
              type: "hero",
              headline: "Broken",
              media: [{ assetId: "missing", placement: "background" }]
            }
          ]
        }
      })
    ).toThrow(/Unknown media asset "missing"/);
  });
});

describe("collectPendingFacts", () => {
  it("keeps real-business TODOs visible for operators and agents", () => {
    const model = createSiteModel({ client, design, page });

    expect(collectPendingFacts(model)).toEqual([
      {
        sectionId: "proof",
        items: ["replace warranty length with signed client terms"]
      }
    ]);
  });
});
