import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createListIfDoesntExistApi,
  addNewItemApi,
  addItemOrderApi,
  setNewItemOrderApi,
  getAllItemsApi,
  deleteAllItemsApi,
  deleteOrderApi,
} from "../firebase/api";
import { v4 as uuid } from "uuid";

const initialState = {
  listId: "11", // TODO null
  loading: false,
  error: null,
  items: [],
  itemsOrder: [],
  loadedInitialItems: false,
  draggingModeOn: true, // false
  editModeOn: true, // false
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
    const itemId = uuid();

    await Promise.all([
      addNewItemApi(listId, {
        crossedOut: false,
        name,
        id: itemId,
      }),
      addItemOrderApi(listId, itemId),
    ]);
  }
);

export const reorderItems = createAsyncThunk(
  "shared/reorderItems",
  async (order, { getState }) => {
    const { listId } = getState().shared;

    await setNewItemOrderApi(listId, order);
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

    await Promise.all([deleteAllItemsApi(listId), deleteOrderApi(listId)]);
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
    receiveOrder: (state, action) => {
      state.itemsOrder = action.payload;
    },
    toggleDraggingMode: (state) => {
      state.draggingModeOn = !state.draggingModeOn;
    },
    toggleEditMode: (state) => {
      state.editModeOn = !state.editModeOn;
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
  receiveItems,
  receiveOrder,
  toggleDraggingMode,
  toggleEditMode,
} = sharedSlice.actions;

export default sharedSlice.reducer;
