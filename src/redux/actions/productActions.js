// import axios from "axios";
import fakeStoreApi from "../../apis/fakeStoreApi";
import { ActionTypes } from "../constants/action-types";

// asynchronous action creator
// this throws error so commented as action creator is not supposed to be async
// export const fetchProducts = async () => {
//   const response = await axios.get("/products");
//   console.log(response)
//   return {
//     type: ActionTypes.FETCH_PRODUCTS,
//     payload: response,
//   };
// };

// sync action creator but has asyn function so thunk middleware can manually handle when to go to reducer
export const fetchProducts = () => async (dispatch, getState) => {
  const response = await fakeStoreApi.get("/products");
  console.log(response)
  dispatch({
    type: ActionTypes.FETCH_PRODUCTS,
    payload: response.data
  })
}

// synchronous action creator for above.. we are not using it as of now
export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};


export const fetchProduct = (id) => async (dispatch) => {
  const response = await fakeStoreApi.get(`/products/${id}`);
  console.log(response)
  dispatch({
    type: ActionTypes.SELECTED_PRODUCT,
    payload: response.data
  })
}
export const selectedProducts = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const removeSelectedProducts = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};