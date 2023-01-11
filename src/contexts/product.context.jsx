import { useState, useEffect, createContext } from "react";

import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    products: [],

})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const value = {products};

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
        }
        getCategoriesMap()
    }, [] )


    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}