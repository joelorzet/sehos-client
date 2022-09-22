import Navigation from './Navigation';
import React from 'react';
import { useGetProductsDashboardQuery } from '@/features';
// import {Chart, ArcElement} from 'chart.js'
import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setProductsAdmin, setRegla } from '@/features/product/productSlice';
// import { Doughnut, Line } from 'react-chartjs-2';
import GraphicsCard from './GraphycsCard';
import { ProductsAdmin } from '@/sehostypes';
// import Orders_details from './../../../../api/src/models/Orders_details';




 


const reglaDel80 =  (product: any) => {

    if (product[0]) {
    let id = 0;
    let ochenta = 0;

    const total =  product.reduce((acc: number , item: any) => {   
      if(item.totalVentas) {
        acc += item.totalVentas
      }
        return acc
      
        },0);
    console.log("🚀 ~ file: Dashboard.tsx ~ line 23 ~ total ~ total", total)
    const real = (total * 8) / 10;
    while (ochenta <= real) {
      if (product[id]?.totalVentas) {
         ochenta += Number(product[id]?.totalVentas);
        ;}
        id++
      }
      console.log("🚀 ~ file: Dashboard.tsx ~ line 26 ~ reglaDel80 ~ ochenta", ochenta)
    
    return ochenta > real
      && (ochenta - real) / real > 0.05 ? {
          id: id-1,
          total,
          slic: product.slice(0, (id-1))
        }
      : {
          id,
          total,
          slic: product.slice(0, id)
        };}
};







export default function Dashboard() {

 /* Chart.register(ArcElement); */
  const [time, setTime] = React.useState('Desde el principio')
  const [category, setCategory] = React.useState('Todas las categorias')
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.productsAdmin)
 // const regla = useSelector((state: RootState) => state.products.regla)
  const {data: product} = useGetProductsDashboardQuery({time, category})
 product && dispatch(setProductsAdmin(product))

const update = async (tiempo: string, categoria: string) => {
    const { data: productsAdmin} = await useGetProductsDashboardQuery({ time: tiempo, category: categoria})
    if(productsAdmin) dispatch(setProductsAdmin(productsAdmin)) 
      const prodRegla = reglaDel80(products)
      dispatch(setRegla(prodRegla?.slic))
 }

const initial =  () => {
 if (product) dispatch(setProductsAdmin(product)) 

 
}
React.useEffect(() => {
  initial()
  if(products[0]) dispatch(setRegla(reglaDel80(products)?.slic))
  
},[null, products[0]?.id])


/*       const chartColors = [
  "#336699",
  "#99CCFF",
  "#999933",
  "#666699",
  "#CC9933",
  "#006666",
  "#3399FF",
  "#993300",
  "#CCCC99",
  "#666666",
  "#FFCC66",
  "#6699CC",
  "#663366",
  "#9999CC",
  "#CCCCCC",
  "#669999",
  "#CCCC66",
  "#CC6600",
  "#9999FF",
  "#0066CC",
  "#99CCCC",
  "#999999",
  "#FFCC00",
  "#009999",
  "#99CC33",
  "#FF9900",
  "#999966",
  "#66CCCC",
  "#339966",
  "#CCCC33",
  "#003f5c",
  "#665191",
  "#a05195",
  "#d45087",
  "#2f4b7c",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#EF6F6C",
  "#465775",
  "#56E39F",
  "#59C9A5",
  "#5B6C5D",
  "#0A2342",
  "#2CA58D",
  "#84BC9C",
  "#CBA328",
  "#F46197",
  "#DBCFB0",
  "#545775"
];

      const datos = {
  maintainAspectRatio: true,
  responsive: true,
  labels: ["80%", '20%'],
  datasets: [
    {
      data: [ regla.length, products.length],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }
  ]
};
const options = {
  legend: { display: true, position: "right" },
 elements: { arc: { borderWidth: 8}},
 plugins:{
  legend: {
    display: true,
    labels: {
      generateLabels: (chart: any) => {
        return chart.data.datasets.map((dataset: any, _index: number) => ({
          text:dataset.label
        }) )
      }
    }
  }
 },
  datalabels: { display: true, color: "white" },
  tooltips: { backgroundColor: "#5a6e7f"}
}; */



  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value) 
  }
 
React.useEffect(() => {
  update(time, category)

},[time, category])

if (products[0]){

  return (
    <>
      <Navigation />
      <Select
            labelId="category"
            id="category"
            value={category}
            label="Categoría"
            onChange={handleChangeCategory}
            >
            <MenuItem value={'Todas las categorias'}>Todas las categorias</MenuItem>
            <MenuItem value={'Botas'}>Botas</MenuItem>
            <MenuItem value={'Sandalias'}>Sandalias</MenuItem>
            <MenuItem value={'Mocasines'}>Mocasines</MenuItem>
            <MenuItem value={'Tenis'}>Tenis</MenuItem>
          </Select>
          <Select
            labelId="Time"
            id="Time"
            value={time}
            label="Filtrar por tiempo"
            onChange={handleChangeTime}
            >
            <MenuItem value={'Desde el principio'}>Desde el principio</MenuItem>
            <MenuItem value={'7'}>Una semana</MenuItem>
            <MenuItem value={'31'}>Un mes</MenuItem>
            <MenuItem value={'365'}>Un año</MenuItem>
          </Select>
    {/*    <Grid  sx={{position:'relative', top: 40 }} container xs={12} xl={3}>
             <Grid spacing={8} xs={4} xl={6}>
               <Doughnut
             data={datos}
             options= {options}
            />  
             </Grid>
             </Grid>
            <Grid xs={6} xl={6}>
             {  products.map((item: any) => {
              
              
              return (<Line
              data={{
                labels: [''],
                datasets:[{
                data: [...item.totalVentas]
              }]}}
             options= {options}
            />)})  }
             </Grid>  
          
           */}
          
          
          <Grid sx={{position: "relative", top: 50 }}>
            {products[0] && products?.map((item: ProductsAdmin, index: number) => {
              return (
           item &&  item.details &&  (<GraphicsCard
                key={index}
                id={item?.id}
                name= {item?.name}
                details={item.details}
            	sellPrice={item?.sell_price}
            	buyPrice= {item?.buy_price}
            	Orders= {item?.Orders_details}
            	/>))
            })
          }

          </Grid>
          
          
             
             
          
        
          
           
    </>
  );}
}
