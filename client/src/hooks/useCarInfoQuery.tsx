import { useQuery } from "@tanstack/react-query";
import { API } from "../service/API";
import { APIResponse, CarInfo } from "../lib/types";

export default function useCarInfoQuery( id : string ){
  const carInfoQuery = useQuery({
    queryFn() {
      return API.get<APIResponse<CarInfo>>(
        `/Car/${id}`
      );
    },
    queryKey: ["car-info"],
  });

  const carInfo = carInfoQuery.data?.data.data;

  return { carInfo, carInfoQuery };
}