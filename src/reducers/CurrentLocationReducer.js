import {CURRENT_LOCATION_WEATHER, ERROR_DENIED_GEOLOCATION} from "../actions/types";

const INITIAL_STATE = {
    data: [],
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CURRENT_LOCATION_WEATHER:
            return { ...state, data: action.payload, error: null };
        case ERROR_DENIED_GEOLOCATION:
            return { ...state, error: 'Geolocation is not supported by this browser.'};
        default:
                return state;
    }
}