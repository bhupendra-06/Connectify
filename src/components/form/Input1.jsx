import React from 'react'

function Input1({inputLabel, inputType}) {
    return (
    <div className=''>
        <div className='text-start text-[#515184] font-semibold '>
                <label htmlFor="" className=''>{inputLabel}</label>
                <input type={inputType} className='w-full p-3 border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#05f] text-[15px] font-thin'/>
        </div>
    </div>
    )
}

export default Input1