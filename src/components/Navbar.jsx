import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full'>
            <ul className="logo flex gap-6 p-3 text-white bg-slate-600 justify-between shadow-2xl">
                <div className=''>
                    <li className=' text-base font-bold font-serif'>Todo-X</li>
                </div>
                <div className="con flex gap-5">
                <li className='cursor-pointer hover:font-bold transition-all text-[14px]'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all text-[14px]'>About</li>
                <li className='cursor-pointer hover:font-bold transition-all text-[14px]'>Contact Us</li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar
