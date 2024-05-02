import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CUShowPayload, createShow, deleteShow, getAllShows, updateShow } from '../api/showApi';
import { RootState } from '../app/store';
import Show from '../models/Show';
import { propEq } from 'ramda';

const initialState: Show[] = [];

export const fetchShowsAsync = createAsyncThunk(
  'shows/fetchShows',
  getAllShows
);

export const createShowAsync = createAsyncThunk(
  'shows/create',
  createShow
);

export const deleteShowAsync = createAsyncThunk(
  'shows/delete',
  deleteShow
);

export const updateShowAsync = createAsyncThunk(
  'shows/update',
  (payload: { id: number, data: CUShowPayload }) =>
    updateShow(payload.id, payload.data)
);

export const showListSlice = createSlice({
  name: 'showList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowsAsync.fulfilled, (_state, action) => action.payload)
      .addCase(fetchShowsAsync.rejected, () => alert('Unable to load the list of shows.'))
      .addCase(createShowAsync.fulfilled, (state, action) => {
        state.unshift(action.payload);
      })
      .addCase(createShowAsync.rejected, () => alert('Unable to create the new show.'))
      .addCase(deleteShowAsync.fulfilled, (state, { meta: { arg } }) => {
        const showIdx = state.findIndex(propEq('id', arg));

        if (showIdx !== -1) {
          state.splice(showIdx, 1);
        }
      })
      .addCase(deleteShowAsync.rejected, () => alert('Unable to delete the show.'))
      .addCase(updateShowAsync.fulfilled, (state, { payload }) => {
        const show = state.find(propEq('id', payload.id));

        if (show !== undefined) {
          show.title = payload.title;
          show.airDate = payload.airDate;
          show.description = payload.description;
          show.image = payload.image;
        }
      })
      .addCase(updateShowAsync.rejected, () => alert('Unable to update the show.'));
  }
});

export const selectShows = (state: RootState) => state.showList;

export default showListSlice.reducer;
