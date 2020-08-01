//import * as todo from './todoReducer';
import * as categoryReducer from './category';
import * as types from '../action/types';

const createReducer = handlers => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }

    return handlers[action.type](state, action);
};

export default createReducer({


    //[types.GET_CATEGORY_SUCCESS]: categoryReducer,
});
