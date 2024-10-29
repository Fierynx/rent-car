import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthMutation from "../hooks/useAuthMutation";
import { useEffect, useState } from "react";
import cookies from "js-cookie";

type RegisterFields = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  address: string;
  driver_license_number: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { registerMutation } = useAuthMutation();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFields>();
  const [hasErrored, setHasErrored] = useState(false);

  const onSubmit: SubmitHandler<RegisterFields> = (value) => {
    setHasErrored(false);
    registerMutation.mutate(value, {
      onSuccess: () => {
        navigate("/auth/login");
      },
      onError: () => {
        setHasErrored(true);
      },
    });
  };

  useEffect(() => { 
    if(cookies.get('token')){
      navigate('/home');
    }
  },[navigate]);

  return (
    <div className="max-w-sm mx-auto p-8 bg-purple-100 rounded-lg shadow-lg mt-10 md:mt-20 lg:mt-24">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
        Registrasi ke RentCar
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-primary">Email</label>
          <input
            type="email"
            {...register("email", { 
              required: "Email wajib diisi",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Format email tidak valid"
              }
            })}
            placeholder="Masukkan email Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary">Password</label>
          <input
            type="password"
            {...register("password", { 
              required: "Password wajib diisi", 
              minLength: { value: 8, message: "Password minimal 8 karakter" }
            })}
            placeholder="Masukkan password Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary">Konfirmasi Password</label>
          <input
            type="password"
            {...register("password_confirmation", {
              required: "Konfirmasi password wajib diisi",
              validate: (value) => value === watch('password') || "Password tidak cocok"
            })}
            placeholder="Masukkan ulang password Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary">Nama</label>
          <input
            type="text"
            {...register("name", { required: "Nama wajib diisi" })}
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary">Nomor Telepon</label>
          <input
            type="tel"
            {...register("phone_number", { required: "Nomor telepon wajib diisi" })}
            placeholder="Masukkan nomor telepon Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary">Alamat</label>
          <input
            type="text"
            {...register("address", { required: "Alamat wajib diisi" })}
            placeholder="Masukkan alamat Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary">Nomor SIM</label>
          <input
            type="text"
            {...register("driver_license_number", { required: "Nomor SIM wajib diisi" })}
            placeholder="Masukkan nomor SIM Anda"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.driver_license_number && (
            <p className="text-red-500 text-sm mt-1">{errors.driver_license_number.message}</p>
          )}
        </div>

        {hasErrored && (
          <p className="text-red-500 text-center text-sm mt-2">
            Terjadi kesalahan saat registrasi.
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-primary-button text-white font-semibold rounded-md hover:opacity-80"
        >
          Registrasi
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-primary">
        Sudah punya akun? <Link to="/auth/login" className="text-primary hover:underline">Login disini</Link>
      </p>
    </div>
  );
}
