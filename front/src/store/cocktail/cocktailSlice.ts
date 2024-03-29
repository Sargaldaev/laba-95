import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cocktail } from '../../types';
import {
  addCocktail,
  deleteCocktail,
  fetchData,
  getFullInfo,
  publishedCocktail
} from './cocktailThunk.ts';

export interface CocktailState {
  cocktails: Cocktail[];
  cocktailFullInfo: Cocktail | null;
  fetchLoad: boolean;
  createLoad: boolean
  deleteLoad: string;
  fetchLoadFullInfo: boolean;
  publishedLoad:string,
}

const initialState: CocktailState = {
  cocktails: [],
  cocktailFullInfo: null,
  fetchLoad: false,
  fetchLoadFullInfo: false,
  deleteLoad: '',
  publishedLoad:'',
};

export const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state: CocktailState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchData.fulfilled, (state: CocktailState, action: PayloadAction<Cocktail[]>) => {
      state.fetchLoad = false;
      state.cocktails = action.payload;
    });
    builder.addCase(fetchData.rejected, (state: CocktailState) => {
      state.fetchLoad = false;
    });


    builder.addCase(getFullInfo.pending, (state: CocktailState) => {
      state.fetchLoadFullInfo = true;
    });
    builder.addCase(getFullInfo.fulfilled, (state: CocktailState, action: PayloadAction<Cocktail>) => {
      state.fetchLoadFullInfo = false;
      state.cocktailFullInfo = action.payload || null;
    });
    builder.addCase(getFullInfo.rejected, (state: CocktailState) => {
      state.fetchLoadFullInfo = false;
    });


    builder.addCase(deleteCocktail.pending, (state: CocktailState,action) => {
      state.deleteLoad = action.meta.arg || '' ;
    });
    builder.addCase(deleteCocktail.fulfilled, (state: CocktailState) => {
      state.deleteLoad = '';
    });
    builder.addCase(deleteCocktail.rejected, (state: CocktailState) => {
      state.deleteLoad = '';
    });


    builder.addCase(publishedCocktail.pending, (state: CocktailState,action) => {
      state.publishedLoad = action.meta.arg || '' ;
    });
    builder.addCase(publishedCocktail.fulfilled, (state: CocktailState) => {
      state.publishedLoad = '';
    });
    builder.addCase(publishedCocktail.rejected, (state: CocktailState) => {
      state.publishedLoad = '';
    });


    builder.addCase(addCocktail.pending, (state: CocktailState) => {
      state.createLoad = true;
    });
    builder.addCase(addCocktail.fulfilled, (state: CocktailState) => {
      state.createLoad = false;
    });
    builder.addCase(addCocktail.rejected, (state: CocktailState) => {
      state.createLoad = false;
    });

  },
});

export const cocktailReducer = cocktailSlice.reducer;
