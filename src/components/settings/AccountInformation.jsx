import React from 'react'
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import img1 from "./AccountInfo1.jpg"
import Input1 from '../form/Input1';
import { IoCloudDownloadOutline } from "react-icons/io5";

function AccountInformation() {

    return (
        <div className='mx-2 md:mx-auto mt-10 lg:pl-48 pt-7 md:pt-12 lg:pt-16 max-w-[800px] bg-white  rounded-md my-4'>
            <div className='bg-[#05f] align-left rounded-md'>
                <div className='flex p-7 text-white '>
                    <Link to="settings"><GoArrowLeft className='inline-block pb-1' size={30}/></Link>
                    <h4 className='pl-4 text-xl '>Account Details</h4>
                </div>
            </div>
            <div className='flex flex-col items-center mt-2 sm:mt-10'>
                <img className='w-24 h-24 rounded-md center m-2' src={img1} alt="img" srcset="" />
                <h2 className='text-2xl m-1 font-bold'>Surfiya Zakir</h2>
                <h4 className='text-[#ADB5BD]'>Brooklyn</h4>
            </div>
            <div className='sm:p-7'>
                <form action="">
                    <div className='grid gap-8 m-4 lg:grid-cols-2'>
                        <Input1 inputLabel="First Name" inputType="text" />
                        <Input1 inputLabel="Last Name" inputType="text" />
                    </div>
                    <div className='grid gap-8 m-4 lg:grid-cols-2'>
                        <Input1 inputLabel="Email" inputType="email" />
                        <Input1 inputLabel="Phone" inputType="text" />
                    </div>
                    <div className='grid gap-8 m-4 lg:grid-cols-1'>
                        <Input1 inputLabel="Country" inputType="text" />
                    </div>
                    <div className='grid gap-8 m-4 lg:grid-cols-1'>
                        <Input1 inputLabel="Address" inputType="text" />
                    </div>
                    <div className='grid gap-8 m-4 lg:grid-cols-2'>
                        <Input1 inputLabel="Town/City" inputType="text" />
                        <Input1 inputLabel="Postcode" inputType="text" />
                    </div>
                    <div className='grid gap-8 m-4 lg:grid-cols-1 mt-8 '>
                        <div className=''>
                            <div className='text-start text-[#515184] font-semibold relative h-[140px] w-full'>
                                <input id="file" type="file" className='w-full border-2 border-dashed border-slate-300 rounded-md focus:outline-none focus:border-[#05f] text-[15px] font-thin h-full p-5'/>
                                <label htmlFor="file" className='absolute left-1 top-1 bg-white  z-10 h-[95%] w-[98%] text-center pt-7 cursor-pointer' >
                                    <IoCloudDownloadOutline className='m-auto ' size={50}/>
                                    <p>Drag and Drop or click to replace </p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-8 m-4 lg:grid-cols-1'>
                        <div className=''>
                        <div className='text-start text-[#515184]'>
                                <label htmlFor="" className='font-bold'>Description</label>
                                <textarea className='w-full p-3 border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#05f] text-[15px] font-thin min-h-28 bg-[#f5f5f5] max-h-28' placeholder='write your message....' />
                            </div>  
                        </div>
                    </div>
                    <div className='grid gap-8 m-4 w-44'>
                        <button className='bg-[#05f] text-white py-4 font-bold rounded-md'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>

        
    )
}

export default AccountInformation