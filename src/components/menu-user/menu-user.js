import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { redirect } from '../../store/actions';

export default function MenuUser() {
  const [anchorEl, setAnchorEl] = useState(null);
  const username = useSelector(state =>{ //console.log('MenuUser', state, state.users, state.users.user, state.users.user);
                                        return state && state.users && state.users.user && state.users.user.username ? state.users.user.username : null});
  //console.log('username', username)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    //console.log('handleClose', value);
    if(value === 'Logout') {      
      localStorage.setItem('@token/bexsit', null);
      redirect('/login');
    }
    setAnchorEl(null);
  };

  return username ?  (
    <div>
      <Button
            onClick={handleClick}
            endIcon={<AccountCircleIcon />}
        >
          {username}
        </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose('Logout')}>Logout</MenuItem>
      </Menu>
    </div>
  ) : null;
}