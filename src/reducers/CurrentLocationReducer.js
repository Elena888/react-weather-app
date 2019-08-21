import {CURRENT_LOCATION} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CURRENT_LOCATION:
            //HOW MAKE [action.payload]: action.payload???
            return {
                ...state,
                city: action.payload.city,
                country: action.payload.country,
                temp: action.payload.temp,
                icon: action.payload.icon,
                description: action.payload.description
            };
        default:
                return state;
    }
}