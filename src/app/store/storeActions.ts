import { createAction, props } from '@ngrx/store';
export const getItems = createAction('[to-do] get items');

export const getProducts = createAction(
  '[Product List] Get All Products',
  props<{ payload?: any }>()
);

export const loggedIn = createAction(
  '[Login] Login user status',
  props<{ payload?: any }>()
);

export const addToCart = createAction(
  '[Product Detail] Add To Cart',
  props<{ payload?: any }>()
);