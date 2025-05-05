import Nav from "./Nav"
import Footer from "./Footer"
import check from '../assets/icons/check.svg'
import { Link } from "react-router-dom";

const benefits = [
    "Find something to watch on your subscribed streaming services",
    "Log the movies and TV shows you have watched",
    "Keep track of your favourite movies and TV shows and get recommendations from them",
    "Build and maintain a personal watchlist",
    "Build custom mixed lists (movies and TV)",
    "Take part in movie and TV discussions",
    "Contribute to, and improve the information in our database"
  ];  

const register = () => {
  return (
    <div>
        <Nav searchShow={false}/>
        <div className='flex px-10 py-5'>
            <div className='w-70 border-gray-300 border rounded-lg shadow-lg'>
                <div className='bg-cyan-500 px-4 py-5 w-full text-white rounded-t-md font-semibold text-lg'>
                    <p className='max-w-40 leading-5'>Benefits of being a member</p>
                </div>
                <div className='py-3'>
                <ul className="px-4 flex flex-col gap-2">
                    {benefits.map((benefit) => (
                        <li className="flex gap-2">
                        <img src={check} className="h-5 w-5 mt-1" />
                        <p className="text-base leading-6">{benefit}</p>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
            <div className='px-10 flex flex-col gap-3 py-3'>
            <h1 className='text-2xl font-bold'>Sign up for an account</h1>
            <p>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to to continue.</p>
                <div className='flex flex-col gap-1 mt-4'>
                <label for = 'username'>Username</label>
                <input type='text' className='px-2 rounded-lg h-10 w-full border border-gray-300'/>
                </div>
                <div className='flex flex-col gap-1'>
                <label for = 'password'>Password (4 characters minimum)</label>
                <input type='password' className='px-2 rounded-lg h-10 w-full border border-gray-300'/>
                </div>
                <div className='flex flex-col gap-1'>
                <label>Password Confirm</label>
                <input type='password' className='px-2 rounded-lg h-10 w-full border border-gray-300'/>
                </div>
                <div className='flex flex-col gap-1'>
                <label for = 'email'>Email</label>
                <input type='text' className='px-2 rounded-lg h-10 w-full border border-gray-300'/>
                </div>
                <p className='mt-2'>By clicking the "Sign up" button below, I certify that I have read and agree to the TMDB terms of use and privacy policy.</p>
                <div className='flex gap-5 mt-4 items-center'>
                <div className='bg-gray-200 rounded-md py-2 px-3'><button>Sign Up</button></div>
                <Link to='/'>
                <button className='text-sky-400'>Cancel</button>
                </Link>
            </div>
            <Link to='/login'>
                <button className='text-sky-600 hover:underline'>Already have an account?</button>
            </Link>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default register