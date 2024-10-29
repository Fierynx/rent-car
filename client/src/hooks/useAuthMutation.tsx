import { useMutation } from "@tanstack/react-query";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { API } from "../service/API";
import { APIResponse } from "../lib/types";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  address: string;
  driver_license_number: string;
};

type LoginPayload = {
  username_or_email: string;
  password: string;
};

export default function useAuthMutation() {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn(data: RegisterPayload) {
      return API.post("/Auth/Register", data);
    },
  });

  const loginMutation = useMutation({
    mutationFn(data: LoginPayload) {
      return API.post<APIResponse<{Token: string}>>(
        "/Auth/Login",
        data
      );
    },
    onSuccess(data) {
      cookies.set("token", data.data.data.Token);
      navigate("/home");
    },
  });

  return {
    registerMutation,
    loginMutation,
  };
}
