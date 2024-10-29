import { Car } from "../../lib/types";
import { formatToRupiah } from "../../lib/utils";

export default function Card({ car }: {car: Car}){
  return (
    <div key={car.Car_id} className="flex flex-col max-w-60 p-4 gap-5 bg-blue-200 text-center rounded-lg">
      <img className="w-[97.5%] h-32 object-cover rounded-lg" src={car.car_images && car.car_images.length > 0 ? car.car_images[0].image_link : undefined} alt="" />
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-[clamp(1rem,2vw,1.5rem)] font-bold">{car.name} AT {car.year}</h2>
        <p className="text-[clamp(0.75rem,1.25vw,1rem)] text-black font-extralight">Harga: {formatToRupiah(car.price_per_day)} / hari</p>
        <button className="text-white bg-orange-200 px-5 py-1 text-[clamp(0.75rem,1.25vw,1rem)]">Sewa Sekarang</button>
      </div>
    </div>
  );
}