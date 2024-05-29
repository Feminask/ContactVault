// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { ContactService } from '../../services/ContactServices';

// function EditContact() {

//   let navigate = useNavigate()

//   let {contactId} = useParams();
// let [state,setState]= useState({
//      loading : false,
//      contact : {
//       name : '',
//       photo : '',
//       mobile : '',
//       email : '',
//       company : '',
//       title : '',
//       groupId : ''
//      },
//      groups : [],
//      errorMessage : ''
// });

// useEffect(() => {

//   const fetchContact = async () => {
//     try {
//       setState({ ...state, loading: true });
//       let response = await ContactService.getContact(contactId);
//       let groupResponse = await ContactService.getGroups();
//       setState({
//         ...state,
//         loading: false,
//         contact: response.data,
//         groups:groupResponse.data
//       });

//     } catch (error) {
//         setState({
//           ...state,
//           loading: false,
//           errorMessage: 'Failed to fetch contact details'
//         });
//     }
//   };

//   fetchContact();

// }, [contactId]);

// let updateInput = (event) => {
//   setState({
//     ...state,
//     contact: {
//       ...state.contact,
//       [event.target.name]: event.target.value
//     }
//   });
// };

// let submitForm =async(event) => {
// event.preventDefault();
// try{
//   let response = await ContactService.updateContact(state.contact,contactId);
//   if (response){
//     navigate("/contacts/list",{replace:true});
//   }
//  }
//  catch(error){
// setState({...state, errorMessage : error.message});
// navigate(`/contacts/edit/${contactId}`,{replace:false});

//  }


// };


// let{loading, contact ,groups , errorMessage} = state;
//   return (
//     <div>
//       {/* <pre>{JSON.stringify(contact)}</pre> */}
//       {
//         loading ?<div className='d-flex align-items-center'> <i class="fa-duotone fa-spinner fa-spin"></i></div>
//         : <div>
//       <section className='add-contact p-3'>
//         <div className="container">
//           <div className="row">
//             <div className="col">
//               <p className="h4  fw-bold"style={{color:'#007BFF'}}>
//                 Edit Contact
//               </p>
//              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, fuga natus. Inventore repudiandae enim odit rem laboriosam officia doloremque, blanditiis autem nesciunt incidunt repellat debitis suscipit ratione consectetur? Sapiente, quidem?</p>
//             </div>
//           </div>
//           <div className="row align-items-center">
//             <div className="col-md-4">
//               <form action="" onSubmit={submitForm}>
//                 <div className="mb-2">
//                   <input
//                   required='true'
//                   name='name'
//                   value={contact.name}
//                   onChange={updateInput}
//                     type="text"className='form-control' placeholder='Name' />
//                 </div>
//                 <div className="mb-2">
//                   <input
//                   required='true'
//                   name='photo'
//                   value={contact.photo}
//                   onChange={updateInput}

//                    type="text"className='form-control' placeholder='Photo Url' />
//                 </div>
//                 <div className="mb-2">
//                   <input
//                                     required='true'
//                                     name='mobile'
//                                     value={contact.mobile}
//                                     onChange={updateInput}
                  
//                    type="tel"className='form-control' placeholder='Mobile' />
//                 </div>
//                 <div className="mb-2">
//                   <input 
//                                     required='true'
//                                     name='email'
//                                     value={contact.email}
//                                     onChange={updateInput}
                  
//                   type="email"className='form-control' placeholder='Email' />
//                 </div>
//                 <div className="mb-2">
//                   <input
//                                                       required='true'
//                                                       name='company'
//                                                       value={contact.company}
//                                                       onChange={updateInput}
                  
//                    type="text"className='form-control' placeholder='Company Name' />
//                 </div>
//                 <div className="mb-2">
//                   <input
//                                                       required='true'
//                                                       name='title'
//                                                       value={contact.title}
//                                                       onChange={updateInput}
                  
//                    type="text"className='form-control' placeholder='Title' />
//                 </div>
//                 <div className="mb-2">
//                   <select
//                                                       required='true'
//                                                       name='groupId'
//                                                       value={contact.groupId}
//                                                       onChange={updateInput}
                  
//                    className='form-control'>
//                     <option value="">Select a Group</option>
//                     {
//                       groups.length>0 &&
//                       groups.map(group =>{
//                         return(
//                           <option key={group.id}value={group.id}>{group.name}</option>
        
//                         )
//                       })
//                     }
//                   </select>
//                 </div>
//                 {/* <div className="mb-2">
//                   <input type="submit"className='btn btn-primary' value="Update" />
//                   <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
//                 </div> */}

//               </form>
//             </div>
//             <div className="col-md-6">
//               <img src={contact.photo} alt="" className='contact-fluid'/>
//             </div>
//             <div className="mb-2 mt-2">
                  // <input type="submit"className='btn btn-primary' value="Update" />
//                   <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
//                 </div>

//           </div>
//         </div>
//       </section>

//         </div>
//       }
//     </div>
//   )
// }

// export default EditContact

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../services/ContactServices';
import { Button } from 'bootstrap';


function EditContact() {
  let navigate = useNavigate();
  let { contactId } = useParams();
  
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    groups: [],
    errorMessage: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setState(prevState => ({
          ...prevState,
          loading: false,
          contact: response.data,
          groups: groupResponse.data
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: 'Failed to fetch contact details'
        }));
      }
    };

    fetchContact();
  }, [contactId]);

  let updateInput = (event) => {
    setState(prevState => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [event.target.name]: event.target.value
      }
    }));
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, contactId);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        errorMessage: error.message
      }));
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;

  return (
    <div>
      {loading ? (
        <div className='d-flex align-items-center'>
          <i className="fa-duotone fa-spinner fa-spin"></i>
        </div>
      ) : (
        <div>
          <section className='add-contact p-3'>
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 fw-bold" style={{ color: '#ca958d' }}>
                    Edit Contact
                  </p>
                  <p className=''>
                  Empower your network: Seamlessly update your contact details and ensure your connections are always up-to-date.                  </p>
                </div>
              </div>
              <div className="row align-items-center">
              <div className="col-md-6 mt-3">
                  <img src={contact.photo} alt="" className='contact-img .card__effect' />
                </div>

                <div className="col-md-4 mt-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required
                        name='name'
                        value={contact.name}
                        onChange={updateInput}
                        type="text"
                        className='form-control'
                        placeholder='Name'
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name='photo'
                        value={contact.photo}
                        onChange={updateInput}
                        type="text"
                        className='form-control'
                        placeholder='Photo Url'
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name='mobile'
                        value={contact.mobile}
                        onChange={updateInput}
                        type="tel"
                        className='form-control'
                        placeholder='Mobile'
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name='email'
                        value={contact.email}
                        onChange={updateInput}
                        type="email"
                        className='form-control'
                        placeholder='Email'
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name='company'
                        value={contact.company}
                        onChange={updateInput}
                        type="text"
                        className='form-control'
                        placeholder='Company Name'
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name='title'
                        value={contact.title}
                        onChange={updateInput}
                        type="text"
                        className='form-control'
                        placeholder='Title'
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required
                        name='groupId'
                        value={contact.groupId}
                        onChange={updateInput}
                        className='form-control'
                      >
                        <option value="">Select a Group</option>
                        {groups.length > 0 &&
                          groups.map(group => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                    {/* <input type="submit"className='btn btn-outline-info' value="Update" /> */}
                    <button style={{backgroundColor:"#ca958d"}} type='submit'className='btn btn__effect'>Update</button>
    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default EditContact;

