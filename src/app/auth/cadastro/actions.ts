"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/app/lib/supabase-server";

// Define a forma do objeto de estado que a ação do formulário retornará
export type State = {
  errors?: {
    form?: string[];
    senha?: string[];
    confirmarSenha?: string[];
  };
  message?: string | null;
};

export async function handleRegister(prevState: State, formData: FormData): Promise<State> {
  const supabase = createSupabaseServerClient();

  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const telefone = formData.get("telefone") as string;
  const cidade = formData.get("cidade") as string;
  const bairro = formData.get("bairro") as string;
  const rua = formData.get("rua") as string;
  const numero = formData.get("numero") as string;
  const senha = (formData.get("senha") as string)?.trim();
  const confirmarSenha = (formData.get("confirmarSenha") as string)?.trim();

  // Validação
  if (!nome || !email || !telefone || !cidade || !bairro || !rua || !numero || !senha || !confirmarSenha) {
    return { errors: { form: ["Preencha todos os campos."] } };
  }

  if (senha.length < 6) {
    return { errors: { senha: ["A senha deve ter no mínimo 6 caracteres."] } };
  }

  if (senha !== confirmarSenha) {
    return { errors: { confirmarSenha: ["As senhas não conferem."] } };
  }

  // Cria o usuário
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password: senha,
  });

  if (signUpError) {
    return { errors: { form: [signUpError.message] } };
  }

  if (!signUpData.user) {
    return { errors: { form: ["Ocorreu um erro inesperado ao criar o usuário."] } };
  }

  const userId = signUpData.user.id;

  const { error: insertError } = await supabase.from("restaurants").insert([{ id: userId, name: nome, email, phone: telefone, city: cidade, neighborhood: bairro, street: rua, number: numero }]);

  if (insertError) {
    console.error("Profile Insert Error:", insertError);
    return { errors: { form: [insertError.message] } };
  }

  // Em caso de sucesso, redireciona para a página de login
  redirect('/auth/login?message=Cadastro realizado com sucesso! Faça o login.');
}