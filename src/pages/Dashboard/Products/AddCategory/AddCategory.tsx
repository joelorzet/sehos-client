import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useAuth } from '@/hooks/useAuth';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import DeleteCategory from './DeleteCategory';
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
import { getCategories } from '@/features/category/categoriesSlice';
import { RootState } from '../../../../store';
import Loader from '@/app/Loader';
import { Endpoint } from '@/routes/routes';
import Swal from 'sweetalert2';
/* VALIDACIONES */
// 
/* COMPONENT */
// const isLoggedIn = useSelector((state: IRootState) => state.user.loggedIn)
export default function AddCategory() {
  const auth = useAuth()
  const dispatch = useDispatch()
  const categorias: any = useSelector((state: RootState) => state.categories.categories)
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const handleSubmitC: any = async (values: any) => {
    //ver si el fetch está correcto 
    const axiosP = await axios.post(Endpoint.postCategories, values.categories, { headers: { "authorization": 'bearer ' + auth.token } })
  }
  const categoriasTraidas: Array<string> = categorias.map((c: CategoryI) => c.category)
  const validations = yup.object({
    categories: yup.array(yup.object({
      category: yup.string().required().min(3, "Insert a valid category").max(15).notOneOf(categoriasTraidas, 'No se puede repetir categorias creadas anteriormente'),
    })).min(1).max(3).required('Please, type at least one category')
  });
  /* HOOKS */
  const formik = useFormik({
    initialValues: {  //!import correcto de los size y las categories
      categories:
        [{
          category: ""
        }], //! ver que esté cambiado category ->  id_category
    },
    validationSchema: validations,
    onSubmit: async (values, { resetForm }: any) => {
      handleSubmitC(values)
      Swal.fire({
        text: '¡ Categoría creada con éxito !'
      });
      resetForm()
    }
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
              Create Category
            </Typography>
            <Divider style={{ width: '100%' }} variant='middle' />
            <Box component='form' noValidate onSubmit={formik.handleSubmit} method='POST' action='http://localhost:3001/products' encType='multipart/form-data' sx={{ mt: 3 }}>
              <Grid>
                <FieldArray name="categories">
                  {({ push, remove }) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant="body2">Category</Typography>
                      </Grid>
                      {formik.values.categories.map((_, index) => (
                        <Grid container spacing={2} item>
                          <Grid xs={8} item>
                            <TextField
                              size='small'
                              fullWidth
                              name={`categories[${index}].category`}
                              onChange={formik.handleChange}
                              error={formik.touched.categories && Boolean(formik.errors.categories)}
                            />
                          </Grid>
                          <Grid item>
                            <Button fullWidth variant="contained" onClick={() => index > 0 ? remove(index) :null}>Delete</Button>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid mt={2} item>
                        <Button fullWidth variant="contained" onClick={() => push({ category: '' })} >Add Category</Button>
                      </Grid>
                    </React.Fragment>
                  )}
                </FieldArray>
              </Grid>
              {/* END */}
              <Grid item xs={12}>
                {/* <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              /> */}
              </Grid>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Create Category
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  {/* <Link href='#' variant='body2'>
                No hay categorias
              </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </FormikProvider>
    )
  }}
