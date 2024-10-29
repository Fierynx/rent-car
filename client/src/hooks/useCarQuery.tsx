import { useQuery } from "@tanstack/react-query";
import { APIResponse, Car } from "../lib/types";
import { API } from "../service/API";
import { CarFilter } from "../components/home/FilterSort";

export default function useCarQuery(filters?: CarFilter){

  //gabungin filter" yg diinginkan
  const serializeFilterSort = (filters?: CarFilter) => {
    if(!filters) return "";
    let serializedFilter = "?";
  
    const filterEntries = Object.entries(filters);
    filterEntries.forEach(([key, value], index) => {
      if(!value || value.length === 0) return;
  
      if(Array.isArray(value)) {
        value.forEach((val, i) => {
          serializedFilter += `${key}=${val}`;
          if (i < value.length - 1) {
            serializedFilter += "&";
          }
        });
      }else {
        serializedFilter += `${key}=${value}`;
      }
  
      if(index < filterEntries.length - 1) {
        serializedFilter += "&";
      }
    });
  
    return serializedFilter === "?" ? "" : serializedFilter;
  };

  //problem, kerefresh setiap kali ngehit filter
  console.log(serializeFilterSort(filters));


  const carQuery = useQuery({
    queryFn() {
      return API.get<APIResponse<Car[]>>(
        `/Car${serializeFilterSort(filters)}`
      );
    },
    queryKey: ["cars", filters],
  });

  const carData = carQuery.data?.data.data || [];

  return { carQuery, carData };
}