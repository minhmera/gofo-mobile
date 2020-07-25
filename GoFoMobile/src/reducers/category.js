import remove from 'lodash.remove';

const initialState = {
    categories: [],

}

const categoryReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'OnSuccess':
           // console.log('categoryReducer ==> ', action)
            return {
                categories: action.payload,
            }
        case 'OnFailure':
            return {
                categories: {},
            }

        default:
            return state
    }
}

export default categoryReducer

