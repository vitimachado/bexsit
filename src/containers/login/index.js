import React, { useEffect, useState } from 'react';
import { getTabs, verifyToken, redirect } from '../../store/actions';
import Divider from '@material-ui/core/Divider';
import {CardLayout} from '../../components/card-layout/card-layout';
import {LoginForm} from '../../components/login-form/login-form';
import { Logo } from '../../components/logo/logo';
/* import './navbar.css'; */

export default function Login() {

  const [tabs, setTabs] = useState();
  useEffect(() => {
    let token = localStorage.getItem('@token/bexsit');
    verifyToken(token)
    .then(verify => { if(verify.statusCode === '202') redirect('/'); } );
  });
    
  return (
      <>
        <CardLayout classNames={{ card: "vertical-center" }}>
          <div style={{ width: '-webkit-fill-available', marginBottom: 30 }} className="row">
            <Logo styles={{ box: {textAlign: 'center', margin: 'auto', width: 'auto'}, span: { fontSize: '-webkit-xxx-large'} }}/>
          </div>                       
          <div style={{ width: '-webkit-fill-available' }} className="row">
            <LoginForm />
            <Divider orientation="vertical" />
            <LoginForm create={true}/>
          </div>                            
        </CardLayout>
      </>
    );
}