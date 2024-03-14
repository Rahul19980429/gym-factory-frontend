import React, { useEffect, useContext, useState } from 'react'
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../MyComponents/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBalanceSheet, setFilterBalanceSheetData } from '../redux/slices/BalanceSheetSlice'


const BalanceSheet = () => {
    const dispatch = useDispatch();
    const balanceSheetData = useSelector((state) => state.balanceSheet.data)

    const a = useContext(Context);
    const { spinner, setError, handleLogout, setDatefunc } = a;

    const setdateAsgetTime = (date) => {
        let setDate = new Date(date);
        let date1 = new Date(setDate.getFullYear(), setDate.getMonth() + 1, setDate.getDate()).getTime();
        return date1;
    }
    const DateFilterFunction = (from, to, BalanceSheetData) => {
        let data = BalanceSheetData.filter((data) => { return (setdateAsgetTime(data.date) >= setdateAsgetTime(from)) && (setdateAsgetTime(to) >= setdateAsgetTime(data.date)) });
        return data;

    }

    const [input, setInput] = useState({ dateFrom: '', dateTo: '' });
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })

    }
    const submit = (e) => {
        e.preventDefault()

        if (!input.dateFrom || !input.dateTo) {
            alert("Empty field is not allowed")
        }
        else {
            let From = new Date(input.dateFrom)
            let To = new Date(input.dateTo)
            let data = DateFilterFunction(From, To, balanceSheetData)
            dispatch(setFilterBalanceSheetData(data))
            setInput({ dateFrom: '', dateTo: '' })
        }

    }

    const refreshClicked = () => {
        dispatch(fetchBalanceSheet())
    }


    useEffect(() => {

        if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('user')).active === true) {
            dispatch(fetchBalanceSheet())
        }
        else {
            if (JSON.parse(localStorage.getItem('user')).active === false) {
                setError({ 'error': 'YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT' })
            }
            handleLogout()
            navigate('/login');
        }

    }, [])

    const navigate = useNavigate();



    return (
        spinner === 'true' ? <Spinner /> :
            <div className=' container  mt-4'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='setClient'>
                            <table className='table bg-dark bg-opacity-50 btnlogIn fw-bold  stn-sm mx-1 text-white px-2'>
                                <thead>
                                    <tr>
                                        <th className='text-danger'>SNo.</th>
                                        <th className='text-danger'>Client</th>
                                        <th className='text-danger'>Amount</th>
                                        <th className='text-danger'>Date (DD/MM/YYYY)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {balanceSheetData.length === 0 ? <tr><td className='text-center text-danger' colSpan={4}>"Not Found"</td></tr> :
                                        balanceSheetData.map((data, index) => {

                                            return (

                                                <tr key={index}>
                                                    <td className='text-danger'>{index + 1}</td>
                                                    <td className='text-white '> {data.clientName} {data.clientContact} </td>
                                                    <td className='text-danger'> {data.amount} </td>
                                                    <td className='text-danger'> {setDatefunc(data.date)} </td>
                                                </tr>

                                            )


                                        })}
                                </tbody>
                            </table>
                        </div>
                        <table className='mt-2 table bg-dark bg-opacity-50 btnlogIn fw-bold  stn-sm mx-1 text-white'>
                            <tfoot style={{ border: 'none' }}>
                                <tr>
                                    <th className='text-danger' colSpan={2}>Total Entries:{balanceSheetData.length}</th>

                                    <th className='text-danger' colSpan={2}> Net Amount: {balanceSheetData.length > 0 ? balanceSheetData.map((data) => data.amount).reduce((a, b) => a + b) : 0}</th>


                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className='col-lg-4'>


                        <div className="input-group mb-3 border border-white rounded-1">
                            <span className="bg-opacity-25 input-group-text text-danger bg-dark border-0 rounded-0">Date From</span>
                            <input autoComplete='off' type="date" className="setbgImg text-white border-0 form-control" placeholder='' onChange={onChange} value={input.dateFrom} id="dateFrom" name="dateFrom" />

                        </div>
                        <div className="input-group mb-3 border border-white rounded-1">
                            <span className="bg-opacity-25 input-group-text text-danger bg-dark border-0 rounded-0">Date To</span>
                            <input autoComplete='off' type="date" className="setbgImg text-white border-0 form-control" placeholder='' onChange={onChange} value={input.dateTo} id="dateTo" name="dateTo" />

                        </div>

                        <div className="d-flex gap-2 mt-2 justify-content-center">

                            <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " disabled={input.dateFrom && input.dateTo == '' ? true : false} onClick={submit}>OK</button>
                            <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " onClick={refreshClicked}>REFRESH</button>
                        </div>

                        <div>

                        </div>
                    </div>

                </div>

            </div>

    )
}

export default BalanceSheet
