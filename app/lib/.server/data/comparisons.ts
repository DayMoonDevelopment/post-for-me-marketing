import { buffer } from "./comparisons.buffer";
import { hootsuite } from "./comparisons.hootsuite";
import { sproutSocial } from "./comparisons.sprout-social";

export interface ComparisonFeature {
  name: string;
  postForMe: {
    available: boolean;
    description: string;
  };
  competitor: {
    available: boolean;
    description: string;
  };
}

export interface ComparisonPricing {
  postForMe: {
    startingPrice: string;
    model: string;
    details: string[];
  };
  competitor: {
    startingPrice: string;
    model: string;
    details: string[];
  };
}

export interface ComparisonData {
  id: string;
  competitor: {
    name: string;
    description: string;
  };
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
  };
  overview: {
    postForMe: string;
    competitor: string;
  };
  features: ComparisonFeature[];
  pricing: ComparisonPricing;
  idealFor: {
    postForMe: string[];
    competitor: string[];
  };
  conclusion: {
    headline: string;
    description: string;
    cta: string;
  };
}

export const comparisons: Record<string, ComparisonData> = {
  buffer: buffer,
  hootsuite: hootsuite,
  "sprout-social": sproutSocial,
};
