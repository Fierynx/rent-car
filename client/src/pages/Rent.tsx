import { useParams } from "react-router-dom";
import useCarInfoQuery from "../hooks/useCarInfoQuery";
import { formatToRupiah } from "../lib/utils";

export default function Rent() {

  const { id } = useParams<{ id: string }>();
  const { carInfo } = useCarInfoQuery(id);
  return (
    <div className="flex justify-center">
      <div className="pt-32 w-96 text-primary flex flex-col items-center justify-center gap-10 pb-24">
        <h1 className="text-2xl font-semibold text-primary">Sewa Mobil</h1>
        <img className="w-full h-52 border-black"  src="" alt="" />
        <div className="w-full p-4 bg-white">
          <h1>Informasi mobil</h1>
          <div className="w-full grid grid-cols-2 grid-row-8">
            <h1>Tipe Mobil</h1>
            <p>{carInfo?.model}</p>
            <h1>Nama Mobil</h1>
            <p>{carInfo?.name}</p>
            <h1>Transmisi</h1>
            <p>{carInfo?.transmission}</p>
            <h1>Jumlah Penumpang</h1>
            <p>{carInfo?.number_of_car_seats} penumpang</p>
            <h1>Nama Penyewa</h1>
            <p>{carInfo?.customer} ({carInfo?.email})</p>
            <h1>Tanggal Sewa</h1>
            <p>{carInfo?.rental_date} sampai {carInfo?.return_date}</p>
            <h1>Harga Sewa</h1>
            <p>{formatToRupiah(carInfo?.price_per_day)} / hari</p>
            <h1>Total Harga Sewa</h1>
            <p>Rp {carInfo?.total_price}</p>
          </div>
        </div>
        <button>Sewa</button>
      </div>
    </div>
  );
} 