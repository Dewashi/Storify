import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/artifact')
    .then(res=>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
};

export const addItems = () => {
  return {
    type: ADD_ITEM
  };
};

export const deleteItems = id => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
