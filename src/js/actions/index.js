export const ADD_POINTS = 'ADD_POINTS';

export function addPoints(points, lines) {
	return { type: ADD_POINTS, points, lines }
}