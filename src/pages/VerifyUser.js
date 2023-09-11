import React, { useState, useContext, useEffect } from 'react';
import context from '../context/Context';
import { useNavigate } from 'react-router-dom';



const VerifyUser = () => {
    let active;
    const navigate = useNavigate();
    const a = useContext(context);
    const { setError, error, verifyUser, activeStatusUser, handleLogout,editAccess, seteditAccess } = a;
    const [password, setPassword] = useState('')
    const onChange = (e) => {
        setPassword(e.target.value)
        setError('')
    }

    // for login or submit
    const submit = async (e) => {
        e.preventDefault();

        let result = await verifyUser(password);
        if (result.success) {
            seteditAccess(true)
            navigate('/accountSetting')
            // return <UserSetting />
        }
        else {
            seteditAccess(false)
            setError(result)
            navigate('/setting')

        }

    }
    useEffect(() => {
        seteditAccess(false)
        if (!localStorage.getItem('token')) {

            handleLogout()
            navigate('/login');


        }
        else {
            active = JSON.parse(localStorage.getItem('user')).active;
            if (active === false) {
                setError({ 'error': 'YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT' })
                handleLogout()
                navigate('/login');
            }
            else {
               
                activeStatusUser()

            }

        }


    }, [])

    return (
        (!localStorage.getItem('token')) || active === false ? "" :
        <div className='container mt-5 px-5'>
            <div className='row'>

                <div className='col-lg-4 offset-lg-4 card setbgImg bg-dark bg-opacity-75 mt-5'  >
                    <div className='card-body text-center px-3 pt-4'>
                        <form onSubmit={submit}>
                            <h1 className='text-center  mb-5 text-danger'> Verification </h1>


                            <div className="input-group mb-3 border border-white rounded-1">
                                <input type='password' autoComplete='off' className="setbgImg form-control border-0 text-white " onChange={onChange} placeholder="Enter Password" name="password" value={password} />
                            </div>
                            <div className="input-group mb-3 text-danger justify-content-center ">
                                {error.error ? error.error : '' || error.errors ? error.errors[0].msg : ''}
                            </div>


                            <div className="d-grid  gap-2 mt-2">
                                <button className='btn text-white border-0 mb-4 btnlogIn' disabled={!password ? true : false} type="submit">Verify</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VerifyUser
