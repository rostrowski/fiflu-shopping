import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createListIfDoesntExistApi,
  addNewItem,
  getAllItemsApi,
  deleteAllItemsApi,
} from "../firebase/api";

const initialState = {
  listId: "11", // TODO null
  loading: false,
  error: null,
  items: [],
  loadedInitialItems: false,
};

export const createListIfDoesntExist = createAsyncThunk(
  "shared/createList",
  async (listId) => {
    await createListIfDoesntExistApi(listId);
  }
);

export const addItem = createAsyncThunk(
  "shared/addItem",
  async (name, { getState }) => {
    const { listId } = getState().shared;

    await addNewItem(listId, {
      crossedOut: false,
      name,
    });
  }
);

export const getAllItems = createAsyncThunk(
  "shared/getAllItems",
  async (_, { getState }) => {
    const { listId } = getState().shared;

    const items = await getAllItemsApi(listId);
    return items;
  }
);

export const deleteAllItems = createAsyncThunk(
  "shared/deleteAllItems",
  async (_, { getState }) => {
    const { listId } = getState().shared;

    await deleteAllItemsApi(listId);
  }
);

export const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    ackError: (state) => {
      state.error = null;
    },
    receiveItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [createListIfDoesntExist.pending]: (state, action) => {
      state.loading = true;
      state.listId = action.meta.arg;
    },
    [createListIfDoesntExist.fulfilled]: (state) => {
      state.loading = false;
    },
    [createListIfDoesntExist.rejected]: (state) => {
      state.loading = false;
    },

    [addItem.pending]: (state, action) => {
      state.loading = true;
    },
    [addItem.fulfilled]: (state) => {
      state.loading = false;
    },
    [addItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [getAllItems.pending]: (state) => {
      state.loading = true;
    },
    [getAllItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.loadedInitialItems = true;
    },
    [getAllItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [deleteAllItems.pending]: (state) => {
      state.loading = true;
    },
    [deleteAllItems.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteAllItems.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  joinList,
  ackError,
  subscribeToItems,
  receiveItems,
} = sharedSlice.actions;

export default sharedSlice.reducer;
