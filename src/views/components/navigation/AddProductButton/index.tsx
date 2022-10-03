import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function AddProductButton() {
    return (
        <Link href='http://localhost:3000/product/add'>
            <Button
            marginRight='3px'
            fontSize='12px'>
                Add Product
            </Button>
        </Link>
    )
}