import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { changeAwardTitle, createAward, deleteAward, setWinner } from "../api/awardApi";
import { getShowById } from "../api/showApi";
import { castVote, deleteVote } from "../api/voteApi";
import { RootState } from "../app/store";
import { changeNavBgImg, changePageSub, changePageTitle } from "./globalSlice";
import { CUEntryPayload, createEntry, deleteEntry, updateEntry } from "../api/entryApi";

import Show from "../models/Show";

type ShowDetailsState = Show | null;

const initialState: ShowDetailsState = null;

export const fetchShowByIdAsync = createAsyncThunk(
  'shows/fetchShowById',
  async (id: number, thunkApi) => {
    const show = await getShowById(id);

    thunkApi.dispatch(changePageTitle(show.title));
    thunkApi.dispatch(changePageSub(show.description));
    thunkApi.dispatch(changeNavBgImg(show.image));

    return show;
  }
);

export const setAwardWinnerAsync = createAsyncThunk(
  'awards/setWinner',
  setWinner
);

export const castVoteAsync = createAsyncThunk(
  'votes/cast',
  castVote
);

export const deleteVoteAsync = createAsyncThunk(
  'votes/delete',
  deleteVote
);

export const deleteEntryAsync = createAsyncThunk(
  'entries/delete',
  deleteEntry
);

export const updateEntryAsync = createAsyncThunk(
  'entries/update',
  (payload: { id: number, data: CUEntryPayload }) =>
    updateEntry(payload.id, payload.data)
);

export const createEntryAsync = createAsyncThunk(
  'entries/create',
  createEntry
);

export const createAwardAsync = createAsyncThunk(
  'awards/create',
  createAward
);

export const deleteAwardAsync = createAsyncThunk(
  'awards/delete',
  deleteAward
);

export const changeAwardTitleAsync = createAsyncThunk(
  'awards/changeTitle',
  (payload: { awardId: number, newTitle: string }) =>
    changeAwardTitle(payload.awardId, payload.newTitle)
);

export const showDetailsSlice = createSlice({
  name: 'showDetails',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ShowDetailsState>) => {
    builder
      .addCase(fetchShowByIdAsync.fulfilled, (_state, action) => action.payload)
      .addCase(fetchShowByIdAsync.rejected, () => alert('Unable to load show'))
      .addCase(castVoteAsync.fulfilled, (state, action) => {
        const { entryId } = action.meta.arg;

        for (let award of state?.awards || []) {
          const entry = award.entries?.find(propEq('id', entryId)) || null;

          if (entry !== null) {
            entry.votes?.push(action.payload);
            break;
          }
        }
      })
      .addCase(castVoteAsync.rejected, () => alert('Unable to cast vote'))
      .addCase(deleteVoteAsync.fulfilled, (state, action) => {
        const voteId = action.meta.arg;

        mainLoop: for (let award of state?.awards || []) {
          for (let entry of award.entries || []) {
            const idx = entry.votes?.findIndex(propEq('id', voteId));

            if (idx !== undefined && idx !== -1) {
              entry.votes?.splice(idx, 1);
              break mainLoop;
            }
          }
        }
      })
      .addCase(deleteVoteAsync.rejected, () => alert('Unable to delete vote'))
      .addCase(setAwardWinnerAsync.fulfilled, (state, action) => {
        const { awardId, winnerEntryId } = action.payload;
        const award = state?.awards?.find(propEq('id', awardId)) || null;

        if (award !== null) {
          award.winnerEntryId = winnerEntryId;
        }
      })
      .addCase(setAwardWinnerAsync.rejected, () => alert('Unable to set winner'))
      .addCase(updateEntryAsync.fulfilled, (state, action) => {
        const { id, title, description, image } = action.payload;

        for (const award of state?.awards || []) {
          const entryIdx = award.entries?.findIndex(propEq('id', id));

          if (entryIdx !== undefined && entryIdx !== -1 && award.entries !== undefined) {
            const entry = award.entries[entryIdx];

            entry.title = title;
            entry.description = description;
            entry.image = image;

            break;
          }
        }
      })
      .addCase(updateEntryAsync.rejected, () => alert('Unable to update entry'))
      .addCase(deleteEntryAsync.fulfilled, (state, action) => {
        const deletedEntryId = action.meta.arg;

        for (const award of state?.awards || []) {
          const entryIdx = award.entries?.findIndex(propEq('id', deletedEntryId));

          if (entryIdx !== undefined && entryIdx !== -1) {
            award.entries?.splice(entryIdx, 1);
            break;
          }
        }
      })
      .addCase(deleteEntryAsync.rejected, () => alert('Unable to delete entry.'))
      .addCase(createEntryAsync.fulfilled, (state, action) => {
        const awardId = action.meta.arg.awardId;

        if (awardId !== undefined) {
          const award = state?.awards?.find(propEq('id', awardId));

          if (award !== undefined) {
            award.entries?.push(action.payload);
          }
        }
      })
      .addCase(createEntryAsync.rejected, () => alert('Unable to create entry.'))
      .addCase(createAwardAsync.fulfilled, (state, action) => {
        state?.awards?.push(action.payload);
      })
      .addCase(createAwardAsync.rejected, () => alert('Unable to create award.'))
      .addCase(deleteAwardAsync.fulfilled, (state, action) => {
        const deletedAwardIdx = state?.awards?.findIndex(propEq('id', action.meta.arg));

        if (deletedAwardIdx !== undefined && deletedAwardIdx !== -1) {
          state?.awards?.splice(deletedAwardIdx, 1);
        }
      })
      .addCase(deleteAwardAsync.rejected, () => alert('Unable to delete award.'))
      .addCase(changeAwardTitleAsync.fulfilled, (state, action) => {
        const award = state?.awards?.find(propEq('id', action.meta.arg.awardId));

        if (award !== undefined) {
          award.title = action.payload;
        }
      })
      .addCase(changeAwardTitleAsync.rejected, () => alert('Unable to change award title.'));
  }
});

export const selectShow = (state: RootState) => state.showDetails as ShowDetailsState;

export default showDetailsSlice.reducer;
