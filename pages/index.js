import styles from '../styles/Home.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DateRange } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import date from 'date-and-time';
import Paper from '@mui/material/Paper';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Input } from '@mui/material';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

var colors = [
  '#F63E36',
  '#D42F6B',
  '#EB3FD3',
  '#B32FD4',
  '#9B36F6',
  '#F6532C',
  '#D46126',
  '#EB8D36',
  '#D49126',
  '#F6BD2C',
  '#F6D32C',
  '#D4C726',
  '#D8EB37',
  '#86D426',
  '#55F62C',
  '#2CF684',
  '#26D4A3',
  '#35EAEB',
  '#26A6D4',
  '#2C8CF6',
  '#2F58F6',
]

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

function AboutPage()
{
  return (<div><Card><CardHeader title="DFK Stuffs"></CardHeader>
    <CardContent>
      Work in progress
    </CardContent>
    </Card></div>);
}

function Pages(props) {

  if(props.pageNumber === 0) {return (<div><AboutPage /></div>);}
  if(props.pageNumber === 1) {return (<div><HeroValuePage /></div>);}
  if(props.pageNumber === 2) {return (<div><CalcsPage /></div>);}
  if(props.pageNumber === 3) {return (<div><HeroValuationPage /></div>);}
  return (
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
      enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
      imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
      Convallis convallis tellus id interdum velit laoreet id donec ultrices.
      Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
      adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
      nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
      leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
      feugiat vivamus at augue. At augue eget arcu dictum varius duis at
      consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
      sapien faucibus et molestie ac.
    </Typography>
  );
}

function displayNiceTitle(myString)
{
  var rv = []
  var toCaps = 1;
  for (let index = 0; index < myString.length; index++) {
    const element = myString[index];
    if (toCaps === 1)
    {
      rv.push(element.toUpperCase());
      toCaps = 0;
    }
    else
    {
      rv.push(element);
    }
    
    if (element === ' ')
    {
      toCaps = 1;
    }
  }
  return rv.join('');
}

function HeroValuePage()
{
  const [data,setData] = useState("")
  React.useEffect(() => {
    axios.get("/api/getLast30DaySales").then (response => {
      setData(response);
    }).catch (error => {
      console.log(error);
    })
  },[])

  if (data === "") return (<div><CircularProgress /></div>);
  /*{"BLOCK_TIMESTAMP":"2022-02-28 21:20:24.000","HERO_ID":"119592","TOTAL_JEWELS":37,"U_TIME":"2022-02-20 03:14:22.000",
  "U_HERO":"119592","SUMMONING_INFO_MAXSUMMONS":"5","SUMMONS_LEFT":5,
  "HERO_INFO_STATGENES":"0000000a631011300022840239c4139ce1288007314e7114210cd1321c262042",
  "HERO_INFO_RARITY":"0","HERO_INFO_GENERATION":"4","HERO_INFO_CLASS":"6","HERO_INFO_SUBCLASS":"17",
  "HERO_STATE_LEVEL":"1","HERO_PROFESSIONS_MINING":"10","HERO_PROFESSIONS_GARDENING":"9","HERO_PROFESSIONS_FORAGING":"0",
  "HERO_PROFESSIONS_FISHING":"0"
  */
  const gridColDef = [
    { field: 'BLOCK_TIMESTAMP', headerName: 'BLOCK_TIMESTAMP' },
    { field: 'HERO_ID', headerName: 'HERO_ID' },
    { field: 'TOTAL_JEWELS', headerName: 'TOTAL_JEWELS' },
    { field: 'SUMMONING_INFO_MAXSUMMONS', headerName: 'SUMMONING_INFO_MAXSUMMONS' },
    { field: 'SUMMONS_LEFT', headerName: 'SUMMONS_LEFT' },
    { field: 'HERO_INFO_STATGENES', headerName: 'HERO_INFO_STATGENES' },
    { field: 'HERO_INFO_RARITY', headerName: 'HERO_INFO_RARITY' },
    { field: 'HERO_INFO_GENERATION', headerName: 'HERO_INFO_GENERATION' },
    { field: 'HERO_INFO_CLASS', headerName: 'HERO_INFO_CLASS' },
    { field: 'HERO_INFO_SUBCLASS', headerName: 'HERO_INFO_SUBCLASS' },
    { field: 'HERO_STATE_LEVEL', headerName: 'HERO_STATE_LEVEL' },
    { field: 'HERO_PROFESSIONS_MINING', headerName: 'HERO_PROFESSIONS_MINING' },
    { field: 'HERO_PROFESSIONS_GARDENING', headerName: 'HERO_PROFESSIONS_GARDENING' },
    { field: 'HERO_PROFESSIONS_FORAGING', headerName: 'HERO_PROFESSIONS_FORAGING' },
    { field: 'HERO_PROFESSIONS_FISHING', headerName: 'HERO_PROFESSIONS_FISHING' },
  ];

  var dataParams = {}
  data.data.forEach(element => {
    if (element.U_TIME !== undefined )
    {
      if (dataParams[element.HERO_INFO_CLASS] === undefined)
      {
        dataParams[element.HERO_INFO_CLASS] = {}
      }
    }
  });

  return (
  <div style={{ height: 600, width: '100%' }}>
    <Grid container spacing={2}>
      <Grid item md={12}>
        <h2>Hero Value Calculator</h2>
      </Grid>
    </Grid>
    <br></br>
    <DataGrid autoPageSize components={{ Toolbar: GridToolbar }} rowHeight={25} getRowId={(row) => row.BLOCK_TIMESTAMP} rows={data.data} columns={gridColDef}></DataGrid>
  </div>
  );
}



