import { Link, useNavigate } from 'react-router-dom';
import Hamburger from '/hamburger-icon.png';
import Close from '/close (1).png';
import useUserQuery from '../../hooks/useUserQuery';
import { useQueryClient } from '@tanstack/react-query';
import cookies from 'js-cookie';

export default function Header() {
  const { userData } = useUserQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    cookies.remove('token');
    queryClient.removeQueries({ queryKey: ['customer'] });
    navigate('/auth/login');
  }

  const openSideBar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.remove('-translate-x-full');
  }

  const closeSideBar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.add('-translate-x-full');
  }

  return (
    <header className="fixed top-0 left-0 right-0 min-h-20 max-h-32 bg-primary-light flex justify-between px-5 items-center">
      <div className="flex gap-3 items-center">
        <button onClick={openSideBar}><img className="w-5 aspect-square" src={Hamburger} alt="" /></button>
        <h1 className="text-[clamp(1.5rem,3vw,2rem)]">RentCar</h1>
        <div className='sidebar fixed top-0 left-0 min-w-40 min-h-screen transform -translate-x-full transition-transform duration-300 ease-in-out bg-primary text-white p-10'>
          <div className='flex flex-col gap-7'>
            <button onClick={closeSideBar} className='absolute top-5 right-5'><img className="w-5 aspect-square" src={Close} alt="" /></button>
            <Link className='text-lg pt-10 hover:underline' to="">Home</Link>
            <Link className='text-lg hover:underline' to="">Riwayat Penyewaan</Link>
            <Link className='text-lg hover:underline' to="">Kontak Kami</Link>
          </div>
        </div>
      </div>
      <div className="flex gap-3 text-white items-center">
        {userData ? (
          <>
            <div>Hi, {userData.name}</div>
            <button onClick={logout} className="bg-primary-button px-5 py-1 text-[clamp(0.8rem,1.5vw,1rem)] max-sm:px-3">Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="bg-primary-button px-5 py-1 text-[clamp(0.8rem,1.5vw,1rem)] max-sm:px-3">Login</Link>
            <Link to="/auth/register" className='bg-primary-button px-5 py-1 text-[clamp(0.8rem,1.5vw,1rem)] max-sm:px-3'>Registrasi</Link>
          </>
        )}
      </div>
    </header>
  );
}
