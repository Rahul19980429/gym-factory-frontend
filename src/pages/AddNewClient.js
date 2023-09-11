import React, { useEffect, useContext } from 'react'
import Client from '../MyComponents/Client'
import Context from '../context/Context';
import FormClient from '../MyComponents/FormClient';
import Spinner from '../MyComponents/Spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchClient, setFilterClientData } from '../redux/slices/ClientSlice'

const AddNewClient = () => {
    const dispatch = useDispatch();
    const { data:client, status } = useSelector((state) => state.client)

    let navigate = useNavigate();
    let active;
    const a = useContext(Context);
    const { setError, handleLogout, activeStatusUser,seteditAccess } = a;
    // fatch all clients

    const filterClient = async (e) => {
        let data;
        e.preventDefault();
        let searchinput = await e.target.value;
        if (searchinput === "") {
           dispatch(fetchClient())
        }
        
        if (searchinput !== "") {
          data = client.filter((data) => (data.name.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1 || data.contact.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1));
          if (data.length === 0) {
             dispatch(fetchClient())
          }
        }
    
    
        if (data) {
          dispatch(setFilterClientData(data))
        }
      }
    useEffect(() => {
        seteditAccess(false);
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
                dispatch(fetchClient())
                activeStatusUser()
            }

        }


    }, [])

    if(status==='loading'){
        return(
            <Spinner/>
        )
    }
    return (
        (!localStorage.getItem('token')) || active === false ? "" :
                <div className='container py-3'>
                    <div className='row px-3'>
                        <div className='col-lg-4 p-5 my-5 card setbgImg bg-dark bg-opacity-75 '>

                            <h4 className='my-3 text-center text-lg-start text-danger' > CREATE NEW CLIENT </h4>
                            <FormClient />

                        </div>
                        <div className='col-lg-6 offset-lg-2'>
                            <div className='row mt-3'>
                                <div className='col-lg-5'>
                                    <h4 className=' text-center text-lg-start text-danger' > ADDED CLIENT</h4>
                                </div>

                                <div className='col-lg-7'>

                                    <input className="searchinputSet form-control me-2 setbgImg btnlogIn border-0 text-white border-danger " onKeyUp={filterClient} type="text" placeholder="Search" aria-label="Search" />
                                </div>

                            </div>


                            <hr className='mb-0' />
                            <div className='setClient px-1 px-lg-3 py-2'>
                                {client.length === 0 ? <h5 className='text-danger'>NOT FOUND</h5> :
                                    client.map((clientdata) => {
                                        return (
                                            <Client data={clientdata} key={clientdata._id} />
                                        )

                                    }).reverse()}
                            </div>
                        </div>
                    </div>

                </div>
    )
}

export default AddNewClient
