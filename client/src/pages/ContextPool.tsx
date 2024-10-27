import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function ContextPool(){
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet/>
    </QueryClientProvider>
  );
}