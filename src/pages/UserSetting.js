import React, { useState, useContext } from 'react'
import Context from '../context/Context';
import { DeleteBalanceSheet } from '../redux/slices/BalanceSheetSlice'
import { useDispatch } from 'react-redux'
const UserSetting = () => {
    const dispatch = useDispatch();
    let active;
    const [boolValue, setboolValue] = useState(true)
    let userData = JSON.parse(localStorage.getItem('user'));
    const a = useContext(Context);

    const { setError, error, editUserData, editAccess } = a;
    const [input, setInput] = useState({ name: userData.name, firmname: userData.firmname, apikey: userData.apikey, contact: userData.contact, password: '' });
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setError("");
        setboolValue(false)
    }
    const submit = (e) => {
        e.preventDefault()
        setboolValue(true)
        if (!input.name || !input.firmname || !input.contact) {
            alert("Empty field is not allowed")
        }
        else {
            editUserData(userData._id, input)
            setInput({ ...input, password: '' })
        }


    }
    const keypress = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
        }
    }

    if (error.length !== 0) {
        setTimeout(() => {
            setError('')
        }, 2500);
    }

    const cancelBtnClick = () => {
        setInput({ name: userData.name, firmname: userData.firmname, apikey: userData.apikey, contact: userData.contact, password: '' })
        setboolValue(true)
    }
    const resetBalanceSheet = (userId) => {
        let areYouSure =  window.confirm("Are you sure");
        if(areYouSure){
        dispatch(DeleteBalanceSheet(userId))
        } 
    }
    return (
        (!localStorage.getItem('token')) || active === false ? "" :
            editAccess === false ? '' :
                <div className='container'>
                    <div className='row'>
                        <h4 className='mb-5 mt-4 text-center text-danger'>Here You Can Make Changes In Your Account Profile.</h4>

                        <div className='col-lg-5 '>
                            <div className='card bg-dark bg-opacity-50 p-4'>
                                <div className='card-body btnlogIn text-uppercase text-white'>
                                    <h5 className='py-2'>OWNER NAME: <span className='text-danger'>{userData.name}</span> </h5>
                                    <h5 className='py-2'>Firm name:<span className='text-danger'> {userData.firmname}</span></h5>
                                    <h5 className='py-2'>Contact :<span className='text-danger'> {userData.contact}</span> </h5>
                                    <h5 className='py-2'>Whatsapp Api key : <small className='text-danger'> {userData.apikey ? userData.apikey : 'For whatsapp message feature you need to contact admin'}</small></h5>

                                </div>
                            </div>
                            <div className='mt-3'>
                                <button onClick={() => resetBalanceSheet(userData._id)} className="btn text-white fw-bold  mb-4 btnlogIn border-0" type='button'>RESET BALANCE SHEET</button>
                            </div>
                        </div>
                        <div className='col-lg-5 offset-lg-2'>
                            <form onSubmit={submit} className='px-3 px-lg-0 pe-lg-5 mt-5 mt-lg-0 mt-md-0'>
                                <div className="input-group mb-3  border border-white rounded-1 ">
                                    <span className="bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill text-danger" viewBox="0 0 16 16">
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="setbgImg text-white border-0 form-control" placeholder='Enter Name' onChange={onChange} value={input.name} id="name" name="name" aria-describedby="emailHelp" />


                                </div>
                                <div className="input-group mb-3  border border-white rounded-1 ">
                                    <span className="bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building-fill-add text-danger" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z" />
                                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.493 4.493 0 0 0 12.5 8a4.493 4.493 0 0 0-3.59 1.787A.498.498 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.476 4.476 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="setbgImg text-white border-0 form-control" placeholder='Enter Firm Name' onChange={onChange} value={input.firmname} id="firmname" name="firmname" aria-describedby="emailHelp" />

                                </div>
                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className="bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill text-danger" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="setbgImg text-white border-0 form-control" placeholder='Enter Api Key' onChange={onChange} value={input.apikey} id="apikey" name="apikey" aria-describedby="emailHelp" />

                                </div>
                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className=" bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill text-danger" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg></span>
                                    <input autoComplete='off' onKeyUp={keypress} type="text" className="setbgImg text-white  border-0 form-control" placeholder='Enter Contact' minLength={10} maxLength={10} onChange={onChange} value={input.contact} id="contact" name="contact" />

                                </div>
                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className=" bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-lock2 text-danger" viewBox="0 0 16 16">
                                        <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0zM7 7v1h2V7a1 1 0 0 0-2 0z" />
                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="setbgImg text-white  border-0 form-control" placeholder='Create New Password' minLength={6} onChange={onChange} value={input.password} id="password" name="password" />

                                </div>
                                <div className="input-group mb-3 text-danger justify-content-center">
                                    {error.error}
                                </div>
                                <div className="d-flex gap-2 mt-2 justify-content-center">
                                    <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " disabled={boolValue} type="submit">SAVE CHANGES</button>
                                    <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " onClick={() => cancelBtnClick()} type='button' disabled={boolValue}>CANCEL</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
    )
}

export default UserSetting
