type Data = {
  rating: string;
  reviews: string;
  description: string;
  legalName: string;
  image: string | null;
};

const HotelPage = ({ data }: { data: Data[] }) => {
  // use this data to show all the cards
  return <div>HotelPage</div>
};
export default HotelPage;
