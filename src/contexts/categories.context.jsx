import { useState, useEffect, createContext } from "react";

import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: [],

})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const value = {products};
    // just run once
    // useEffect(()=> {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    }, [] )


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