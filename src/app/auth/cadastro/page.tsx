"use client";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { Input } from "@/app/components/Input";
import { useRouter } from "next/navigation";


const schema = z.object({
  name: z.string().min(1, "O nome da Lanchonete e obrigatorio"),
  phone: z.string().min(11, "O telefone deve ter pelo menos 11 dígitos").max(15, "Telefone muito longo"),
  cidade: z.string().min(1, "A cidade e obrigatoria"),
  bairro: z.string().min(1, "O bairro e obrigatorio"),
  rua: z.string().min(1, "A rua e obrigatoria"),
  numero: z.string().min(1, "O numero e obrigatorio"),
  email: z.string().email("Digite um email válido").min(1, "O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
  confirmPassword: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // Campo onde o erro será exibido


})

type FormData = z.infer<typeof schema>


export default function Cadastro(){
  const router = useRouter();
  const {register, handleSubmit, formState: { errors } } =  useForm<FormData>({
       resolver: zodResolver(schema)
  });

async  function handleRegister(data: FormData){
    console.log('Dados da lanchonete',data)
   const { data: signUpData, error: signUpError } = await  supabase.auth.signUp({
      email: data.email,
      password: data.password
    })

     if (signUpError) {
    console.error("Erro ao criar usuário:", signUpError.message);
    alert("Erro ao criar usuário: " + signUpError.message);
    return;
  }

  const userId = signUpData.user?.id;
  if (!userId) {
    alert("Erro ao obter ID do usuário.");
    return;
  }

   const { error: insertError } = await supabase.from("restaurants").insert({
    id: userId,
    name: data.name,
    phone: data.phone,
    city: data.cidade,
    neighborhood: data.bairro,
    street: data.rua,
    number: data.numero,
    email: data.email,
    created_at: new Date().toISOString(),
  });

   if (insertError) {
    console.error("Erro ao salvar restaurante:", insertError.message);
    alert("Erro ao salvar restaurante: " + insertError.message);
    return;
  }

  alert("Cadastro realizado com sucesso! Verifique seu email para confirmar.");
  router.push("/auth/login");
}
    
  

  return(
     <div className="w-full max-w-md m-auto ">
       <h1 className="text-3xl font-bold m-6 text-center text-black">Cadastro</h1>

        <div className="flex flex-col gap-4 shadow-xl bg-white shadow-black mb-4 rounded-xl p-5">

         <form onSubmit={handleSubmit(handleRegister)}>      
                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Nome da Lanchonete</label>
                   <Input 
                   placeholder={"Digite o nome da Lanchonete"}
                   type="text"
                   name="name"
                   register={register}
                   error={errors.name?.message}
                   rules={{required: true}}
                   />
                </div>

                 <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input 
                    placeholder={"Digite o Telefone"}
                    type="text"
                    name="phone"
                    register={register}
                    error={errors.phone?.message}
                    rules={{required: true}}
                   />
                </div>

             
                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Cidade</label>
                    <Input 
                   placeholder={"Digite o nome da Cidade"}
                   type="text"
                   name="cidade"
                   register={register}
                   error={errors.cidade?.message}
                   rules={{required: true}}
                   />
                </div>

              
                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Bairro</label>
                   <Input 
                   placeholder={"Digite o nome do Bairro"}
                   type="text"
                   name="bairro"
                   register={register}
                   error={errors.bairro?.message}
                   rules={{required: true}}
                   />
                </div>

              
                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">rua</label>
                   <Input 
                   placeholder={"Digite o nome da rua"}
                   type="text"
                   name="rua"
                   register={register}
                   error={errors.rua?.message}
                   rules={{required: true}}
                   />
                </div>

               
                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Numero</label>
                   <Input 
                   placeholder={"Digite o numero"}
                   type="text"
                   name="numero"
                   register={register}
                   error={errors.numero?.message}
                   rules={{required: true}}
                   /> 
                </div>

                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Email</label>
                  <Input 
                   placeholder={"Digite o email"}
                   type="email"
                   name="email"
                   register={register}
                   error={errors.email?.message}
                   rules={{required: true}}
                   />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Senha</label>
                   <Input
                   placeholder={"Digite a senha"}
                   type="password"
                   name="password"
                   register={register}
                   error={errors.password?.message}
                   rules={{required: true}}
                   /> 
                </div> 

                <div className="flex flex-col gap-2">
                    <label className="mb-1 text-lg font-medium">Confirmar Senha</label>
                    <Input
                   placeholder={"Confirme a senha"}
                   type="password"
                   name="confirmPassword"
                   register={register}
                   error={errors.confirmPassword?.message}
                   rules={{required: true}}
                   /> 
                </div> 

                 <div className="flex flex-col gap-2 mt-4">
                        <button
                        type="submit"
                        
                        className="bg-blue-500 p-2 h-11 rounded-xl text-white font-bold"
                        >
                            Entrar</button>
                    </div>

                    <Link href="/auth/login">
                       <p className="text-center text-blue-800 font-light text-sm mt-4">Não tem cadastro? Cadastre-se</p>
                    </Link>
                 
         </form>
         </div>
    </div>
  )
}