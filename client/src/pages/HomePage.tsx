import useCarQuery from "../hooks/useCarQuery";

export default function HomePage(){

  const { carQuery, carData } = useCarQuery();

  return (
    carQuery.isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>Home Page</h1>
        <div className="grid grid-cols-10">
        {carData.map((car) => (
          <ul key={car.Car_id}>
            <li>{car.model}</li>
            <li>{car.name}</li>
            <li>{car.price_per_day}</li>
          </ul>
        ))}
        </div>
      </div>
    )
  );
}