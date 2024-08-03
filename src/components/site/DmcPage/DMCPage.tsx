type Data = {
  rating: string;
  reviews: string;
  description: string;
  legalName: string;
  image: string | null;
};

const DMCPage = ({ data }: { data: Data[] }) => {
  // use this data to show all the cards
  return <div>DMCPage</div>;
};
export default DMCPage;
