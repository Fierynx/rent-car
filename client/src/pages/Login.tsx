import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthMutation from "../hooks/useAuthMutation";
import { useEffect, useState } from "react";
import cookies from "js-cookie";

type LoginFields = {
  username_or_email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { loginMutation } = useAuthMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>();
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => { 
    if(cookies.get('token')){
      navigate('/home');
    }
  },[navigate]);

  const onSubmit: SubmitHandler<LoginFields> = (value) => {
    setHasErrored(false);
    loginMutation.mutate(value, {
      onSuccess: () => {
        navigate("/home");
      },
      onError: () => {
        setHasErrored(true);
      },
    });
  };

  return (
    <div className="max-w-sm mx-auto p-8 bg-purple-100 rounded-lg shadow-lg md:mt-20 lg:mt-24">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
        Login ke RentCar
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-primary">Username or Email</label>
          <input
            type="text"
            {...register("username_or_email", { required: "Username atau Email wajib diisi" })}
            placeholder="Masukkan username atau email Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.username_or_email && (
            <p className="text-red-500 text-sm mt-1">{errors.username_or_email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password wajib diisi" })}
            placeholder="Masukkan password Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {hasErrored && (
          <p className="text-red-500 text-center text-sm mt-2">
            Kredensial yang anda berikan invalid.
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-primary-button text-white font-semibold rounded-md hover:opacity-80"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-primary">
        Belum punya akun? <Link to="/auth/register" className="text-primary hover:underline">Registrasi disini</Link>
      </p>
    </div>
  );
}
