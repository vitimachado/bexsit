import React, { useEffect, useState } from 'react';
import { Logo } from '../../components/logo/logo';
import TabsBar from '../../components/tabs/tabs';
import { getTabs } from '../../store/actions';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuUser from '../../components/menu-user/menu-user';
import './navbar.css';
import { useLocation } from "react-router-dom";

export default function Navbar() {

  let location = useLocation();
  //console.log('llllllllllllll aaaaaaaaa location', location);

  const [scrollPosition, setSrollPosition] = useState(0);
  const [tabs, setTabs] = useState();
    const styles = {
        top0: 0,
        topN50: -50
    }    

    useEffect(() => {
      //getTabs().then((res) => { if(res && !res.error ) setTabs(res.data); }/* dispatch({ type: UPDATE_LIST, data: res, page: '/cards' }) */);


      window.addEventListener('scroll', handleScroll, { passive: true });    
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleScroll = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);
    };
    
    let data = location.pathname === '/login' ? (<></>) : (
      <nav className="navbar navbar-expand-lg card-1 nav-background" style={{ 'top': scrollPosition == 0 ? styles.top0 : styles.topN50 }}>       
        <Logo />
        <TabsBar tabs={tabs}/>
        <div className="collapse navbar-collapse search-container" id="navbarSearch">
          <MenuUser />    
        </div>
      </nav>
    );

    return data;
}