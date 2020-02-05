/*import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  artifacts:[],
  loading: false
};

export default function(state = initialState, action){
  switch (action.type) {
    case GET_ITEMS:
      return{
        ...state,
        artifacts: action.payload,
        loading: false
      }
      case DELETE_ITEM:
      return{
        ...state,
        artifacts: state.artifacts.filter(item => item.id !== action.payload)
      }
      case ITEMS_LOADING:
      return{
        ...state,
        loading: true
      }
    default:
      return state;


  }
}*/
