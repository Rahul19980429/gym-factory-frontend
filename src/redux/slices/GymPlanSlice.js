import { createSlice } from "@reduxjs/toolkit";
const host = 'https://gymfactoryapi.vercel.app';
const STATUS = Object.freeze({
    IDEL: 'idel',
    LOADING: 'loading',
    ERROR: 'error'

})

const GymPlanSlice = createSlice({
    name: 'gymplan',
    initialState: {
        data: [],
        status: STATUS.IDEl,
        error: []
    },
    reducers: {
        setGymPlan(state, action) {
            state.data = action.payload

        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setNewGymPlan(state, action) {
            state.data.push(action.payload)
        },
        setDataAfterDeleteGymPlan(state, action) {

            let newState = state.data.filter((data) => { return data._id !== action.payload })
            state.data = newState;
        },
        setPlanError(state, action) {
            state.error = action.payload
        }

    }

})

export const { setGymPlan, setStatus, setNewGymPlan, setDataAfterDeleteGymPlan, setPlanError } = GymPlanSlice.actions
export default GymPlanSlice.reducer;

export function fetchGymPlan() {
    return async function fetchGymPlanThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/gymPlan/allPlans`,
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
            dispatch(setGymPlan(data))
            dispatch(setStatus(STATUS.IDEL))
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export function InsertNewGymPlan(GymplanData) {
    const { planMonth: plan, planFee: planfee, planDesc: plandesc } = GymplanData;
    return async function InsertNewGymPlanThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/gymPlan/new`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token'),
                    },
                    body: JSON.stringify({ plan, planfee, plandesc })
                }
            );
            const data = await response.json();
            if (data.success) {
                dispatch(setNewGymPlan(data.insert))
                dispatch(setStatus(STATUS.IDEL))
            }
            else {
                dispatch(setPlanError(data))
                dispatch(setStatus(STATUS.IDEL))
            }
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}
 
export function DeleteGymPlan(gymPlanId) {

    return async function DeleteGymPlanThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/gymPlan/deleteplan/${gymPlanId}`,
                {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token'),
                    },
                }
            );
            const data = await response.json();
            if (data.success) {
                dispatch(setDataAfterDeleteGymPlan(gymPlanId))
                dispatch(setStatus(STATUS.IDEL))
            }
            else {
                alert('This Gym Plan Is Linked To The Cliend. You Can not Delete It Directly.')
                dispatch(setStatus(STATUS.IDEL))
            }

        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}