function CalcsPage()
{
  const [data,setData] = useState("")
  React.useEffect(() => {
    axios.get("/api/getFloors").then (response => {
      setData(response);
    }).catch (error => {
      console.log(error);
    })
  },[])

  if (data === "") return (<div><CircularProgress /></div>);
  /*
  {"HERO_INFO_CLASS":"28","HERO_INFO_RARITY":"0","PROFESSION_MAIN":"fishing",
  "SUMMONS_LEFT":1,"MIN_JEWEL":1556.25,"MAX_JEWEL":3200,"AVG_JEWEL":2276.041666666667,
  "MEDIAN_JEWEL":2150,"MODE_JEWEL":2150,"TW_AVERAGE":2434.722222222222,"RANGE":1643.75,"SAMPLE_SIZE":6}
  */
  const gridColDef = [
    { field: 'HERO_INFO_CLASS', headerName: 'HERO_INFO_CLASS' },
    { field: 'HERO_INFO_RARITY', headerName: 'HERO_INFO_RARITY' },
    { field: 'PROFESSION_MAIN', headerName: 'PROFESSION_MAIN' },
    { field: 'SUMMONS_LEFT', headerName: 'SUMMONS_LEFT' },
    { field: 'HERO_INFO_GENERATION', headerName: 'HERO_INFO_GENERATION' },
    { field: 'MIN_JEWEL', headerName: 'MIN_JEWEL' },
    { field: 'MAX_JEWEL', headerName: 'MAX_JEWEL' },
    { field: 'AVG_JEWEL', headerName: 'AVG_JEWEL' },
    { field: 'MEDIAN_JEWEL', headerName: 'MEDIAN_JEWEL' },
    { field: 'MODE_JEWEL', headerName: 'MODE_JEWEL' },
    { field: 'TW_AVERAGE', headerName: 'TW_AVERAGE' },
    { field: 'HERO_STATE_LEVEL', headerName: 'HERO_STATE_LEVEL' },
    { field: 'RANGE', headerName: 'RANGE' },
    { field: 'SAMPLE_SIZE', headerName: 'SAMPLE_SIZE' },
  ];

  var dataParams = {}
  data.data.forEach(element => {
    if (element.U_TIME !== undefined )
    {
      if (dataParams[element.HERO_INFO_CLASS] === undefined)
      {
        dataParams[element.HERO_INFO_CLASS] = {}
      }
    }
  });

  var i = 0;
  return (
  <div style={{ height: 600, width: '100%' }}>
    <Grid container spacing={2}>
      <Grid item md={12}>
        <h2>Hero Value Calculator</h2>
      </Grid>
    </Grid>
    <br></br>
    <DataGrid autoPageSize components={{ Toolbar: GridToolbar }} rowHeight={25} getRowId={(row) => ++i } rows={data.data} columns={gridColDef}></DataGrid>
  </div>
  );
}

