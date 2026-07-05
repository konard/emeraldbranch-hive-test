import type { ClientFacts } from "../lib/site-builder";

export const clientFacts = {
  businessName: "Apex Detail Studio",
  category: "premium automotive detailing",
  location: "Austin, TX",
  serviceArea: ["Austin", "Round Rock", "Cedar Park", "Lakeway"],
  phone: "(512) 555-0198",
  email: "hello@apexdetail.example",
  primaryOffer: "ceramic coating, paint correction, and careful maintenance",
  trustSignals: [
    "insured mobile team",
    "paint-safe wash process",
    "five-year ceramic coating option"
  ],
  services: [
    {
      title: "Paint correction",
      description:
        "Measured multi-stage polishing for haze, swirl marks, and tired clear coat."
    },
    {
      title: "Ceramic coating",
      description:
        "A clean prep sequence, controlled install, and coating plan matched to the vehicle."
    },
    {
      title: "Maintenance detail",
      description:
        "Quiet recurring care for drivers who want the vehicle to stay ready every week."
    }
  ]
} satisfies ClientFacts;
