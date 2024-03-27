import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailFullInfo } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchData = createAsyncThunk<Cocktail[]>(
  'cocktail/fetchData',
  async () => {
    try {
      const {data} = await axiosApi.get<Cocktail[]>('/cocktails');
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getFullInfo = createAsyncThunk<CocktailFullInfo, string>(
  'cocktail/getFullInfo',
  async (id) => {
    try {
      const {data} = await axiosApi.get<CocktailFullInfo>(`/cocktails/${id}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);


export const deleteCocktail = createAsyncThunk<void, string>(
  'cocktail/deleteCocktail',
  async (_id) => {
    try {
      await axiosApi.delete(`/cocktails/${_id}`);
    } catch (e) {
      console.log(e);
    }
  },
);

export const publishedCocktail = createAsyncThunk<void, string>('album/publishedCocktail', async (_id) => {
  await axiosApi.patch(`/cocktails/${_id}/togglePublished`);
});
