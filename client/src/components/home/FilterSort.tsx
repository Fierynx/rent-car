import { useState } from "react";

export type CarFilter = {
  pickup_date: string;
  return_date: string;
  year: string;
  sort_by: string;
};

type Props = {
  onSetFilter: (filters: CarFilter) => void;
};

const emptyFilters: CarFilter = {
  pickup_date: "",
  return_date: "",
  year: "",
  sort_by: "",
};

export default function FilterSort({ onSetFilter }: Props) {
  const [filters, setFilters] = useState<CarFilter>(emptyFilters);

  const handleSetFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value,
    };

    if(name === "sort_by"){
      onSetFilter({...newFilters, [name]: value});
    }
    setFilters(newFilters);
  };

  const handleSubmit = (e: React.FormEvent) => { //aksi klo pencet tombol "Cari", update state filter di HomePage
    e.preventDefault();
    onSetFilter(filters);
  };

  const handleReset = () => { //aksi klo pencet tombol "Reset", ngosongin smua
    setFilters(emptyFilters);
    onSetFilter(emptyFilters);
  };

  return (
    <>
      <div className="w-[97.5%] rounded-xl px-5 max-md:justify-center text-black bg-blue-200 h-28 mt-6 flex items-center">
        <div className="flex items-end gap-5 max-md:gap-2 max-sm:gap-1">
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-[clamp(0.75rem,1.5vw,1.25rem)]">Pickup Date:</label>
            <input
              name="pickup_date"
              type="date"
              value={filters.pickup_date}
              onChange={handleSetFilter}
              className="px-11 max-md:px-8 max-sm:px-2 py-2 rounded-lg text-[clamp(0.6rem,1.5vw,1rem)]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-[clamp(0.75rem,1.5vw,1.25rem)]">Return Date:</label>
            <input
              name="return_date"
              type="date"
              value={filters.return_date}
              onChange={handleSetFilter}
              className="px-11 max-md:px-8 max-sm:px-2 py-2 rounded-lg text-[clamp(0.6rem,1.5vw,1rem)]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-[clamp(0.75rem,1.5vw,1.25rem)]">Filter Tahun Pembuatan:</label>
            <select
              name="year"
              value={filters.year}
              onChange={handleSetFilter}
              className="px-11 max-md:px-8 max-sm:px-2 py-2 rounded-lg text-[clamp(0.6rem,1.5vw,1rem)]"
            >
              <option value="">Pilih Tahun</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
            </select>
          </div>
          <div className="flex gap-2 max-md:gap-[0.2rem]">
            <button
              onClick={handleSubmit}
              className="bg-primary-button text-white max-sm:px-2 max-md:px-3 max-md:py-1 px-5 py-2 self-end rounded-lg text-[clamp(0.6rem,1.5vw,1rem)]"
            >
              Cari
            </button>
            <button
              onClick={handleReset}
              className="bg-primary-button text-white max-sm:px-2 max-md:px-3 max-md:py-1 px-5 py-2 self-end rounded-lg text-[clamp(0.6rem,1.5vw,1rem)]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="text-black flex gap-3 self-end mt-8 px-20 max-md:px-0 max-md:self-center items-center">
        <label className="font-semibold text-[clamp(0.75rem,1.5vw,1.25rem)]">Sortir Berdasarkan</label>
        <select
          name="sort_by"
          value={filters.sort_by}
          onChange={handleSetFilter}
          className="px-3 py-2 rounded-lg text-[clamp(0.6rem,1.5vw,1rem)]"
        >
          <option value="">Pilih Sortir</option>
          <option value="price_asc">Harga Terendah - Tertinggi</option>
          <option value="price_desc">Harga Tertinggi - Terendah</option>
        </select>
      </div>
    </>
  );
}
