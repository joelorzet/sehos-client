import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useAuth } from '@/hooks/useAuth';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../../components/Copyright/Copyright';
import { FieldArray, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getSizes } from '@/features/sizes/sizesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery, useGetSeasonsQuery } from '@/features';
import axios from 'axios';
import { ArrayInterpolation } from '@emotion/react';
import { CategoryI } from '@/sehostypes/Category'; 
import { categories, getCategories } from '@/features/category/categoriesSlice';
import { RootState } from '../../../../store';
import Loader from '@/app/Loader';
import { Endpoint } from '@/routes/routes';
import { checkGridRowIdIsValid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
/* VALIDACIONES */
// 
/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function DeleteCategory() {
    const auth = useAuth()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    const categorias: any = useSelector((state: RootState) => state.categories.categories)

    const handleSubmitC: any = async (values: any) => {
        console.log(values) //ver si el fetch está correcto 
        const axiosP = await axios.delete(Endpoint.postCategories, { data: values, headers: { "Authorization": `bearer ${auth.token}` } })
        console.log(axiosP);
    }
    const categoriasTraidas: Array<string> = categorias.map((c: CategoryI) => c.category)
    const validations = yup.object({
        id:yup.number().required('please select at least one')
    });
    /* HOOKS */
    const formik = useFormik({
        initialValues: {  //!import correcto de los size y las categories
            id: 1,
        },
        validationSchema: validations,
        onSubmit: async (values,{resetForm}:any) => {
            handleSubmitC(values)
            Swal.fire({
                text:'Categories deleted successfully'
            })
            resetForm()
        },
    })
    if (!categorias.length) {
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
                        {/* Category */}
                        <Typography component='h1' variant='h5'>
                            Delete category
                        </Typography>
                        <Divider style={{ width: '100%' }} variant='middle' />
                        <Box component='form' noValidate onSubmit={formik.handleSubmit} method='POST' action='http://localhost:3001/products' encType='multipart/form-data' sx={{ mt: 3 }}>
                            <Grid spacing={2}>
                                <Grid pl={2}>
                                    <React.Fragment>
                                        <Grid item>
                                            <Typography variant="body2">Category</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Select fullWidth style={{ width: '100%' }} onChange={formik.handleChange} name={`id`}>
                                                {categorias?.map((s: any) => {
                                                    return (
                                                        <MenuItem value={s.id}>{s.category}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </Grid>
                                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                                            Delete category
                                        </Button>
                                    </React.Fragment>
                                </Grid>
                                {/* END */}
                            </Grid>

                            <Grid container justifyContent='flex-end'>
                                <Grid item>
                                    {/* <Link href='#' variant='body2'>
                                No hay categorias
                                </Link> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container >
            </FormikProvider >
        )
    }
}
