interface InputProp {
    type: string;
    name: string;
    placeholder: string;
    setClientName?: (e: string) => void | undefined;
}

export const Input = ({ type, name, placeholder, setClientName }: InputProp) => {

    return (
        <input
        onChange={(e) => setClientName && setClientName(e.target.value)}
        className="p-2 bg-white border-[1px] border-zinc-300 focus:bg-zinc-100 outline-none w-full text-sm rounded-md shadow-xs"
         type={type} name={name} placeholder={placeholder} />
    )
}