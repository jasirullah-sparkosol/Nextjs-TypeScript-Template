import { createSlice } from "@reduxjs/toolkit";

// project imports
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  isLoading: false,
  users: [],
  totalPages: 0,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    setUsers(state, action) {
      state.users = action.payload;
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },

    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllUsers(perPage: any, page: any, role = "USER") {
  return async (dispatch: any) => {
    try {
      await dispatch(slice.actions.setLoading(true));
      const response = await axios.get("/persons/customers", {
        params: {
          page,
          perPage,
          role,
        },
      });
      await dispatch(slice.actions.setUsers(response.data));
      await dispatch(slice.actions.setLoading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      await dispatch(slice.actions.setLoading(false));
    }
  };
}

export function updateUser(userId: any, updatedData: any) {
  return async (dispatch: any) => {
    try {
      await axios.put(`/users/${userId}`, updatedData);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      await dispatch(slice.actions.setLoading(false));
    }
  };
}
