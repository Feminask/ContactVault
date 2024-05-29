
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactService } from '../../services/ContactServices';
import './ContactList.css';

function ContactList() {
  const [query, setQuery] = useState({
    text: ""
  });

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(4);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        const response = await ContactService.getALLContacts();
        setState(prevState => ({
          ...prevState,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: error.message
        }));
      }
    };

    fetchContacts();
  }, []);

  // Delete contact
  const clickDelete = async (contactId) => {
    try {
      const response = await ContactService.deleteContact(contactId);
      if (response) {
        setState(prevState => ({ ...prevState, loading: true }));
        const response = await ContactService.getALLContacts();
        setState(prevState => ({
          ...prevState,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        }));
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        errorMessage: error.message
      }));
    }
  };

  // Sort contacts alphabetically
  const sortContacts = () => {
    const sortedContacts = [...state.filteredContacts].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setState(prevState => ({
      ...prevState,
      filteredContacts: sortedContacts
    }));
  };

  // Search contacts
  const searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    const theContacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setState(prevState => ({
      ...prevState,
      filteredContacts: theContacts
    }));
  };

  const { loading, filteredContacts } = state;

  // Get current contacts
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <section className='contact-search p-3'>
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">Contact<span style={{color: '#e68a44'}}> Vault</span>
<span className='add-main ms-5'>
                    <Link to={'/contacts/add'} className='btn ms-2 add-button' >
                      <i className='fa fa-plus-circle  me-2' style={{ color: '' }}></i> New
                    </Link>
  
</span>      
          </p>
                <p className=''style={{fontFamily:"'Montserrat', 'sans-serif'"}}>
                "Welcome to the Contact Vault, where every click unlocks a new dimension of connection! Ready to dive into the matrix of your contacts? Let's roll! Remember, with great contacts come great stories. So, buckle up and let's navigate through the web of connections!"                  </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className='row' onSubmit={e => e.preventDefault()}>
                  <div className="col">
                    <div className="mb-2 search-container">
                      <input
                        value={query.text}
                        onChange={searchContacts}
                        type="text" className='form-control search-input' placeholder=' Search Name' />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <button style={{backgroundColor:''}} onClick={sortContacts} className='btn btn-outline-dark'>Sort A-Z</button>
{/* <span className='add-sub'>
                        <Link to={'/contacts/add'} className='btn ms-2 add-button' style={{ backgroundColor: '#e68a44', color: 'white' }}>
                        <i className='fa fa-plus-circle  me-2' style={{ color: 'white' }}></i> New
                      </Link>
  
</span> */}
                    </div>
<>
  
</>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        loading ?
          <div className='d-flex align-items-center'><i className="fa-duotone fa-spinner fa-spin"></i></div>
          :
          <div>
            <section className='contact-list'>
              <div className="container">
                <div className="row">
                  {
                    currentContacts.map(contact => {
                      return (
                        <div className="col-md-6" key={contact.id}>
                          <div className="card my-2 shadow card__effect "style={{backgroundColor:'#b2d6eb'}}>
                            <div className="card-body">
                              <div className='row align-items-center d-flex justify-content-around'>
                                <div className="col-md-4">
                                  <img src={contact.photo} alt="" className='contact-img' />
                                </div>
                                <div className="col-md-7 mt-2">
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
                                  </ul>
                                </div>
                                <div className="col-md-1 d-flex flex-column align-items-center icons">
                                  <Link to={`/contacts/view/${contact.id}`} className='btn  my-1'style={{backgroundColor:'#f7c298'}}>
                                    <i className='fa fa-eye'></i>
                                  </Link>
                                  <Link to={`/contacts/edit/${contact.id}`} className='btn  my-1'style={{backgroundColor:'#ca958d'}}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </Link>
                                  <button className='btn  my-1' onClick={() => clickDelete(contact.id)}style={{backgroundColor:'#aa4e4d'}}>
                                    <i className='fa fa-trash'></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </section>
            {/* Pagination */}
            <nav>
              <ul className='pagination justify-content-center  mt-5'>
                {Array.from({ length: Math.ceil(filteredContacts.length / contactsPerPage) }, (_, i) => (
                  <li key={i} className='page-item'>
                    <button onClick={() => paginate(i + 1)} className='page-link'style={{backgroundColor:'#b2d6eb',color:'white'}}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
      }
    </div>
  );
}

export default ContactList;


