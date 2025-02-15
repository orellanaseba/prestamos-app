import { ArrowIcon } from "./ArrowIcon";

export const Button = ({ text }: { text: string; }) => {
    return (
        <button className="text-sm border-[1px] border-zinc-300 text-white bg-[#3648f5] hover:bg-[#2a37d8] font-semibold p-2 flex items-center justify-center relative rounded-md w-44 min-h-10 mt-2">
            { text }
        </button>
    )
}