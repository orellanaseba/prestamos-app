import { DeleteIcon } from "./DeleteIcon"
import { EditIcon } from "./EditIcon"

export const Options = () => {
    return (
        <div className="z-20 bg-white border-[1px] border-zinc-300 absolute right-0 top-7 flex flex-col justify-around items-center w-12 h-14 rounded-md">
            <DeleteIcon />
            <EditIcon />
        </div>
    )
}