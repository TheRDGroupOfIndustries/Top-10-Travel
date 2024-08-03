export type TOP10Data = {
  image: string | null;
  reviews: number;
  legalName: string;
  country: string;
  state: string;
  city: string;
  description: string | null;
  rating: number;
  images?: string[];
}[];
export type TOP10InfluencerData = {
  image: string | null;
  name: string;
  speciality: string;
  socialId: string;
  description: string | null;
  images?: string[];
}[];
