import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className='text-white h-[40vh] py-8 text-center'>
            <h1 className='text-2xl'> Welcome to the Task Management System</h1>
            <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
              <span className="bg-primary hover:scale-115 duration-300 px-8 py-2 rounded text-white transition-transform">Sign Up To use the App</span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className='text-3xl text-white  mt-8 mx-8 flex gap-2 justify-center items-center'>Welcome <p className='text-primary'>{authState.user.name}</p></h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  )
}

export default Home