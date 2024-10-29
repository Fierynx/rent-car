import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-primary-pink min-w-full min-h-screen pt-10">
      <Outlet />
    </div>
  );
}