function HeroValuationPage()
{
  const [data,setData] = useState("")
  const [dataHero,setDataHero] = useState("")
  const [heroID, setHeroID] = useState("77012")
  const [textFieldHeroID, setTextFieldHeroID] = useState("77012")
  React.useEffect(() => {
    axios.get("/api/getFloors").then (response => {
      setData(response);
    }).catch (error => {
      console.log(error);
    })

    axios.get("/api/getHeroByID?id=" + heroID).then (response => {
      //console.log("dataid", response.data[0])
      setDataHero(response.data[0]);
    }).catch (error => {
      console.log(error);
    })
  },[])

  React.useEffect(() => {

    axios.get("/api/getHeroByID?id=" + heroID).then (response => {
      setDataHero(response.data[0]);
    }).catch (error => {
      console.log(error);
    })

  },[heroID])



  if (data === "") return (<div><CircularProgress /></div>);


  var priceParams = {"min": 0, "max": 0, "avg":0, "median":0, "mode":0, "twavg":0, "range":0, "size":0}

  var dataParams = {
    "0":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "1":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "2":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "3":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "4":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "5":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "6":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "7":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "16":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "17":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "18":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "19":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "24":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "25":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
    "28":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}}
  }

  var heroClass = ["0","1","2","3","4","5","6","7","16","17","18","19","24","25","28"]
  var generations = ["g0","g1","g2","g3","g4","g5","g6","g7","g8","g9","g10","g11"]
  var sumLeft = ["0","1","2","3","4","5","6","7","8","9","10"]
  heroClass.forEach(c => {
    generations.forEach(g => {
      dataParams[c]["Rarity"]["0"][g] = {}
      dataParams[c]["Rarity"]["1"][g] = {}
      dataParams[c]["Rarity"]["2"][g] = {}
      dataParams[c]["Rarity"]["3"][g] = {}
      dataParams[c]["Rarity"]["4"][g] = {}
      sumLeft.forEach(s => {
        dataParams[c]["Rarity"]["0"][g][s] = JSON.parse(JSON.stringify(priceParams));
        dataParams[c]["Rarity"]["1"][g][s] = JSON.parse(JSON.stringify(priceParams));
        dataParams[c]["Rarity"]["2"][g][s] = JSON.parse(JSON.stringify(priceParams));
        dataParams[c]["Rarity"]["3"][g][s] = JSON.parse(JSON.stringify(priceParams));
        dataParams[c]["Rarity"]["4"][g][s] = JSON.parse(JSON.stringify(priceParams));
      })
    })
  })

  //var priceParams = {"min": 0, "max": 0, "avg":0, "median":0, "mode":0, "twavg":0, "range":0, "size":0}
    /*
  {"HERO_INFO_CLASS":"28","HERO_INFO_RARITY":"0","PROFESSION_MAIN":"fishing",
  "SUMMONS_LEFT":1,"MIN_JEWEL":1556.25,"MAX_JEWEL":3200,"AVG_JEWEL":2276.041666666667,
  "MEDIAN_JEWEL":2150,"MODE_JEWEL":2150,"TW_AVERAGE":2434.722222222222,"RANGE":1643.75,"SAMPLE_SIZE":6}
  */

  data.data.forEach(element => {
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].min = element.MIN_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].max = element.MAX_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].avg = element.AVG_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].median = element.MEDIAN_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].mode = element.MODE_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].twavg = element.TW_AVERAGE
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].range = element.RANGE
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.SUMMONS_LEFT].size = element.SAMPLE_SIZE
  });

  console.log(dataParams);
