import Image from "next/image"

export const ArrowIcon = () => {
    return <Image
    className="w-6 absolute right-3"
    src="/icons/arrow.png"
    width={96}
    height={96}
    alt="arrow right icon"
    />
}