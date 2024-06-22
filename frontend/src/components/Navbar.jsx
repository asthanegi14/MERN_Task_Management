import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-gray-800 shadow-sm items-center text-gray-50'>
        <h2 className='cursor-pointer uppercase font-medium'>
          <Link to="/"> Task Manager </Link>
        </h2>
        <ul className='hidden md:flex gap-4 uppercase font-medium'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-500 hover:bg-blue-600 font-medium rounded-md">
                <Link to='/tasks/add' className='block w-full h-full px-4 py-2'>Add New task </Link>
              </li>
              <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 hover:text-black transition rounded-sm' onClick={handleLogoutClick}>Log out</li>
            </>
          ) : (
            <li className='py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition rounded-sm'><Link to="/login">Login</Link></li>
          )}
        </ul>
        <span className='md:hidden cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-bars"></i></span>

        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition ${(isNavbarOpen === true) ? 'translate-x-0' : 'translate-x-full'} bg-gray-800 shadow-md w-screen sm:w-9/12 h-screen`}>
          <div className='flex'>
            <span className='m-4 ml-auto cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-xmark"></i></span>
          </div>
          <ul className='flex flex-col gap-4 uppercase font-medium text-center justify-center items-center'>
            {authState.isLoggedIn ? (
              <>
                <li className="font-medium transition">
                  <Link to='/tasks/add' className='bg-blue-500 text-white hover:bg-blue-600 block w-fit py-2 px-3 rounded'> Add New task </Link>
                </li>
                <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 hover:text-black transition rounded-sm' onClick={handleLogoutClick}>Log out</li>
              </>
            ) : (
              <li className='py-2 px-3 cursor-pointer transition rounded-sm'><Link to="/login" className='hover:text-primary hover:scale-110'>Login</Link></li>
            )}
          </ul>
        </div>
      </header>
    </>
  )
}

export default Navbar