export interface Advantage {
  icon: string;
  title: string;
  description: string;
}

export interface LuxuryProperty {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isFeatured?: boolean;
  tag?: string;
}

export interface TrendingStay {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface GuestReview {
  id: string;
  name: string;
  role: string;
  text: string;
}
export interface BookingStep {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface HostingStat {
  value: string;
  label: string;
}
export interface Offer {
  id: string;
  badgeText: string;
  title: string;
  description: string;
  circleText: string;
  linkText: string;
  theme: 'pink' | 'gray';
}
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PlatformStat {
  value: string;
  label: string;
}
export interface FooterLinkGroup {
  id: string;
  title: string;
  links: string[];
}