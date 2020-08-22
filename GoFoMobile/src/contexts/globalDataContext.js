import React, { createContext, useReducer, useContext } from "react";
export const GlobalDataContext = createContext();

const initialItems = {
    categories: []
}

// Actions
export const SET_CATEGORIES = "GET_CATEGORIES";
export function setCategories(categories) {
    return { type: SET_CATEGORIES, categories };
}

// Reducer
export function globalDataReducer(globalState, action) {
    switch (action.type) {

        case SET_CATEGORIES:
            console.log('MERA  globalDataReducer  ',action)
            return {
                ...globalState,
                categories: action.categories
            }

        default:
            return globalState;
    }
}

function GlobalDataProvider(props) {
    const [globalState, dispatch] = useReducer(globalDataReducer, initialItems);

    const globalData = { globalState, dispatch };

    return (<GlobalDataContext.Provider value={globalData} {...props} />);
}

function useGlobalDataContext() {
    return useContext(GlobalDataContext);
}

export { GlobalDataProvider, useGlobalDataContext };
