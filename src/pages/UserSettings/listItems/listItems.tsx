import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink, useNavigate } from 'react-router-dom';
import { PrivatesRoutes, PublicRoutes } from '@/routes/routes';
import PersonIcon from '@mui/icons-material/Person';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logicDeleteUser } from '@/features/admin/adminSlice';
import { useAuth } from '@/hooks/useAuth';
import { resetUser } from '@/features/auth/authSlice';
import { resetUserInfo } from '@/features/user/userSlice';
import { reset } from '@/features/cart/cartApiSlice';

export const MainListItems = () => {
  const {id} = useAuth()
  const dispatch: any = useDispatch()
  const navigate = useNavigate()
  
  const deleteAccount = () => {
    Swal.fire({
      text: 'Do you really want to delete your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!',
    }).then(res => {
      if (res.isConfirmed) {
        dispatch(logicDeleteUser(id))
        dispatch(reset());
        dispatch(resetUser());
        dispatch(resetUserInfo());
        Swal.fire({
          icon:'info',
          text: 'You will be redirect to home',
          timer: 1000
        })
        setTimeout(() => {
          navigate(PublicRoutes.home);
        }, 1200);
      }
    })
  }
  
  return (<React.Fragment>
    {/* ----- */}
    <NavLink to={PrivatesRoutes.profile}>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </ListItemButton>
    </NavLink>
    {/* ----- */}
    <NavLink to={PrivatesRoutes.userOrders}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Orders' />
      </ListItemButton>
    </NavLink>
    {/* Address */}
    <NavLink to={PrivatesRoutes.addaddress}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Address' />
      </ListItemButton>
    </NavLink>
    {/*  */}
    <NavLink to={PrivatesRoutes.favorites}>
      <ListItemButton>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary='Favorites' />
      </ListItemButton>
    </NavLink>
    {/*  */}
    <ListItemButton onClick={deleteAccount}>
      <ListItemIcon>
        <DeleteForeverIcon />
      </ListItemIcon>
      <ListItemText primary='Delete Account' />
    </ListItemButton>
  </React.Fragment>)
}
