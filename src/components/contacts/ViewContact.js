import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../../services/ContactServices';

let ViewContact=()=> {

let {contactId} = useParams();

let [state,setState] = useState({
  loading : false,
  contact : {},
  errorMessage : "",
  group : {}
});

useEffect(() => {
  const fetchContact = async () => {
      try {
          setState( { ...state, loading: true });
          let response = await ContactService.getContact(contactId);
          let groupResponse = await ContactService.getGroup(response.data);
          // console.log(response.data);
          setState({ ...state, 
            loading: false,
             contact: response.data,
             group: groupResponse.data
            });
      } catch (error) {
          setState({ ...state, loading: false, errorMessage: error.message });
      }
  };

  fetchContact();
}, [contactId]);
 let{loading , contact , errorMessage,group}=state;
  return (
    <div>
      <section className='view-contact-intro p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3  fw-bold"style={{color:'#e28743'}}>
                View Contact
              </p>
              <p className=''>
              Check out your crew: Peek into your contacts and keep those connections groovin'!</p>
            </div>
          </div>
        </div>
      </section>
      {
        loading ?      <div className='d-flex align-items-center'><i class="fa-duotone fa-spinner fa-spin"></i></div>
 : <div>
  {
    Object.keys(contact).length>0 &&  Object.keys(group).length > 0 &&
    <section className='view-contact mt-3'>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
           <img src={contact.photo} alt="" className='contact-img'/>
        </div>
        <div className="col-md-8 mt-2">
        <ul className='list-group'>
                            <li className='list-group-item list-group-item-action '>
                               Name:<span className='fw-bold'>{contact.name}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                               Mobile:<span className='fw-bold'>{contact.mobile}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                               Email:<span className='fw-bold'>{contact.email}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                               Company Name:<span className='fw-bold'>{contact.company}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                               Title:<span className='fw-bold'>{contact.title}</span>
                            </li>
                            <li className='list-group-item list-group-item-action'>
                               Group:<span className='fw-bold'>{group.name}</span>
                            </li>

                        </ul>

        </div>
        <div className='row'>
          <div className="col">
            <Link to={'/contacts/list'}className='btn btn__effect 'style={{backgroundColor:'#e28743'}}

            >Back
            </Link>
          </div>

        </div>
      </div>
    </div>
  </section>

  }

 </div>
      }
    </div>
  )
}

export default ViewContact