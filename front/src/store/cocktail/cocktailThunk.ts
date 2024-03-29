import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, PostCocktail } from '../../types';
import axiosApi from '../../axiosApi.ts';


export const fetchData = createAsyncThunk<Cocktail[], string>(
  'cocktail/fetchData',
  async (id) => {
    try {
      const {data} = await axiosApi.get<Cocktail[]>(`/cocktails?userId=${id}`);
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


export const addCocktail = createAsyncThunk<void, PostCocktail>(
  'cocktails/addOne',
  async (cocktail) => {
    try {
      const itemData = new FormData();
      const keys = Object.keys(cocktail) as (keyof PostCocktail)[];

      keys.forEach((key) => {
        const value = cocktail[key] as string | File;

        if (key === 'ingredients' && Array.isArray(value)) {
          itemData.append(key, JSON.stringify(value));
          return;
        }
        itemData.append(key, value);
      });

      await axiosApi.post('/cocktails', itemData);
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


export const publishedCocktail = createAsyncThunk<void, string>('cocktail/publishedCocktail', async (_id) => {
  await axiosApi.patch(`/cocktails/${_id}/togglePublished`);
});
