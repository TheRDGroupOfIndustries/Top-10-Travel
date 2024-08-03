export type HomeApiResult = {
  id: string;
  reviews: number;
  legalName: string;
  image: string | null;
  rating: number;
  methodology: string | null;
  country:string;
  city:string
}[];
