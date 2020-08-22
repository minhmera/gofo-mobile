// Reducer

const globalDataReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return [...state, action.categories];

        default:
            return state;
    }
}
export default globalDataReducer
