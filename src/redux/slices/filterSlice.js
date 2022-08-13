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
      test: (state)=> {
          state.count+=555
      }
  },
});


console.log("counterSlice: ", counterSlice, "counterSlice.actions: ", counterSlice.actions,  "counterSlice.reducer: ", counterSlice.reducer)

//1. counterSlice:  {name: 'myCounterRedux', actions:{increment: ƒ, decrement: ƒ, incrementByAmount: ƒ}, caseReducers: {…}, reducer:ƒ (state, action), getInitialState: ƒ}

//2.  counterSlice.actions:  {increment: actionCreator(), decrement: actionCreator(), incrementByAmount: actionCreator()}

//3.  counterSlice.reducer:  ƒ (state, action) { ...return _reducer(state, action); }



// Action creators are generated for each case reducer function

export const { increment, decrement, incrementByAmount, test } = counterSlice.actions;

export default counterSlice.reducer;


