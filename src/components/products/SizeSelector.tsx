import { ISize } from "@/interfaces";
import {  Button } from "@mui/material";

interface Props {
    selectedSize?: ISize | '';
    sizes: ISize[];
    onSelectedSize: (size: ISize) => void;
}

export const SizeSelector = ({ selectedSize = '', onSelectedSize = () => { }, sizes = [] }: Props) => {
    
    return (
        <>
            {sizes.map(size => (
                <Button
                    key={size}
                    size="small"
                    color={selectedSize === size ? 'primary' : "info"}
                    onClick={() => onSelectedSize(size as ISize)}
                >
                    {size}
                </Button>
            ))}
        </>
    )
}
