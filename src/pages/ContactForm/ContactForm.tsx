import Copyright from '@/components/Copyright/Copyright';
import { PublicRoutes } from '@/routes/routes';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validations = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  message: yup
    .string()
    .min(20, 'Message should be of minimum 20 characters length')
    .max(240, 'Message should be of max 240 characters length')
    .required('Please write a message'),
});

export default function ContactForm() {
  const [disabledButton, setDisabledButton] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    validationSchema: validations,
    onSubmit: values => {
      setDisabledButton(true);

      const promise = fetch('https://formsubmit.co/ajax/andeveling@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      })
        .then(response => response.json())
        .catch(error => console.log(error))
        .finally(() => {
          setTimeout(() => navigate(PublicRoutes.home), 1000);
          setDisabledButton(false);
        });

      toast.promise(promise, {
        loading: <b>Enviando datos</b>,
        success: <b>La información fue enviada satisfactoriamente</b>,
        error: <b>Error ocurrido durante la ejecución</b>,
      });
    },
  });

  return (
    <Container component='main' maxWidth='sm'>
      <Toaster position='bottom-left' reverseOrder={false} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h1' variant='h5'>
          Contact us
        </Typography>
        <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='message'
                label='Message'
                type='text'
                multiline
                minRows={5}
                maxRows={10}
                id='message'
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            disabled={disabledButton}
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            sx={{ mt: 3, mb: 2 }}>
            Send
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item></Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
