import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full'>
            <ul className="logo flex gap-8 p-3 text-white bg-slate-600 justify-between shadow-2xl">
                <div className=''>
                    <li className=' text-xl font-bold font-serif'>Todo-X</li>
                </div>
                <div className="con flex gap-8">
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>About</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Contact Us</li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar
