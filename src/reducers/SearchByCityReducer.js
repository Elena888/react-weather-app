import {
    ADD_CURRENT_LOCATION_WEATHER,
    CITY_WEATHER,
    DELETE_CITY,
    ERROR_CLEAR,
    ERROR_ITEMS,
    ERROR_NO_MATCHES
} from "../actions/types";

const initialState = {
    data: [],
    errorItems: null,
    errorMatches: null
};

export default (state = initialState, action) => {
    switch(action.type){
       case ADD_CURRENT_LOCATION_WEATHER:
            console.log(action.payload)
            let dataFirstElement = [ ...state.data, action.payload ]
            return { ...state, data: dataFirstElement, errorMatches: null, errorItems: null }

        case CITY_WEATHER:
            return { ...state, data: action.payload, errorMatches: null, errorItems: null };

        case ERROR_ITEMS:
            return { ...state, errorMatches: null, errorItems: 'Please delete some of the existing locations to add new ones.' };

        case DELETE_CITY:
           let data = state.data.filter(function( obj ) {
                return obj.id !== action.payload;
            });
            return { ...state, errorItems: null, errorMatches: null,  data};

        case ERROR_NO_MATCHES:
            return { ...state, errorMatches: 'No matches found' };

        case ERROR_CLEAR:
            return { ...state, errorMatches: null, errorItems: null };

        default:
            return state
    }
}