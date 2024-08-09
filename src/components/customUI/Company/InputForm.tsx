import { Input } from '@/components/ui/input';
import React from 'react';
interface InputType{
    type : string 
    placeholder : string
    name : string
    value : string | number 
    onChange : any
    required : boolean
    minLength?:number
    maxLength?:number
    min?:number
}

function InputCF({type,placeholder,name,value,onChange,required, maxLength, minLength, min }: InputType) {
  return (
    <div>
      <div className=' border-red-500 my-1 text-[13px]'>
        <label htmlFor={name}
        className='text-black font-[500]  border-gray-950'>{placeholder} </label>
        <Input
          className="rounded-lg placeholder-gray-500 h-8  bg-white"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
        />
      </div>
    </div>
  );
}


export default InputCF;