import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const GET_URL = 'http://localhost:8080';

const initialState = {
    data: [],
    files: null,
    fileSelected: null
};

export const fetchGets = createAsyncThunk('get/files', async (file) => {
    try {
        const response = await fetch(`${GET_URL}/files/data`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
});

export const fetchFile = createAsyncThunk('get/file/data', async (file) => {
    try {
        const response = await fetch(`${GET_URL}/files/data?fileName=${file}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
});

export const fetchGetsFiles = createAsyncThunk('get/files/list', async () => {
    try {
        const response = await fetch(`${GET_URL}/files/list`);
        const data = await response.json();
        return data.files;
    } catch (err) {
        console.log(err);
    }
})

const getSlice = createSlice({
    name: 'gets',
    initialState,
    reducers: {
        chooseFile(state, action) {
            state.fileSelected = action.payload
        }
    },
    extraReducers: builder => {
        builder
          .addCase(fetchGets.fulfilled, (state, action) => {
            action.payload.forEach((files) => {
            return files.lines.forEach(element => {
                return state.data.push({ ...element, fileName: files.file })
            });
            })
          })
          .addCase(fetchGetsFiles.fulfilled, (state, action) => {
            state.files = action.payload;
          })
          .addCase(fetchFile.fulfilled, (state, action) => {
            state.data = []
            if (action.payload) {
              action.payload.lines && action.payload.lines.forEach((files) => {
                state.data.push({ ...files, fileName: action.payload.file })
            });
        } else {
            state.data = []
        }
        })
    }
});

export const allFiles = (state) => state.gets;

export const { chooseFile } = getSlice.actions;

export default getSlice.reducer;
