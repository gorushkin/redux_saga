import { createSlice } from '@reduxjs/toolkit';

export const apiRight = 'https://jsonplaceholder.typicode.com/users';
export const apiWrong = 'https://djsonplaceholder.typicode.com/userssssss';

const apiList = [apiRight, apiWrong];

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const getApi = () => {
  const random = randomInteger(0, 1);
  return apiList[random];
};

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const slicer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersFetch: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.users = [];
    },
    clearUsers: (state) => initialState,
  },
});

export default slicer.reducer;

export const { actions } = slicer;
