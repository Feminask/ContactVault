import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../services/ContactServices';

function AddContact() {

  let navigate =  useNavigate();


let [state,setState] = useState({
  loading: false,
  contact : {
        name : '',
        photo : '',
        mobile: '',
        email : '',
        company : '',
        title : '',
        groupId : ''
  },
  groups : [],
  errorMessage : ""
});

let updateInput = (event) => {
  setState({
    ...state,
    contact:{
      ...state.contact,
      [event.target.name] : event.target.value
    }
  });
};


useEffect(() => {

  const fetchGroups = async () => {
    try {
      setState ({ ...state, loading: true });
      let response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data
        });
    
    } catch (error) {
      
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: "Failed to fetch groups"
        }));
   
    }
  };

  fetchGroups();

}, []);


let submitForm = async(event)=>{
     event.preventDefault();
     try{
      let response = await ContactService.createContact(state.contact);
      if (response){
        navigate("/contacts/list",{replace:true});
      }
     }
     catch(error){
setState({...state, errorMessage : error.message});
navigate("/contacts/add",{replace:false});

     }

};


let{loading , contact , groups ,errorMessage} = state;

  return (
    <div>
      {/* <pre>{JSON.stringify(state.contact)}</pre> */}
      <section className='add-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4  fw-bold"style={{color:'#3ecbcb'}}>
                Create Contact
              </p>

             <p className=''>
             Welcome to the contact creation page! Craft your connections: Create new contacts and open doors to new possibilities.           </p>
            </div>
          </div>
          <div className="row">
          <div className="col-md-6 mt-3 align-items-center">
                  <img src={contact.photo || 'https://camo.githubusercontent.com/4959ad8bf1b603d7e025c2cfd84b70ede747602b04648c79e8cba6bd9ebf9d4d/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6e61696a706f6c6c2f696d6167652f75706c6f61642f76313637393333343438362f49636f6e73253230616e64253230466c617469636f6e732f70726f66696c655f75646d3067312e676966'} alt="" className='contact-img' />
                </div>

            <div className="col-md-4 mt-3">
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">

                  <input
                  required={true}
                  name='name'
                  value={contact.name}
                  onChange={updateInput}
                   type="text"className='form-control' placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input
                                    required={true}
                                    name='photo'
                                    value={contact.photo}
                                    onChange={updateInput}
                  
                   type="text"className='form-control' placeholder='Photo Url' />
                </div>
                <div className="mb-2">
                  <input type="tel"
                                    required={true}
                                    name='mobile'
                                    value={contact.mobile}
                                    onChange={updateInput}
                  className='form-control' placeholder='Mobile' />
                </div>
                <div className="mb-2">
                  <input
                                    required={true}
                                    name='email'
                                    value={contact.email}
                                    onChange={updateInput}
                  
                   type="email"className='form-control' placeholder='Email' />
                </div>
                <div className="mb-2">
                  <input
                                    required={true}
                                    name='company'
                                    value={contact.company}
                                    onChange={updateInput}
                   
                  type="text"className='form-control' placeholder='Company Name' />
                </div>
                <div className="mb-2">
                  <input
                                    required={true}
                                    name='title'
                                    value={contact.title}
                                    onChange={updateInput}
                  
                   type="text"className='form-control' placeholder='Title' />
                </div>
                <div className="mb-2">
                  <select
                                    required={true}
                                    name='groupId'
                                    value={contact.groupId}
                                    onChange={updateInput}
                   
                   className='form-control'>
                    <option value="">Select a Group</option>
                    {
                      groups.length>0  &&
                      groups.map(group => {
                        return(
                          <option key={group.id}value={group.id}>{group.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input style={{backgroundColor:"#3ecbcb"}} type="submit"className='btn btn__effect ' value="Create" />
                  <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddContact
