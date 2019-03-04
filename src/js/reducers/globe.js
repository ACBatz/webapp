import { ADD_POINTS } from "../actions";

const initialState = {
	points: [],
	lines: false
};

export default (state = initialState, action) => {
    switch (action.type) {
	    case ADD_POINTS:
    		return {
			    ...state, points: action.points, lines: action.lines
		    };
	    default:
	    	return state
    }
};
