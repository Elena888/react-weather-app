import {CURRENT_LOCATION} from "../actions/types";

const INITIAL_STATE = {
    lat: null,
    lon: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CURRENT_LOCATION:
            return { ...state, lat: action.payload.lat, lon: action.payload.lon };
        default:
                return state;
    }
}