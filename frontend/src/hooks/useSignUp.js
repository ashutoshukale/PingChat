import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signup } from "../lib/api.js";

const useSignUp = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { isPending, error, signUpMutation: mutate };
};

export default useSignUp;
