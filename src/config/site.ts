import { createSiteModel } from "../lib/site-builder";
import { clientFacts } from "./client";
import { teslaInspiredDesign } from "./design";
import { landingPageConfig } from "./page";

export const siteModel = createSiteModel({
  client: clientFacts,
  design: teslaInspiredDesign,
  page: landingPageConfig
});
