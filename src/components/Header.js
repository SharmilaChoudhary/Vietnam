import React from 'react'
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import "../App.css";
import {Link} from "react-router-dom";
import { ConnectKitButton } from 'connectkit';
function Header() {
  return (
   
      <header>
        <div className="leftH">
          <img src={Logo} alt='logo' className='logo'/>
          <Link to="/" className="link">
          <div className='headerItem'>Stake</div>  </Link>
          <Link to="/token" className="link">
          <div className='headerItem'> Profile </div></Link>
           </div>
           <div className='rightH'>
           
            <div  >
    
            <ConnectKitButton />
            </div>
           </div>

      </header>

   
  )
}

export default Header