import React from 'react'
import { LuHome } from "react-icons/lu";
import { PiCubeBold } from "react-icons/pi";
import { FiLayout, FiLayers } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';


function MobileFooter() {
    return (
    <div className='flex justify-between w-full bg-gradient-to-r from-[#05f] to-[#09f] h-14 absolute  bottom-0 text-white lg:hidden'>
        <NavLink to="/" className="cursor-pointer px-6 py-4" ><LuHome className="font-bold" size={25} /></NavLink>
        <NavLink to="/login" className="cursor-pointer px-6 py-4" ><PiCubeBold className="font-bold" size={25} /></NavLink>
        <NavLink to="/signup" className="cursor-pointer px-6 py-4" ><FiLayout className="font-bold" size={25} /></NavLink>
        <NavLink to="/" className="cursor-pointer px-6 py-4" ><FiLayers className="font-bold" size={25} /></NavLink>
        <NavLink to="/" className="cursor-pointer px-6 py-4" ><MdAccountCircle className="font-bold " size={25} /></NavLink>
    </div>
    )
}

export default MobileFooter