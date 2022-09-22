import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
// import { useSelector } from "react-redux"
// import { RootState } from "../../store"
// import { useAuth } from "../../hooks/useAuth"
import { ProductsAdminCard } from "@/sehostypes/Product";




export default function GraphicsCard (props: ProductsAdminCard) {

const {name, sellPrice, buyPrice, Orders, details } = props
    const [size, setSize] = useState('')

  const changeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value)
  } 


if (Orders.length) {
    return (
        <Box>
            <Grid container spacing={0} alignItems='center'>
                <Grid item xs={1}>
                    <img style={{width: '80%'}} src={details?.images && (details?.images[0]?.image ? details?.images[0].image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg')} alt="No hay" />
                </Grid>
                <Grid item xs={11}>
                    <Grid container>
                        <Grid item xs={4}>
                            <label>Title</label>
                        </Grid>
                        <Grid item xs={2}>
                            <label>Price</label>
                        </Grid>
                        <Grid item xs={2}>
                            <label>Size</label>
                        </Grid>
                        <Grid item xs={2}>
                            <label>Selled</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Profit</label>
                        </Grid>
                        
                        <Grid item xs={4}>
                            <h5>{name}</h5>
                        </Grid>
                        <Grid item xs={2}>
                            <p>$ {sellPrice}</p>
                        </Grid>
                        <Grid item xs={2}>
                                <select defaultValue='default' style={{marginTop: 15}} onChange={changeSize}>
                                   <option value="default">Sizes</option>
                                    { details && details.sizes?.map(s => (<option key={s.size}>{s.size}</option>))}
                                </select>
                        </Grid>
                        <Grid item xs={2}>
                            <p>{size && Orders?.find(order => order.size === size)?.quantity ? Orders?.find(order => order.size === size)?.quantity : 0 }</p>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {sellPrice && Orders && Orders?.find(order => order.size === size)?.quantity ? (Orders?.find(order => order.size === size).quantity )* (sellPrice - buyPrice) : 0}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box> 
    )}
}