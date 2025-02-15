import Image from "next/image";
import { Accordeon, Card } from "./components/Card";
import { WhatsappIcon } from "./components/WhatsappIcon";
import { GmailIcon } from "./components/GmailIcon";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center mt-2">
        <h1 className="text-2xl font-semibold text-center md:text-4xl md:w-full">¡Solicitá un préstamo en <span className="text-[#2a37d8]">cuestión de segundos!</span></h1>
        <p className="text-base text-black font-medium md:text-lg">Rápido, fácil y sin complicaciones.</p>
        <Image className="drop-shadow-lg"
        src="/dollar.png"
        width={512}
        height={512}
        priority={true}
        alt="Icono de transacción entre dos personas."
        />
        <div className="flex justify-center flex-col items-center p-1 w-full text-xs md:text-base">
          <div className="w-full flex justify-around items-center p-1 font-semibold bg-white shadow-md rounded-md">
            <span className="w-20 md:w-24">Acreditación instantanea.</span>
            <span className="w-20 md:w-24">Acceso al dinero que necesitás.</span>
            <span className="w-20 md:w-24">Préstamos flexibles y seguros.</span>
          </div>
        </div>
      </section>

      <section className="mt-10 flex gap-5 flex-col md:flex-row items-center justify-center w-full  min-h-72">
        <div className="flex flex-col items-center justify-center gap-2 md:w-96">
        <h2 className="text-xl md:text-3xl w-72 md:w-80 text-center font-medium">Comenzar a usar <span  className="text-[#2a37d8] font-bold">Prestamón</span> es muy sencillo </h2>
          <Card title="Solicitar un préstamo" description="Verifica la disponibilidad del prestamista." />
          <Card title="Esperar la confirmación" description="Si todo sale bien, el dinero se acreditará en las próximas horas." />
          <Card title="Acreditación del dinero" description="¡Podrás usar el dinero como más te guste!" />
        </div>
        <Image className="md:w-40" src="/simple.png" width={200} height={200} alt="mano chasqueando el dedo imágen" />
      </section>

      <section className="flex gap-5 mt-10 mb-32 flex-col md:flex-row-reverse justify-center items-center w-full min-h-72">
        <div className="flex flex-col items-center justify-center gap-2 md:w-96">
          <h2 className="text-xl md:text-2xl text-center font-medium">FAQ</h2>
          <Accordeon title="¿Cuánto tiempo tarda en acreditarse el dinero?" description="Entre 2 a 4 horas dependiendo la demanda." />
          <Accordeon title="¿Cuáles son los requisitos para solicitar un préstamo?" description="Solamente con tu DNI y además contar con una cuenta de MercadoPago." />
          <Accordeon title="¿En cuántas cuotas puedo hacerlo?" description="Las cuotas varían según el monto y la credibilidad del cliente." />
        </div>
        <Image src="/faq.png" width={200} height={200} alt="FAQ icon" />
      </section>
    </main>
  );
}
