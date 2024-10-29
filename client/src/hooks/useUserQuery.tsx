
import { useQuery } from "@tanstack/react-query";
import cookies from "js-cookie";
import { API } from "../service/API";
import { APIResponse, Customer } from "../lib/types";

export default function useUserQuery() {
  const userQuery = useQuery({
    queryFn() {
      return API.get<APIResponse<Customer>>("/Auth/User");
    },
    queryKey: ["customer"],
    enabled: Boolean(cookies.get("token")),
  });

  const userData = userQuery.data?.data.data;

  return { userData, userQuery };
}
