import Hamburger from '/hamburger-icon.png';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 min-h-20 max-h-32 bg-primary-light flex justify-between px-5 items-center">
      <div className="flex gap-3 items-center">
        <img className="w-5 aspect-square" src={Hamburger} alt="" />
        <h1 className="text-[clamp(1.5rem,3vw,2rem)]">RentCar</h1>
      </div>
      <div className="flex gap-3 text-white">
        <button className="bg-primary-button px-5 py-1 text-[clamp(0.8rem,1.5vw,1rem)] max-sm:px-3">Login</button>
        <button className='bg-primary-button px-5 py-1 text-[clamp(0.8rem,1.5vw,1rem)] max-sm:px-3'>Registrasi</button>
      </div>
    </header>
  );
}