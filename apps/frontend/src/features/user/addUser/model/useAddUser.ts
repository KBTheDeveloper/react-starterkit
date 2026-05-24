import { useCreateUser } from "@features/user/api/userApi";

const useAddUser = () => {
  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  return { isCreating, createUser };
};

export default useAddUser;
