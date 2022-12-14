import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { TextField, Paper, Button, Backdrop, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import { PublicRoutes, URL } from '@/routes/routes';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const navigate = useNavigate();

  const handleOpenBackdrop = () => setOpenBackdrop(true);
  const handleCloseBackdrop = () => setOpenBackdrop(false);

  const onChange = (e: any) => setEmail(e.target.value);
  const onClick = () => {
    handleOpenBackdrop();

    axios
      .post(`${URL.baseURL}/recovery_password`, { email })
      .then(() => {
        handleCloseBackdrop();
        Swal.fire({
          title: 'Email successfully sended',
          text: 'Please check your email box and follow the instructions',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate(PublicRoutes.home);
        }, 2200);
      })
      .catch(() => {
        handleCloseBackdrop();
        Swal.fire({
          title: 'Error',
          text: 'Oops, something went wrong!',
          icon: 'error',
          confirmButtonText: 'Try Again!',
        });
      });
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={openBackdrop}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Paper elevation={10} sx={{ width: '80%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              height: 200,
            }}>
            <TextField
              id='email'
              variant='outlined'
              label='Enter your email'
              color='secondary'
              value={email}
              onChange={onChange}
            />

            <Button variant='contained' endIcon={<SendIcon />} onClick={onClick}>
              Recover Account
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default ForgotPassword;
