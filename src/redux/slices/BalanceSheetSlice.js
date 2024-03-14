import { createSlice } from "@reduxjs/toolkit";
// const host = 'http://localhost:3001'
const host = 'https://gymfactoryapi.vercel.app'
const STATUS = Object.freeze({
    IDEL: 'idel',
    LOADING: 'loading',
    ERROR: 'error'

})

const BalanceSheetSlice = createSlice({
    name: 'balanceSheet',
    initialState: {
        data: [],
        status: STATUS.IDEl,
        error:[]
    },
    reducers: {
        setBalanceSheet(state, action) {
            state.data = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setFilterBalanceSheetData(state, action) {
            state.data = action.payload
        },
        setError(state,action) {
            state.error = action.payload
        },

    }

})

export const { setBalanceSheet, setStatus, setError,setFilterBalanceSheetData} = BalanceSheetSlice.actions
export default BalanceSheetSlice.reducer;

export function fetchBalanceSheet() {
    return async function fetchClientThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/balanceSheet/balanceEntries`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token'),

                    },
                }
            );
            const data = await response.json();
            dispatch(setBalanceSheet(data.data))
            dispatch(setStatus(STATUS.IDEL))
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}



export function DeleteBalanceSheet(userId) {
    return async function DeleteBalanceSheetThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/balanceSheet/deleteEntries/${userId}`,{
                method: "DELETE",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token'),
                    
                },
              }
            );
            const data = await response.json();
            if(data.success){
            dispatch(setBalanceSheet(''))
            dispatch(setStatus(STATUS.IDEL))
            }
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

// export function EditClient(clientData,id) {
//     const { name, address, contact } = clientData;
//     return async function EditClientThunk(dispatch, getState) {
//         dispatch(setStatus(STATUS.LOADING))
//         try {
//             const response = await fetch(`${host}/api/fitness/editClient/${id}`,
//                 {
//                     method: "PUT",
//                     mode: "cors",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "auth-token": localStorage.getItem('token'),
//                     },
//                     body: JSON.stringify({ name, address, contact })
//                 }
//             );
//             const data = await response.json();
//             if(data.success){
//                 dispatch(setEditedClient(data.done))
//                 dispatch(setStatus(STATUS.IDEL))
//             }
//             else{
//                 dispatch(setError(data))
//                 dispatch(setStatus(STATUS.IDEL))
//             }
           
//         } catch (error) {
//             dispatch(setStatus(STATUS.ERROR))
//         }
//     }
// }