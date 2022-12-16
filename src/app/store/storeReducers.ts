import { on, createReducer } from '@ngrx/store';
import { addToCart, getProducts, loggedIn } from './storeActions'
export interface webStoreState {
  userLoginStatus: boolean;
  products: any[];
  addedToCart: any[];
}

export const initialState: webStoreState = {
  userLoginStatus: false,
  products: [],
  addedToCart: []
};

export const WebStoreReducer = createReducer(
  initialState,
  on(getProducts, (state, action) => ({ ...state, ...action.payload })),
  on(loggedIn, (state, action) => ({ ...state, ...action.payload })),
  on(addToCart, (state, { payload }) => ({
    ...state,
    addedToCart: [...state.addedToCart, payload]
  }))
);