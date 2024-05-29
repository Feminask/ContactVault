import React, { useEffect, useState } from 'react';
import './New.css';
import { Link } from 'react-router-dom';
import { ContactService } from '../../services/ContactServices';

function New() {
    let [query, setQuery] = useState({
        text: ""
    });

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        errorMessage: ''
    });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setState(prevState => ({ ...prevState, loading: true }));
                let response = await ContactService.getALLContacts();
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
    let clickDelete = async (contactId) => {
        try {
            let response = await ContactService.deleteContact(contactId);
            if (response) {
                setState(prevState => ({ ...prevState, loading: true }));
                let response = await ContactService.getALLContacts();
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
    let sortContacts = () => {
        const sortedContacts = [...state.filteredContacts].sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        setState(prevState => ({
            ...prevState,
            filteredContacts: sortedContacts
        }));
    };

    // Search contacts
    let searchContacts = (event) => {
        setQuery({ ...query, text: event.target.value });
        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setState(prevState => ({
            ...prevState,
            filteredContacts: theContacts
        }));
    };

    let { loading, filteredContacts } = state;

    return (
        <div className="card-container">
            {filteredContacts.map(contact => (
                <div className="card" key={contact.id}>
                    <div className="card__circle card__circle1"></div>
                    <div className="card__circle card__circle2"></div>

                    <div className="card__glass">
                        <img src={contact.photo} alt="" className="card__img" />

                        <div className="card__data">
                            <h3 className="card__title">{contact.name}</h3>
                            <span className="card__profession">{contact.mobile}</span>
                        </div>

                        <a href="#" className="card__button">{contact.email}</a>

                        <div className="card__social">
                            <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default New;