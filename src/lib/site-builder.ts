export type SectionType =
  | "hero"
  | "services"
  | "media-feature"
  | "proof"
  | "gallery"
  | "lead";

export type MediaType = "image" | "video";
export type MediaPlacement =
  | "background"
  | "left"
  | "right"
  | "inline"
  | "full-bleed";
export type CtaIntent = "primary" | "secondary" | "text";

export type MediaAsset = {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  poster?: string;
  crop?: "center" | "top" | "bottom" | "left" | "right";
};

export type MediaSlot = {
  assetId: string;
  placement: MediaPlacement;
  overlay?: "none" | "light" | "dark";
};

export type ResolvedMediaSlot = Omit<MediaSlot, "assetId"> & {
  asset: MediaAsset;
};

export type Cta = {
  label: string;
  href: string;
  intent: CtaIntent;
};

export type ClientService = {
  title: string;
  description: string;
};

export type ClientFacts = {
  businessName: string;
  category: string;
  location: string;
  serviceArea: string[];
  phone: string;
  email: string;
  primaryOffer: string;
  trustSignals: string[];
  services: ClientService[];
};

export type DesignTokens = {
  accent: string;
  canvas: string;
  text: string;
  mutedText: string;
  alternateSurface: string;
  radius: string;
  transition: string;
};

export type DesignDirection = {
  id: string;
  name: string;
  sourceBrief: string;
  tokens: DesignTokens;
  defaultVariants: Partial<Record<SectionType, string>>;
};

export type ProofFact = {
  label: string;
  value: string;
};

export type IntegrationSettings = {
  formAction?: string;
  bookingUrl?: string;
  chatbotIntent?: string;
  n8nWebhook?: string;
  crmRoute?: string;
};

export type SectionConfig = {
  id: string;
  type: SectionType;
  variant?: string;
  enabled?: boolean;
  eyebrow?: string;
  headline: string;
  body?: string;
  media?: MediaSlot[];
  ctas?: Cta[];
  items?: ClientService[];
  facts?: ProofFact[];
  integration?: IntegrationSettings;
  needsFacts?: string[];
};

export type PageConfig = {
  id: string;
  title: string;
  description?: string;
  mediaLibrary: Record<string, MediaAsset>;
  sections: SectionConfig[];
};

export type ResolvedSection = Omit<SectionConfig, "media" | "variant"> & {
  variant: string;
  media: ResolvedMediaSlot[];
};

export type SiteModel = {
  title: string;
  description: string;
  client: ClientFacts;
  design: DesignDirection;
  page: PageConfig;
  sections: ResolvedSection[];
};

export type PendingFacts = {
  sectionId: string;
  items: string[];
};

type SectionRegistryEntry = {
  defaultVariant: string;
  variants: string[];
};

export const sectionRegistry: Record<SectionType, SectionRegistryEntry> = {
  hero: {
    defaultVariant: "full-bleed-media",
    variants: ["full-bleed-media", "split-media"]
  },
  services: {
    defaultVariant: "quiet-grid",
    variants: ["quiet-grid", "media-led-list"]
  },
  "media-feature": {
    defaultVariant: "split-media",
    variants: ["split-media", "full-bleed-media", "inline-video"]
  },
  proof: {
    defaultVariant: "split-media",
    variants: ["split-media", "stat-strip"]
  },
  gallery: {
    defaultVariant: "editorial-pair",
    variants: ["editorial-pair", "full-bleed-grid"]
  },
  lead: {
    defaultVariant: "automation-ready",
    variants: ["automation-ready", "booking-first"]
  }
};

export function createSiteModel({
  client,
  design,
  page
}: {
  client: ClientFacts;
  design: DesignDirection;
  page: PageConfig;
}): SiteModel {
  const sectionIds = new Set<string>();
  const sections = page.sections
    .filter((section) => section.enabled !== false)
    .map((section) => {
      if (sectionIds.has(section.id)) {
        throw new Error(`Duplicate section id: ${section.id}`);
      }

      sectionIds.add(section.id);

      const registryEntry = sectionRegistry[section.type];
      const variant =
        section.variant ??
        design.defaultVariants[section.type] ??
        registryEntry.defaultVariant;

      if (!registryEntry.variants.includes(variant)) {
        throw new Error(
          `Unsupported variant "${variant}" for section type "${section.type}"`
        );
      }

      const media = (section.media ?? []).map((slot) => {
        const asset = page.mediaLibrary[slot.assetId];

        if (!asset) {
          throw new Error(
            `Unknown media asset "${slot.assetId}" in section "${section.id}"`
          );
        }

        return {
          placement: slot.placement,
          overlay: slot.overlay ?? "none",
          asset
        };
      });

      return {
        ...section,
        variant,
        media
      };
    });

  return {
    title: page.title,
    description:
      page.description ??
      `${client.businessName} creates ${client.primaryOffer} for ${client.location}.`,
    client,
    design,
    page,
    sections
  };
}

export function collectPendingFacts(model: SiteModel): PendingFacts[] {
  return model.sections
    .filter((section) => (section.needsFacts?.length ?? 0) > 0)
    .map((section) => ({
      sectionId: section.id,
      items: section.needsFacts ?? []
    }));
}

export function getLeadIntegration(model: SiteModel): IntegrationSettings {
  return (
    model.sections.find((section) => section.type === "lead")?.integration ?? {}
  );
}
