import { useEffect, useState } from "react";
import Card from "../components/home/Card";
import FilterSort, { CarFilter } from "../components/home/FilterSort";
import useCarQuery from "../hooks/useCarQuery";
import Pagination from "../components/home/Pagination";

export default function HomePage() {
  const [filters, setFilters] = useState<CarFilter>({
    pickup_date: "",
    return_date: "",
    year: "",
    sort_by: "",
  });

  const { carData, carQuery } = useCarQuery(filters);

  const [currentPage, setCurrentPage] = useState(1); 
  const cardsPerPage = 6;

  useEffect(() => {
    if (carQuery.isSuccess && carData.length > 0) {
      setCurrentPage(1); 
    }
  }, [carData, carQuery.isSuccess]);

  //pagination
  const indexOfLastCar = currentPage * cardsPerPage;
  const indexOfFirstCar = indexOfLastCar - cardsPerPage;
  const currentCars = carData.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(carData.length / cardsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pt-32 flex flex-col items-center justify-center text-center">
      {carQuery.isFetching ? (
        <div className="pb-12">Loading...</div>
      ) : (
        <>
          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold">Selamat Datang di Rental Mobil Kami</h1>
          <FilterSort onSetFilter={setFilters}/>
          {carData.length === 0 ? (
              <div className="text-red-700 py-12">Tidak ada mobil yang available</div>
            ) : (
              <div className="mt-10 grid grid-cols-3 gap-10 max-md:gap-5 max-sm:gap-3 max-w-[97.5%]">
                  {currentCars.map((car) => (
                    <Card key={car.Car_id} car={car} />
                  ))}
              </div>
            )
          } 
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  );
}