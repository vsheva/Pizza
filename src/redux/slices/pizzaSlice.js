import { createSlice} from '@reduxjs/toolkit';
//import axios from "axios";

/*export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async () => {
    const res= await axios.get(`https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,)

    return res.data
    }
)*/


const initialState = {
    items: [],
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: initialState,
    reducers: {
      setItems(state, action){
          //console.log(action)//{type: 'pizza/setItems', payload: Array(4)}
          state.items=action.payload;
      }
    },
});

export const {setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
