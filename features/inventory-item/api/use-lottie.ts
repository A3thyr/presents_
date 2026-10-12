import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useLottieImage(lottie: string, id: string) {

  if (!lottie) return {data: null}

  const lottieJson = useQuery({
    queryKey: [`lottie/${id}`],
    queryFn: async () => {
      const str = lottie.split("/");
      return axios.get(`/s3/${str[5]}`).then((res) => res.data);
    },
    staleTime: Infinity,
    enabled: !!lottie, // Only fetch if lottie exists
  });

  return lottieJson;
}
