import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useAuth } from '@/hooks/useAuth';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../../../components/Copyright/Copyright';
import { FieldArray, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getSizes } from '@/features/sizes/sizesSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ArrayInterpolation } from '@emotion/react';
import { RootState } from '../../../../../store';
import Loader from '@/app/Loader';
import Divider from '@mui/material/Divider';
import { Endpoint } from '@/routes/routes';
import Swal from 'sweetalert2';
import { SizeI } from '@/sehostypes/Size';
/* VALIDACIONES */

/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function DeleteSize() {
    const dispatch = useDispatch()
    const sizes: any = useSelector((state: RootState) => state.sizes.sizes)
    useEffect(() => {
        dispatch(getSizes())
    }, [])
    const auth = useAuth()
    const sizesTraidas: Array<string> = sizes.map((c: SizeI) => c.size.toString())
    const validations = yup.object({
        id: yup.number().required()
    });
    /* HOOKS */
    const formik = useFormik({
        initialValues: {  //!import correcto de los size y las sizes
            id: '',
        },
        validationSchema: validations,
        onSubmit: async (values, { resetForm }) => {
            const post: any = await axios.delete(Endpoint.postSizes, { data: values, headers: { "Authorization": `bearer ${auth.token}` } })
            Swal.fire({
                text: 'Sizes deleted successfully'
            })
            resetForm()
        },
    })
    if (!sizes.length) {
        return (
            <h1> </h1>
        )
    } else {
        return (
            <FormikProvider value={formik}>
                <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        {/* size */}
                        <Typography component='h1' variant='h5'>
                            Delete Size
                        </Typography>
                        <Divider style={{ width: '100%' }} variant='middle' />
                        <Box component='form' noValidate onSubmit={formik.handleSubmit} method='POST' action='http://localhost:3001/products' encType='multipart/form-data' sx={{ mt: 3 }}>
                            <Grid spacing={2}>
                                <Grid pl={2}>
                                    <React.Fragment>
                                        <Grid item>
                                            <Typography variant="body2">Size</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Select style={{ width: '100%' }} onChange={formik.handleChange} name={`id`}>
                                                {sizes?.map((s: any) => {
                                                    return (
                                                        <MenuItem value={s.id}>{s.size}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </Grid>
                                    </React.Fragment>
                                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                                        Delete size
                                    </Button>
                                </Grid>
                                {/* END */}
                                <Grid item xs={12}>
                                    {/* <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              /> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Container >
            </FormikProvider >
        )
    }
}
