import React from 'react'
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { PiGlobeSimpleBold } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { PiCaretRightThin } from "react-icons/pi";
import { RiAccountCircleLine } from "react-icons/ri";

function DefaultSettings() {
    return (
        <div className='mx-auto mt-10 lg:pl-48 pt-5 md:pt-12 lg:pt-16 max-w-[900px] rounded overflow-hidden bg-white'>
            <div className='align-left mt-3'>
                <div className='flex items-center px-7'>
                    <a href="http://"><GoArrowLeft className='inline-block m-1' size={30}/></a>
                    <h1 className='pl-4 text-xl sm:text-3xl font-bold'>Settings</h1>
                </div>
            </div>
            <div className='w-full m-auto mb-3 px-7'>
                <div>
                    <div className='text-[#ADB5BD] text-[13px] p-3 font-bold text-start ml-2'>General</div>
                    <div className='ml-4 flex flex-col gap-3 pb-4' >
                        <Link to="/account-info" className='flex relative'>
                            <div className='inline-block p-[10px]  rounded-full bg-gradient-to-r from-[#0575e6] to-[#021b79] text-white font-bold'><LuHome className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Account Information</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </Link>
                        <div className='h-px w-full bg-slate-300'></div>
                        <div className='flex relative'>
                            <div className='inline-block  p-[10px] rounded-full  bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white font-bold'><GrLocation className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Saved Address</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </div>
                        <div className='h-px w-full bg-slate-300'></div>
                        <div className='flex relative'>
                            <div className='inline-block  p-[10px]  rounded-full bg-gradient-to-r from-[#e44d26] to-[#F16550] text-white font-bold'><PiGlobeSimpleBold className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Social Account</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-[#ADB5BD] text-[13px] p-3 font-bold text-start ml-2'>Account</div>
                    <div className='ml-4 flex flex-col gap-3 pb-4'>
                        <div className='flex relative'>
                            <div className='inline-block p-[10px]  rounded-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white font-bold'><RiAccountCircleLine  className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Account Details</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </div>
                        <div className='h-px w-full bg-slate-300'></div>
                        <div className='flex relative'>
                            <div className='inline-block  p-[10px] rounded-full bg-gradient-to-r from-[#05f] to-[#09f] text-white font-bold'><RiLockPasswordLine className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Passwords</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-[#ADB5BD] text-[13px] p-3 font-bold text-start ml-2'>Others</div>
                    <div className='ml-4 flex flex-col gap-3' >
                        <div className='flex relative'>
                            <div className='inline-block p-[10px]  rounded-full bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white font-bold'><FaRegBell className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Notification</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </div>
                        <div className='h-px w-full bg-slate-300'></div>
                        <div className='flex relative'>
                            <div className='inline-block  p-[10px] rounded-full bg-gradient-to-r from-[#0575e6] to-[#021b79] text-white font-bold'><FiHelpCircle className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Help</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </div>
                        <div className='h-px w-full bg-slate-300'></div>
                        <div className='flex mb-7 relative'>
                            <div className='inline-block  p-[10px]  rounded-full bg-gradient-to-r from-[#e44d26] to-[#F16550] text-white font-bold'><TbLogout className='font-bold' size={25}/></div>
                            <div className='p-2  font-bold hover:text-[#0055ff]'>Logout</div>
                            <PiCaretRightThin size={22} className='text-[#596067] absolute right-0 top-3'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default DefaultSettings;