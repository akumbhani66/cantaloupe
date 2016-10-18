import { combineReducers } from 'redux';
import {
	ADD_INVOICE,
	SET_FIELDS,
	DISPLAY_USERS,
	DISPLAY_INVOICES,
	FILTERED_USERS,
	DISPLAY_MACHINES

} from '../../constants';

const mainReducer = (state = {
	invoicer_name:'',
	invoice_number:'',
	invoicer_contact:'',
	invoice_date:'',
	invoicer_address:'',
	invoice_description:'',
	data: [],
	users: {},

}, action) => {
	switch (action.type) {
		case SET_FIELDS:
			let newState = {};
			newState[action.field] = action.value;
			console.log('from reducer', newState);
			return Object.assign({}, state, newState);

		// case ADD_INVOICE:
		//   return

		// case DISPLAY_INVOICES:
		//   data = action.data;
		//   return Object.assign({}, state, data);

		case DISPLAY_USERS:
		// let nextState = {}
		// nextState[action.subreddit] = posts(state[action.subreddit], action)
		// return Object.assign({}, state, nextState)
		console.log('***data***', action.data);
		return Object.assign({}, state, { data: action.data });

			// let data = action.value;
			// const result = Object.assign({}, state, { data: data });
			// console.log("****->", result);
			// return result;
		// case DISPLAY_MACHINES:
		//   let Machines = action.value;
		//   console.log("****->", Machines);
		//   return Object.assign({}, state, { data: Machines });

		default:
			return state;
	}
}

const reducer = combineReducers({
		main: mainReducer,
});

export default reducer;


