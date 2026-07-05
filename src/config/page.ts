import type { PageConfig } from "../lib/site-builder";

export const landingPageConfig = {
  id: "apex-detail-landing",
  title: "Apex Detail Studio",
  description:
    "A premium, media-led landing page generated from structured business, design, section, media, and automation configuration.",
  mediaLibrary: {
    heroExterior: {
      id: "heroExterior",
      type: "image",
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80",
      alt: "performance car on a quiet road at dusk",
      crop: "center"
    },
    studioReflection: {
      id: "studioReflection",
      type: "image",
      src: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1800&q=80",
      alt: "silver coupe with a glossy performance finish",
      crop: "center"
    },
    coatingProcess: {
      id: "coatingProcess",
      type: "video",
      src: "https://videos.pexels.com/video-files/2795749/2795749-uhd_2560_1440_25fps.mp4",
      poster:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1800&q=80",
      alt: "automotive detail process video placeholder",
      crop: "center"
    },
    interiorCare: {
      id: "interiorCare",
      type: "image",
      src: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1800&q=80",
      alt: "clean modern vehicle interior",
      crop: "center"
    }
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      headline: "A cleaner finish, built with quiet precision.",
      body: "Ceramic coating, paint correction, and maintenance care for drivers who want the vehicle to feel calm, protected, and ready.",
      media: [
        {
          assetId: "heroExterior",
          placement: "background",
          overlay: "dark"
        }
      ],
      ctas: [
        {
          label: "Book a detail",
          href: "#lead",
          intent: "primary"
        },
        {
          label: "View services",
          href: "#services",
          intent: "secondary"
        }
      ]
    },
    {
      id: "services",
      type: "services",
      headline: "Detailing that keeps the car ready.",
      body: "Each service is selected for paint safety, clean handoff, and a finish that holds up beyond the first drive."
    },
    {
      id: "process",
      type: "media-feature",
      variant: "split-media",
      eyebrow: "measured process",
      headline: "Every surface gets a controlled sequence.",
      body: "Wash, decontamination, correction, protection, and final inspection happen in a clear order, with no rushed handoff.",
      media: [
        {
          assetId: "coatingProcess",
          placement: "right"
        }
      ],
      ctas: [
        {
          label: "See the proof",
          href: "#proof",
          intent: "text"
        }
      ]
    },
    {
      id: "proof",
      type: "proof",
      headline: "The confidence is in the details.",
      body: "A focused service area, documented protection options, and clean lead routing make the experience predictable from first message to final walkaround.",
      media: [
        {
          assetId: "studioReflection",
          placement: "left"
        }
      ],
      facts: [
        {
          label: "service areas",
          value: "4"
        },
        {
          label: "ceramic option",
          value: "5 years"
        },
        {
          label: "lead routing",
          value: "ready"
        }
      ],
      needsFacts: [
        "replace warranty wording with signed client terms",
        "confirm whether mobile service covers every listed service area"
      ]
    },
    {
      id: "gallery",
      type: "gallery",
      headline: "Gloss without visual noise.",
      body: "A finish should read clean in daylight, under studio light, and from the driver seat.",
      media: [
        {
          assetId: "studioReflection",
          placement: "left"
        },
        {
          assetId: "interiorCare",
          placement: "right"
        }
      ]
    },
    {
      id: "lead",
      type: "lead",
      headline: "Start with the vehicle you drive.",
      body: "Share the model, current paint condition, and the result you want. The studio will route the request to the right next step.",
      integration: {
        formAction: "https://n8n.example/webhook/apex-detail-studio",
        bookingUrl: "https://cal.example/apex-detail-studio",
        chatbotIntent: "vehicle-detailing-intake",
        n8nWebhook: "apex-detail-studio-lead",
        crmRoute: "local-business-detailing"
      },
      needsFacts: ["replace example webhook and booking URLs before launch"]
    }
  ]
} satisfies PageConfig;