/*
[{"id":"77012","numberid":"77012","owner":"0x0Ba43bAe4613E03492e4C17Af3B014B6c3202B9d","creator":null,
"statgenes":"3722263269009836606871127504078018274272028221842442974888100582526990",
"visualgenes":"57102911489886451134320217114532560776123841439875753507939014772004069",
"rarity":0,"shiny":false,"generation":4,"firstname":876,"lastname":258,"shinystyle":11,
"mainclass":"1","subclass":"7","summonedtime":"1640109739","nextsummontime":"1640196139",
"summonerid":"75402","assistantid":"73163","summons":0,"maxsummons":4,"staminafullat":"1647466706",
"hpfullat":"0","mpfullat":"0","level":6,"xp":"1715","currentquest":"0x0000000000000000000000000000000000000000",
"sp":0,"status":"0","strength":18,"intelligence":7,"wisdom":9,"luck":9,"agility":9,"vitality":21,"endurance":19,
"dexterity":11,"hp":337,"mp":56,"stamina":28,"strengthgrowthp":7000,"intelligencegrowthp":2000,"wisdomgrowthp":2500,
"luckgrowthp":3500,"agilitygrowthp":4700,"vitalitygrowthp":7500,"endurancegrowthp":7500,"dexteritygrowthp":5500,
"strengthgrowths":1750,"intelligencegrowths":500,"wisdomgrowths":500,"luckgrowths":1375,"agilitygrowths":1650,
"vitalitygrowths":1500,"endurancegrowths":1375,"dexteritygrowths":1750,"hpsmgrowth":1500,"hprggrowth":3500,"hplggrowth":5000,
"mpsmgrowth":4000,"mprggrowth":4000,"mplggrowth":2000,"mining":56,"gardening":0,"foraging":0,"fishing":147,"profession":"fishing",
"passive1":"Basic8","passive2":"Basic4","active1":"Basic5","active2":"Basic5","statboost1":"AGI","statboost2":"AGI",
"statsunknown1":"18","element":"dark","statsunknown2":"0","gender":"male","headappendage":"5","backappendage":"2",
"background":"plains","hairstyle":"1","haircolor":"66489e","visualunknown1":"7","eyecolor":"896693","skincolor":"e6a861",
"appendagecolor":"c5bfa7","backappendagecolor":"a88b47","visualunknown2":"5","assistingauction":"156604",
"assistingprice":"6000000000000000000","saleauction":null,"saleprice":null,"privateauctionprofile":null,
"previousowner":null,"pjstatus":null,"pjlevel":null,"summoner_id":"75402","summoner_mainclass":"1","summoner_rarity":1,
"summoner_generation":1,"summoner_visualgenes":"57102858832081892441165424622321414241667223398396838941914506513648805",
"assistant_id":"73163","assistant_mainclass":"0","assistant_rarity":0,"assistant_generation":3,
"assistant_visualgenes":"170874039405763969121456392082892553302941147267447840233522985068141573",
"owner_name":"antonyip","owner_picid":null,"owner_address":"0x0Ba43bAe4613E03492e4C17Af3B014B6c3202B9d",
"owner_nftid":"12","owner_collectionid":"0","assistauction_startingprice":"6000000000000000000",
"assistauction_endingprice":"6000000000000000000","assistauction_duration":"60","assistauction_startedat":"1645936904",
"saleauction_startingprice":null,"saleauction_endingprice":null,"saleauction_duration":null,"saleauction_startedat":null,
"firstname_string":"Qazos","lastname_string":"Hydragem","summons_remaining":4,"current_stamina":"2.354332069176924933839"}]
*/
  var i = 0;
  return (
  <div style={{ height: 600, width: '100%' }}>
    <Grid container spacing={2}>
      <Grid item md={12}>
        <h2>Hero Valuation Page Calculator - Ignore this for now, its not right</h2>
      </Grid>
      <Grid item md={12}>
      <TextField id="HeroIDTextField" onChange={(v) => {setTextFieldHeroID(v.target.value)}} label="Outlined" variant="outlined" />
      <Button variant="contained" onClick={() => {
        setHeroID(textFieldHeroID)
        console.log(textFieldHeroID);
      }}>Load Hero</Button>
      </Grid>
      <Grid item md={12}>
      <h3>Hero selected: {heroID}</h3>
      <p> 
          <li>id: {dataHero.id} </li>
          <li>owner: {dataHero.owner} </li>
          <li>mainclass: {dataHero.mainclass}</li>
          <li>subclass: {dataHero.subclass}</li>
          <li>rarity: {dataHero.rarity} </li>
          <li>generation: {dataHero.generation} </li>
          <li>summons: {dataHero.summons} </li>
          <li>maxsummons: {dataHero.maxsummons} </li>
          <li>level: {dataHero.level} </li>
          <li>profession: {dataHero.profession} </li>
       </p>
       </Grid>
       <Grid item md={12}>
      valuation: {JSON.stringify(dataParams[dataHero.mainclass]["Rarity"][dataHero.rarity]['g'+dataHero.generation][dataHero.maxsummons-dataHero.summons])}
      </Grid>
    </Grid>
  </div>
  );
}


function PermanentDrawerLeft() {
  const [page, setPage] = useState(0);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        //sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
          DFK Stuffs
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
            <ListItem button key={'About'} onClick={() => setPage(0)}>
              <ListItemIcon>
              <IconButton color="secondary" aria-label="add an alarm">
                
              </IconButton>
              </ListItemIcon>
              <ListItemText primary={'About'} />
            </ListItem>
        </List>
        <Divider />
        <List>
            {/* <ListItem button key={'HeroSales'} onClick={() => setPage(1)}>
              <ListItemIcon>
                <Image alt="" src='/meLogo.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'HeroSales'} />
            </ListItem> */}
            <ListItem button key={'CalcsPage'} onClick={() => setPage(2)}>
              <ListItemIcon>
                <Image alt="" src='/meLogo.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'CalcsPage'} />
            </ListItem>
            <ListItem button key={'HeroValuation'} onClick={() => setPage(3)}>
              <ListItemIcon>
                <Image alt="" src='/meLogo.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'HeroValuation'} />
            </ListItem>
            
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Pages pageNumber={page}></Pages>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <PermanentDrawerLeft />
    </div>
  )
}
