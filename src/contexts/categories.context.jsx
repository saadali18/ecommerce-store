import { useReducer, useEffect, createContext } from "react";

import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    CategoriesMap: [],

})

export const CATEGORY_ACTION_TYPES = {
    SET_CATEGORY_MAP: 'SET_CATEGORY_MAP'
}

const categoryReducer = (state, action) => {
    const {type, payload} = action;

    switch(type)
    {
        case CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP: 
            return {
                ...state,
                CategoriesMap: payload
            }
        default:  
            throw new Error(`unhandled type ${type} in userReducer`)
    } 
};

const INITIAL_STATE = {
    categoriesMap: [],
}

export const CategoriesProvider = ({children}) => {
    const [{CategoriesMap}, dispatch] = useReducer(categoryReducer, INITIAL_STATE);
    const setCategoriesMap = (categoriesMap) => {
        dispatch({type: CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP, payload: categoriesMap})
    } 
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