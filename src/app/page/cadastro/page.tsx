import { useState } from "react";
import Link from "next/link";


export default function Login(){
    return(
        <div className="w-full max-w-md m-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Cadastre sua lanchonete</h1>
            <form className="flex flex-col gap-4 shadow-xl bg-white shadow-black  rounded-xl p-5">
                <div className="flex flex-col gap-2">
                    <label>Nome da lanchonete</label>
                    <input type="text" name="nome" className="border p-2 rounded-xl"/>

                </div>

                <div className="flex flex-col gap-2">
                    <label>Numero de telefone</label>
                    <input 
                    type="text"
                    className="border p-2 rounded-xl"
                    name="telefone"
                    />       
                </div>

                <div className="flex flex-col gap-2">
                    <label>Cidade</label>
                    <input 
                    type="text" 
                    className="border p-2 rounded-xl" 
                    name="cidade"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Bairro</label>
                    <input
                    className="border p-2 rounded-xl"
                    type="text"
                     name="bairro"
                     />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Rua</label>
                    <input
                    className="border p-2 rounded-xl"
                    type="text" 
                    name="rua"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label>Numero</label>
                    <input
                    className="border p-2 rounded-xl"
                    type="text" 
                    name="numero"
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                        className="bg-blue-500 p-2 h-11 rounded-xl text-white font-bold"
                        >
                            Cadastrar</button>
                    </div>
                    <Link href="#">
                       <h2 className="text-center text-blue-800 font-light text-sm">Não tem cadastro? Cadastre-se</h2>
                    </Link>
              </form>
            </div>
    )

}