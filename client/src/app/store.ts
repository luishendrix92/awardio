import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import globalSlice from '../slices/globalSlice';
import showDetailsSlice from '../slices/showDetailsSlice';
import showListSlice from '../slices/showListSlice';

export const store = configureStore({
  reducer: {
    showList: showListSlice,
    showDetails: showDetailsSlice,
    global: globalSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
