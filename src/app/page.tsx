import Login from "./page/cadastro/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center ">
      <div className="w-full h-[90px] bg-black flex justify-center items-center" >
        <h1 className="text-white text-3xl font-bold">Itambe </h1>
        <img src="/lanche4.png" alt="lanches" className=" h-[90px]" />
        <h2 className="text-white text-3xl font-bold">Lanches</h2>

      </div>

     
      <Login/>

      
    </div>
  );
}
