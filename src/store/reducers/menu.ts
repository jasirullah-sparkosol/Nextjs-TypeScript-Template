// third-party
import { createSlice } from "@reduxjs/toolkit";

// types
import { MenuProps } from "types/menu";

// initial state
const initialState: MenuProps = {
  openedItem: "dashboard",
  openedComponent: "buttons",
  openedHorizontalItem: null,
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    handlerActiveItem(state, action) {
      state.openedItem = action.payload;
    },

    handlerActiveComponent(state, action) {
      state.openedComponent = action.payload;
    },

    handlerHorizontalActiveItem(state, action) {
      state.openedHorizontalItem = action.payload;
    },

    handlerDrawerOpen(state, action) {
      state.isDashboardDrawerOpened = action.payload;
    },

    handlerComponentDrawer(state, action) {
      state.isComponentDrawerOpened = action.payload;
    },
  },
});

export default menu.reducer;

export const {
  handlerActiveItem,
  handlerActiveComponent,
  handlerHorizontalActiveItem,
  handlerDrawerOpen,
  handlerComponentDrawer,
} = menu.actions;
