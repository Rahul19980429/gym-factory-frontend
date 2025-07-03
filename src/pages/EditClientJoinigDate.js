import React, { useEffect, useContext, useState } from 'react'
import Context from '../context/Context';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../MyComponents/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { fetchGymPlan } from '../redux/slices/GymPlanSlice';



const EditClientJoinig = () => {
    const url_id = useParams();
    const id = url_id.id;
    const pid = url_id.pid
    const navigate = useNavigate();



    const dispatch = useDispatch();
    const gymPlan = useSelector((state) => state.gymplan)
    const a = useContext(Context);
    const { addClientWithSub, spinner, setError, handleLogout, seteditAccess } = a;

    const addSubPlan = async (id, pid, from) => {

        await addClientWithSub(id, pid, from)

        navigate('/subscriptedClient')


    }
    const [input, setInput] = useState({ dateFrom: '' });
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })

    }
    const submit = (e) => {
        e.preventDefault()
        if (!input.dateFrom) {
            alert("Empty field is not allowed")
        }
        else {

            let From = new Date(input.dateFrom)
            // alert(From)
            addSubPlan(id, pid, From)
        
        // let To = new Date(input.dateTo)
        // let data = DateFilterFunction(From, To, balanceSheetData)
        // dispatch(setFilterBalanceSheetData(data))
        setInput({ dateFrom: '' })
        // document.getElementById('balanceSheetFilterBtn').disabled=true;

    }

}




useEffect(() => {

    if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('user')).active === true) {
        dispatch(fetchGymPlan())
    }
    else {
        if (JSON.parse(localStorage.getItem('user')).active === false) {
            setError({ 'error': 'YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT' })
        }
        handleLogout()
        navigate('/login');
    }

}, [])




return (
    spinner === 'true' ? <Spinner /> :
        <div className=' container  mt-5'>
            <div className='row'>
                <div className=' col-12 my-3 px-3 text-center'><div className=' btn p-4 bg-dark bg-opacity-50 btnlogIn fw-bold  stn-sm mx-1 text-white' onClick={() => addSubPlan(id, pid, new Date())}>
                    <span className='text-danger'> Start From Today </span>
                </div>
                </div>
                <div className=' col-12 my-3 px-3 text-center'><div className=' btn p-4 bg-dark bg-opacity-50 btnlogIn fw-bold  stn-sm mx-1 text-white'>
                    <h5 className='text-danger pb-3'> Enter Joining Date Manually </h5>
                    <div>


                        <div className="input-group mb-3 border border-white rounded-1">
                            <span className="bg-opacity-25 input-group-text text-danger bg-dark border-0 rounded-0">Date From</span>
                            <input autoComplete='off' type="date" className="setbgImg text-white border-0 form-control" placeholder='' onChange={onChange} value={input.dateFrom} id="dateFrom" name="dateFrom" />

                        </div>


                        <div className="d-flex gap-2 mt-2 justify-content-center">

                            <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " id="balanceSheetFilterBtn" onClick={submit}>OK</button>

                        </div>

                        <div>

                        </div>
                    </div>

                </div>
                </div>





            </div>
        </div>
)
}

export default EditClientJoinig
