import { selectUser } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

export const useUser = () => {
  const { profile } = useAppSelector(selectUser);

  return {
    userInfo: profile,
  };
};
