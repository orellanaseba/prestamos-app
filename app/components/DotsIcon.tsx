import Image from "next/image"

export const DotsIcon = ({ setId } : { setId: () => void }) => {

    return <Image
    onClick={setId}
    className="absolute right-2 cursor-pointer"
    src="/icons/dots.png"
    width={20}
    height={20}
    alt="dots options icon"
    />
}