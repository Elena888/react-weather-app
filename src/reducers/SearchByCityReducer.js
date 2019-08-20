import {CITY_WEATHER, DELETE_CITY, ERROR_ITEMS, ERROR_NO_MATCHES} from "../actions/types";

const initialState = {
    data: [],
    errorItems: null,
    errorMatches: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case CITY_WEATHER:
            return { ...state, data: action.payload, errorMatches: null, errorItems: null };

        case ERROR_ITEMS:
            return { ...state, errorMatches: null, errorItems: 'Please delete some of the existing locations to add new ones.'};

        case DELETE_CITY:
           let data = state.data.filter(function( obj ) {
                return obj.id !== action.payload;
            });
            return { ...state, errorItems: null, errorMatches: null,  data};

        case ERROR_NO_MATCHES:
            return { ...state, errorMatches: 'No matches found'};

        default:
            return state
    }
}