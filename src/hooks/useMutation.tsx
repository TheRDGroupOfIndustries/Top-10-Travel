import { useState } from "react";

// Define the generic types
type ServerAction<Input, Output> = (input: Input) => Promise<Output>;

type UseMutationResult<Input, Output> = {
  mutate: (input: Input) => Promise<Output>;
  isPending: boolean;
};

function useMutation<Input, Output>(
  serverAction: ServerAction<Input, Output>
): UseMutationResult<Input, Output> {
  const [isPending, setIsPending] = useState<boolean>(false);

  const mutate = async (input: Input): Promise<Output> => {
    setIsPending(true);
    try {
      const result = await serverAction(input);
      return result;
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}

export default useMutation;
