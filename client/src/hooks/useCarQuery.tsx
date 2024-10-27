import { useQuery } from "@tanstack/react-query";
import { APIResponse, Car } from "../lib/types";
import { API } from "../service/API";

export default function useCarQuery(){
  const carQuery = useQuery({
    queryFn() {
      return API.get<APIResponse<Car[]>>(
        `/cars`
      );
    },
    queryKey: ["cars"],
  });

  const carData = carQuery.data?.data.data || [];

  return { carQuery, carData };
}