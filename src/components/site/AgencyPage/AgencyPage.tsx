type Data = {
  rating: string;
  reviews: string;
  description: string;
  legalName: string;
  image: string | null;
};

const AgencyPage = ({ data }: { data: Data[] }) => {
  // use this data to show all the cards
  return <div>AgencyPage</div>;
};
export default AgencyPage;
