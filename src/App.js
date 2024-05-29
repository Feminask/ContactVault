import { Route, Routes ,Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ContactList from './components/contacts/ContactList';
import EditContact from './components/contacts/EditContact';
import ViewContact from './components/contacts/ViewContact';
import AddContact from './components/contacts/AddContact';
import New from './components/contacts/New';
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/'element={<Navigate to={'/contacts/list'}></Navigate>}></Route>
        <Route path='/contacts/list'element={<ContactList></ContactList>}></Route>
        <Route path='/contacts/add'element={<AddContact></AddContact>}></Route>
        <Route path='/contacts/edit/:contactId'element={<EditContact></EditContact>}></Route>
        <Route path='/contacts/view/:contactId'element={<ViewContact></ViewContact>}></Route>


      </Routes>
      {/* <New></New> */}
    </div>
  );
}

export default App;
