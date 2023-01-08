import { createSlice } from '@reduxjs/toolkit';

//похож на const [categoryId,setCategoryId] =useState(0) ... в RTK разделено

const initialState = {
  searchValue:'',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload; //устанавливаем стейт state.categoryId равным переданному payload из action //console.log(action) //{type: 'filters/setCategoryId', payload: 3} ////// dispatch setCategoryId(5)======>setCategoryId(state, 5)
    },

    setSearchValue(state, action) {
      state.searchValue = action.payload; //устанавливаем стейт state.categoryId равным переданному payload из action //console.log(action) //{type: 'filters/setCategoryId', payload: 3} ////// dispatch setCategoryId(5)======>setCategoryId(state, 5)
    },

    setSort(state, action) {
      state.sort = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter =(state) => state.filter

export const selectSort =(state) => state.filter.sort //state->в store-> в slice: селектор

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;

/*
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'myCounterRedux',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
    test: state => {
      state.count += 555;
    },
  },
});

console.log(
    'counterSlice: ',
    counterSlice,
    'counterSlice.actions: ',
    counterSlice.actions,
    'counterSlice.reducer: ',
    counterSlice.reducer,
);

//1. counterSlice:  {name: 'myCounterRedux', actions:{increment: ƒ, decrement: ƒ, incrementByAmount: ƒ}, caseReducers: {…}, reducer:ƒ (state, action), getInitialState: ƒ}

//2.  counterSlice.actions:  {increment: actionCreator(), decrement: actionCreator(), incrementByAmount: actionCreator()}

//3.  counterSlice.reducer:  ƒ (state, action) { ...return _reducer(state, action); }


// Action creators are generated for each case reducer function

export const { increment, decrement, incrementByAmount, test } = counterSlice.actions;

export default counterSlice.reducer;
*/
