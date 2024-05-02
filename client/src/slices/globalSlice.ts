import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface Globals {
  pageTitle: string | null;
  pageSub: string | null;
  navBgImg: string | null;
}

const initialState: Globals = {
  pageTitle: null,
  pageSub: null,
  navBgImg: null
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changePageTitle: (state, action: PayloadAction<string | null>) => {
      state.pageTitle = action.payload;
    },
    changePageSub: (state, action: PayloadAction<string | null>) => {
      state.pageSub = action.payload;
    },
    changeNavBgImg: (state, action: PayloadAction<string | null>) => {
      state.navBgImg = action.payload
    }
  }
});

export const {
  changePageTitle,
  changePageSub,
  changeNavBgImg
} = globalSlice.actions;

export const selectPageTitle = (state: RootState) => state.global.pageTitle;
export const selectPageSub = (state: RootState) => state.global.pageSub;
export const selectNavBgImg = (state: RootState) => state.global.navBgImg;

export default globalSlice.reducer;
