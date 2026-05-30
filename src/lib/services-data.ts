
export type ServiceCategory = 'Results' | 'Admit Cards' | 'Latest Jobs' | 'Upcoming Jobs' | 'Scholarships' | 'Admissions';

export interface IndianService {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ServiceCategory;
  state?: string;
  isPopular?: boolean;
  imageUrl?: string;
  lastDate?: string;
  importantDates?: string;
  applicationFee?: string;
  ageLimit?: string;
  totalPosts?: string;
}

export interface AppConfig {
  heroImageUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  tickerMessages?: string[];
}

export interface TickerConfig {
  name1?: string;
  url1?: string;
  name2?: string;
  url2?: string;
  name3?: string;
  url3?: string;
  name4?: string;
  url4?: string;
  name5?: string;
  url5?: string;
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'All India'
];
