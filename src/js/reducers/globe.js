import { ADD_POINT } from "../actions";

const initialState = {
	points: [
		{name: 'test1', longitude: 0, latitude: 0, height: 1000000, size: 10},
		{name: 'test2', longitude: 100, latitude: 0, height: 1000000, size: 10}
	]
};

export default (state = initialState, action) => {
	console.log(action);
	console.log(state.points);
    switch (action.type) {
	    case ADD_POINT:
    		return {
			    ...state, points: state.points.concat([action.point])
		    };
	    default:
	    	return state
    }
};
