import { Input } from '@/components/ui/input';
import React from 'react';
interface InputType{
    type : string 
    placeholder : string
    name : string
    value : string | number 
    onChange : any
    required : boolean
}

function InputCF({type,placeholder,name,value,onChange,required }: InputType) {
  return (
    <div>
      <div className=' border-red-500 my-1'>
        <label htmlFor={name}
        className='text-black font-[500]  border-gray-950'>{placeholder} </label>
        <Input
          className="rounded-lg placeholder-gray-500  bg-white"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          
        />
      </div>
    </div>
  );
}


export default InputCF;