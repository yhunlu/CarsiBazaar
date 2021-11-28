import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import axios from "axios";

const slice = createSlice({
  name: "products",
  initialState: {
    lists: [],
    error: [],
    loading: false,
    success: false,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsRequestFailed: (products, action) => {
      products.loading = false;
      products.error = action.payload;
    },
    productsReceived: (products, action) => {
      products.lists = action.payload;
      products.loading = false;
    },
    productDeleteRequested: (products, action) => {
      products.success = false;
    },
    productDeleteReceived: (products, action) => {
      products.success = true;
    },
    productDeleteRequestFailed: (products, action) => {
      products.error = action.payload;
      products.success = false;
    },
  },
});

export const {
  productsReceived,
  productsRequested,
  productsRequestFailed,
  productDeleteReceived,
  productDeleteRequested,
  productDeleteRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/products";
// () => fn (dispatch, getState)
export const loadProducts =
  (keyword = "") =>
  (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        url: url + "/?keyword=" + keyword,
        onStart: productsRequested.type,
        onSuccess: productsReceived.type,
        onError: productsRequestFailed.type,
      })
    );
  };

export const loadAllProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: productsRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products`, config);

    dispatch({
      type: productsReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productsRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productDeleteRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: productDeleteReceived.type,
    });
  } catch (error) {
    dispatch({
      type: productDeleteRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
