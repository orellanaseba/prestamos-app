import Image from "next/image";
import { Accordeon, Card } from "./components/Card";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center mt-2">
        
      <h1 className="text-2xl font-semibold text-center">¡Solicita un préstamo en <span className="text-[#2a37d8]">cuestión de segundos!</span></h1>
      <p className="text-base text-black font-medium">Rápido, fácil y sin complicaciones.</p>
      <Image className="drop-shadow-lg"
      src="/dollar.png"
      width={512}
      height={512}
      priority={true}
      alt="Icono de transacción entre dos personas."
      />
      <div className="flex justify-center flex-col items-center p-1 w-full text-xs">
        <div className="w-full flex justify-around items-start p-1 font-semibold">
          <span className="w-20">Acreditación instantanea.</span>
          <span className="w-20">Acceso al dinero que necesitás.</span>
          <span className="w-20">Préstamos flexibles y seguros.</span>
        </div>
        <button className="text-sm border-[1px] border-zinc-300 text-white bg-[#3648f5] hover:bg-[#2a37d8] font-semibold p-2 flex items-center justify-center relative rounded-md w-44 mt-2">
        Comenzar
        <Image
        className="w-6 absolute right-3"
        src="/icons/arrow.png"
        width={96}
        height={96}
        alt="arrow right icon"
        />
      </button>
      </div>
      </section>

      <section className="mt-5 flex gap-5 flex-col items-center justify-center w-full min-h-72">
        <h2 className="text-xl w-72 text-center font-medium">Comenzar a usar <span  className="text-[#2a37d8] font-bold">Prestamón</span> es muy sencillo </h2>
        <Card title="Crear un usuario" description="Crea un usuario y comienza a utilizar la aplicación." />
        <Card title="Solicitar un préstamo" description="Verificar la disponibilidad del prestamista." />
        <Card title="Esperar la confirmación" description="Si todo sale bien, el dinero se acreditará en las próximas horas." />
        <Card title="Acreditación del dinero" description="¡Podrás usar el dinero como más te guste!" />
      </section>

      <section className="flex gap-5 mt-5 flex-col justify-start items-center w-full min-h-72">
        <h2 className="text-xl text-center font-medium">FAQ</h2>
        <Accordeon title="¿Cuánto tiempo tarda en acreditarse el dinero?" description="Entre 2 a 4 horas dependiendo la demanda." />
        <Accordeon title="¿Cuáles son los requisitos para solicitar un préstamo?" description="Debes tener una cuenta creada y además tener una cuenta de MercadoPago" />
      </section>
    </main>
  );
}
