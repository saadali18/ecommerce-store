import { useState, useEffect, createContext } from "react";

import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    CategoriesMap: [],

})

export const CategoriesProvider = ({children}) => {
    const [CategoriesMap, setCategoriesMap] = useState([])
    const value = {CategoriesMap};

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    }, [] )

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}