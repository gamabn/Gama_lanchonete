"use client"
import { RegisterOptions, UseFormRegister } from "react-hook-form"
interface InputProps{
    type: string;
    name: string;
    placeholder: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions

}
export function Input({placeholder, register, type, name, error, rules}: InputProps){
    return(
        <>
        <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
        className="border p-2 rounded-xl"
        />
        {error && <p className="text-red-500 my-1 text-sm">{error}</p>}
        </>
        
    )
}