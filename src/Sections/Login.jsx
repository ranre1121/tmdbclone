import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Login = () => {
  return (
    <div>
        <Nav searchShow={false}/>
        <div className='px-10 flex flex-col gap-3 py-10'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p>In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations
            you will need to login to your account. If you do not have an account, registering for an
            account is free and simple.
            <span> </span> 
            <Link to='/signup'>
            <span className='text-sky-400 hover:underline cursor-pointer'>Click here</span></Link>
            <span> </span> 
            to get started.</p>
            <p>If you signed up but didn't get your verification email, 
            <span> </span> 
            <span className='text-sky-400 hover:underline cursor-pointer'>click here</span>
            <span> </span>to have it resent.</p>
            <div className='flex flex-col gap-1 mt-4'>
            <label for = 'username'>Username</label>
            <input type='text' className='px-2 rounded-lg h-10 w-full border border-gray-300'/>
            </div>
            <div className='flex flex-col gap-1'>
            <label for = 'password'>Password</label>
            <input type='password' className='px-2 rounded-lg h-10 w-full border border-gray-300'/>
            </div>
            <div className='flex gap-5 mt-4'>
              <div className='bg-gray-200 rounded-md py-2 px-3'><button>Login</button></div>
              <button className='text-sky-400'>Reset password</button>
            </div>
            
        </div>
        <Footer />
    </div>
  )
}

export default Login