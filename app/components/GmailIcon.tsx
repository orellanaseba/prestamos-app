import Image from "next/image"

export const GmailIcon = () => {
    return (
        <a href="#" target="_blank">
            <Image className="w-7 md:w-14" src="/icons/gmail.svg" width={48} height={48} alt="gmail icon" />
        </a>
)
}