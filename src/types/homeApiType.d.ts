export type AgencyApiResult = {
  reviews: number;
  id: string;
  name: string;
  country: string;
  city: string;
  yearOfEstablishment: number;
  primaryServices: string[];
  images: string[];
  rating: number;
  methodology:string;
};

export type DMCHotelApiResult = {
  name: string;
  country: string;
  id: string;
  city: string;
  reviews: number;
  yearOfEstablishment: number;
  images: string[];
  rating: number;
  specialization: string[];
  methodology:string;
};
