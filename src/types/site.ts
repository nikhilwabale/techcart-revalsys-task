export interface SiteContent {
  brand: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
  about: {
    title: string;
    description: string;
    highlights: string[];
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
  };
  footer: {
    description: string;
    quickLinks: string[];
    categories: string[];
    copyright: string;
  };
}
