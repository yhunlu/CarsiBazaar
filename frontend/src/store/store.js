import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import api from "./middleware/api";

const cartItemFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : { Items: [] };

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const orderFromStorage = localStorage.getItem("order")
  ? JSON.parse(localStorage.getItem("order"))
  : {
      lists: [],
      error: [],
      errorPay: [],
      loading: false,
      success: false,
    };

const orderListDetailFromStorage = localStorage.getItem("orderListDetail")
  ? JSON.parse(localStorage.getItem("orderListDetail"))
  : {
      order: { user: [], shippingAddress: [], orderItems: [] },
      error: [],
      loading: false,
    };

const productDetailFromStart = {
  product: { reviews: [] },
  error: [],
  loading: false,
};

const initialState = {
  entities: {
    cartItem: cartItemFromStorage,
    shipping: { shippingAddress: shippingAddressFromStorage },
    payment: { paymentMethod: paymentMethodFromStorage },
    users: { userInfo: userInfoFromStorage },
    order: orderFromStorage,
    orderListDetail: orderListDetailFromStorage,
    productDetail: productDetailFromStart,
  },
};

const middleware = [thunk, api];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
