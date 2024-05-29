import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
<nav className='navbar navbar-dark bg-dark navbar-expand-sm'  
>
<div className='container'>
<Link to={'/'}className='navbar-brand'>
{/* <i class="fa-solid fa-mobile fa-beat"  ></i> */}

  <i class="fa-solid fa-address-book fa-beat "
    style={{color: '#e68a44'}}
  ></i>
     <span className='ms-2'> Contact</span><span style={{color: '#e68a44'}}> Vault</span></Link>
</div>
 </nav>   
 </div>
  )
}

export default Navbar
