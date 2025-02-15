import Image from "next/image"

export const WhatsappIcon = () => {
    return (
    <a href="https://wa.me/+5491164955967/?text=Quisiera%20más%20información%20sobre%20los%20préstamos.%20Gracias!" target="_blank">
        <Image className="w-7 md:w-10" src="/icons/whatsapp.svg" width={48} height={48} alt="Whatsapp icon" />
    </a>
        )
}