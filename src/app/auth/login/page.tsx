"use client"
import { useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin() {
    setError(null) // Limpa erros anteriores
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Erro: ' + error.message)
    } else {
      // Redireciona para a página principal ou dashboard após o login
      router.push('/dashboard')
    }
  }

  return (
     <div className="w-full max-w-md m-auto">
            <h1 className="text-3xl font-bold m-6 text-center text-black">Login</h1>
            <div className="flex flex-col gap-4 shadow-xl bg-white shadow-black  rounded-xl p-5 max-sm:shadow-none">
                <div className="flex flex-col gap-2">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="border p-2 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Senha</label>
                    <input
                      type="text"
                      className="border p-2 rounded-xl"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                </div>     
                {error && <p className="text-red-500 text-sm">{error}</p>}
                 <div className="flex flex-col gap-2">
                        <button
                        type="button"
                        onClick={handleLogin}
                        className="bg-blue-500 p-2 h-11 rounded-xl text-white font-bold"
                        >
                            Entrar</button>
                    </div>
                    <Link href="/auth/cadastro">
                       <p className="text-center text-blue-800 font-light text-sm">Não tem cadastro? Cadastre-se</p>
                    </Link>
              </div>
            </div>
  )
}
