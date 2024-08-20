import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FinalStep = ({
  loading,
}: {
  loading: boolean;
}) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <div>
        <input
          type="checkbox"
          onChange={(e) => setDisabled(!e.target.checked)}
        />{" "}
        I agree that all the data submitted is true to my knowledge.
      </div>
      <Button
        type="submit"
        className="mt-2"
        size="sm"
        disabled={disabled||loading}
      >
        Submit
      </Button>
    </div>
  );
};
export default FinalStep;
