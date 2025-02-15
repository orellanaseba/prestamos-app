interface InputProp {
    type: string;
    name: string;
    placeholder: string;
}

export const Input = ({ type, name, placeholder }: InputProp) => {
    return (
        <input className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs"
         type={type} name={name} placeholder={placeholder} />
    )
}