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
  decodeRecessiveGenesAndNormalize,
  decodeRecessiveGeneAndNormalize,
  CONSTANTS as dfk_consts,
} from '@thanpolas/dfk-hero'

import Chart from 'chart.js/auto';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Input } from '@mui/material';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  }
}

const gqlclient = new ApolloClient({
  uri: 'https://defi-kingdoms-community-api-gateway-co06z8vi.uc.gateway.dev/graphql',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

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

const CLASS_INT_TO_STRING = {
  "0": 'Warrior',
  "1": 'Knight',
  "2": 'Thief',
  "3": 'Archer',
  "4": 'Priest',
  "5": 'Wizard',
  "6": 'Monk',
  "7": 'Pirate',
  "16": 'Paladin',
  "17": 'DarkKnight',
  "18": 'Summoner',
  "19": 'Ninja',
  "24": 'Dragoon',
  "25": 'Sage',
  "29": 'DreadKnight',
};

const RARITY_INT_TO_STRING = {
  "0": 'Common',
  "1": 'Uncommon',
  "2": 'Rare',
  "3": 'Legendary',
  "4": 'Mythic',
};

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    heroes(where: {saleAuction_not: null} first:5000)
    {
      id
      statGenes
      visualGenes
      rarity
      shiny
      generation
      mining
      gardening
      foraging
      fishing
      level
      xp
      mainClass
      subClass
      summons
      maxSummons
      sp
      status
      strength
      intelligence
      wisdom
      luck
      agility
      vitality
      endurance
      dexterity
      hp
      mp
      stamina
      profession
      saleAuction
      {
        startingPrice
        endedAt
      }
      salePrice
      assistingPrice
      assistingAuction
      {
        startedAt
        endedAt
        startingPrice
        endingPrice
        
      }
    }
  }
`;

function generateChartOptions(myVar, showLegend) {
  return {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: myVar,
      },
    },
  };
}

function generateLineChartData(xValues, yValues) {
  return {
    labels: xValues,
    datasets: [
      {
        type: 'line',
        data: yValues,
        backgroundColor: colors[16]
      }
    ],
  };
}

function LazyChartOne(props)
{
  const { title, showLabels, data, classFilter, rarityFilter, genFilter, profFilter } = props;

  if (props.data === "") return (<div><CircularProgress /></div>);

  //console.log(data);
  var xValues = []
  var yValues = []
  var i = 0;
  for (var kClass in data)
  {
    if (kClass === classFilter) // classFilter
    {
      for (var kRare in data[kClass]["Rarity"])
      {
        if (kRare === rarityFilter) // RarityFilter
        {
          for (var kGen in data[kClass]["Rarity"][kRare])
          {
            if (kGen === genFilter)
            {
              for (var kProf in data[kClass]["Rarity"][kRare][kGen])
              {
                if (kProf === profFilter)
                {
                  for (var kSummonsLeft in data[kClass]["Rarity"][kRare][kGen][kProf])
                  {
                    const finalD = data[kClass]["Rarity"][kRare][kGen][kProf][kSummonsLeft]["min"]
                    //console.log(finalD);
                    xValues.push(kSummonsLeft);
                    yValues.push(finalD);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  var chartOptions = generateChartOptions(title, showLabels);
  var chartData = generateLineChartData(xValues, yValues);
  
  return <Line md={6} options={chartOptions} data={chartData} height={null}/>
}

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
  if(props.pageNumber === 4) {return (<div><LinesPage /></div>);}
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
  const [heroID, setHeroID] = useState("77013")
  const [textFieldHeroID, setTextFieldHeroID] = useState("77013")
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
  var rarity = ["0","1","2","3","4"]
  var generations = ["g0","g1","g2","g3","g4","g5","g6","g7","g8","g9","g10","g11"]
  var professions = ["mining","fishing","gardening","foraging"]
  var sumLeft = ["0","1","2","3","4","5","6","7","8","9","10"]
  heroClass.forEach(c => {
    rarity.forEach(r => {
      dataParams[c]["Rarity"][r] = {}
      generations.forEach(g => {
        dataParams[c]["Rarity"][r][g] = {}
        professions.forEach(p => {
          dataParams[c]["Rarity"][r][g][p] = {}
          sumLeft.forEach (s => {
            dataParams[c]["Rarity"][r][g][p][s] = JSON.parse(JSON.stringify(priceParams));
          })
        })
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
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].min = element.MIN_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].max = element.MAX_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].avg = element.AVG_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].median = element.MEDIAN_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].mode = element.MODE_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].twavg = element.TW_AVERAGE
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].range = element.RANGE
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].size = element.SAMPLE_SIZE
  });

  const statGenes = decodeRecessiveGeneAndNormalize("0x"+parseInt(dataHero.statgenes,10).toString(16))
  //console.log(statGenes);
  //console.log(dataParams);
/*
[{"id":"77013","numberid":"77013","owner":"0x0Ba43bAe4613E03492e4C17Af3B014B6c3202B9d","creator":null,
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
        <h2>Hero Valuation Page Calculator - Probably not 100% accurate...</h2>
        <p> my goto test heroes - 77012(noprice-nodata), 77013(55j), 155466(ninja warrior,no sums left, 92-150j)</p>
      </Grid>
      <Grid item md={12}>
      <TextField id="HeroIDTextField" onChange={(v) => {setTextFieldHeroID(v.target.value)}} label="Outlined" variant="outlined" />
      <Button variant="contained" onClick={() => {
        if (parseInt(textFieldHeroID) > 2050)
        {
          setHeroID(textFieldHeroID)
        }
        else
        {
          alert("not allowed to do hero ids under 2060")
        }
        
      }}>Load Hero</Button>
      </Grid>
      <Grid item md={12}>
      <h3>Hero selected: {heroID}</h3>
        <Grid container xs={12} spacing={0}>
          <Grid container xs={4} spacing={1}>
            <Grid item xs={6}>id:</Grid ><Grid item xs={6}> {dataHero.id} </Grid >
            <Grid item xs={6}>owner:</Grid ><Grid item xs={6}> {dataHero.owner.substr(0,10)+"..."} </Grid >
            <Grid item xs={6}>mainclass:</Grid ><Grid item xs={6}> {CLASS_INT_TO_STRING[(dataHero.mainclass)]}</Grid >
            <Grid item xs={6}>subclass:</Grid ><Grid item xs={6}> {CLASS_INT_TO_STRING[(dataHero.subclass)]}</Grid >
            <Grid item xs={6}>rarity:</Grid ><Grid item xs={6}> {RARITY_INT_TO_STRING[dataHero.rarity]} </Grid >
            <Grid item xs={6}>generation:</Grid ><Grid item xs={6}> {dataHero.generation} </Grid >
            <Grid item xs={6}>summons:</Grid ><Grid item xs={6}> {dataHero.summons} </Grid >
            <Grid item xs={6}>maxsummons:</Grid ><Grid item xs={6}> {dataHero.maxsummons} </Grid >
            <Grid item xs={6}>level:</Grid ><Grid item xs={6}> {dataHero.level} </Grid >
            <Grid item xs={6}>profession:</Grid ><Grid item xs={6}> {dataHero.profession} </Grid >
          </Grid>
          <Grid container xs={2} spacing={1}>
            {/* strength":18,"intelligence":7,"wisdom":9,"luck":9,"agility":9,"vitality":21,"endurance":19,
                "dexterity":11,"hp":337,"mp":56,"stamina":28 */
            }
            <Grid item xs={6}>strength</Grid><Grid item xs={6}>       {dataHero.strength}</Grid>
            <Grid item xs={6}>intelligence</Grid><Grid item xs={6}>       {dataHero.intelligence}</Grid>
            <Grid item xs={6}>wisdom</Grid><Grid item xs={6}>       {dataHero.wisdom}</Grid>
            <Grid item xs={6}>luck</Grid><Grid item xs={6}>       {dataHero.luck}</Grid>
            <Grid item xs={6}>agility</Grid><Grid item xs={6}>       {dataHero.agility}</Grid>
            <Grid item xs={6}>vitality</Grid ><Grid item xs={6}>      {dataHero.vitality}</Grid>
            <Grid item xs={6}>endurance</Grid ><Grid item xs={6}>      {dataHero.endurance}</Grid>
            <Grid item xs={6}>dexterity</Grid ><Grid item xs={6}>      {dataHero.dexterity}</Grid>
            <Grid item xs={6}>hp</Grid > <Grid item xs={6}>  {dataHero.hp}</Grid>
            <Grid item xs={6}>mp</Grid ><Grid item xs={6}>   {dataHero.mp}</Grid>
            <Grid item xs={6}>stamina</Grid ><Grid item xs={6}>   {dataHero.stamina}</Grid>
          </Grid>
          <Grid container xs={2} spacing={1}>
            {/* strength":18,"intelligence":7,"wisdom":9,"luck":9,"agility":9,"vitality":21,"endurance":19,
                "dexterity":11,"hp":337,"mp":56,"stamina":28 */
            }
            <Grid item xs={6}>s</Grid><Grid item xs={6}>       {0}</Grid>
            <Grid item xs={6}>s</Grid><Grid item xs={6}>       {0}</Grid>
            <Grid item xs={6}>s</Grid><Grid item xs={6}>       {0}</Grid>
            <Grid item xs={6}>s</Grid><Grid item xs={6}>       {0}</Grid>
            <Grid item xs={6}>s</Grid><Grid item xs={6}>       {0}</Grid>
            <Grid item xs={6}>s</Grid ><Grid item xs={6}>      {0}</Grid>
            <Grid item xs={6}>s</Grid ><Grid item xs={6}>      {0}</Grid>
            <Grid item xs={6}>s</Grid ><Grid item xs={6}>      {0}</Grid>
            <Grid item xs={6}>s</Grid > <Grid item xs={6}>     {0}</Grid>
            <Grid item xs={6}>s</Grid ><Grid item xs={6}>      {0}</Grid>
            <Grid item xs={6}>s</Grid ><Grid item xs={6}>      {0}</Grid>
          </Grid>
          <Grid container xs={4} spacing={1}>
            <Grid item xs={6}>profession d:</Grid><Grid item xs={6}>     {statGenes.professionGenes[0]}</Grid>
            <Grid item xs={6}>profession r1:</Grid><Grid item xs={6}>    {statGenes.professionGenes[1]}</Grid>
            <Grid item xs={6}>profession r2:</Grid><Grid item xs={6}>    {statGenes.professionGenes[2]}</Grid>
            <Grid item xs={6}>profession r3:</Grid><Grid item xs={6}>    {statGenes.professionGenes[3]}</Grid>
            <Grid item xs={6}>mainclass d:</Grid><Grid item xs={6}>      {statGenes.mainClassGenes[0]}</Grid>
            <Grid item xs={6}>mainclass r1:</Grid ><Grid item xs={6}>    {statGenes.mainClassGenes[1]}</Grid>
            <Grid item xs={6}>mainclass r2:</Grid ><Grid item xs={6}>    {statGenes.mainClassGenes[2]}</Grid>
            <Grid item xs={6}>mainclass r3:</Grid ><Grid item xs={6}>    {statGenes.mainClassGenes[3]}</Grid>
            <Grid item xs={6}>subclass d:</Grid > <Grid item xs={6}>     {statGenes.subClassGenes[0]}</Grid>
            <Grid item xs={6}>subclass r1:</Grid ><Grid item xs={6}>     {statGenes.subClassGenes[1]}</Grid>
            <Grid item xs={6}>subclass r2:</Grid ><Grid item xs={6}>     {statGenes.subClassGenes[2]}</Grid>
            <Grid item xs={6}>subclass r3:</Grid ><Grid item xs={6}>     {statGenes.subClassGenes[3]}</Grid>
          </Grid>
        </Grid>
       </Grid>
       <Grid container >
      valuation: {JSON.stringify(dataParams[dataHero.mainclass]["Rarity"][dataHero.rarity]['g'+dataHero.generation][statGenes.professionGenes[0]][dataHero.maxsummons-dataHero.summons])}
      </Grid>
    </Grid>
  </div>
  );
}

function LinesPage()
{
  const [data,setData] = useState("")
  const [gqldata0,setgqlData0] = useState("")
  const [gqldata1,setgqlData1] = useState("")
  const [gqldata2,setgqlData2] = useState("")
  const [gqldata3,setgqlData3] = useState("")
  const [gqldata4,setgqlData4] = useState("")
  const [gqldata5,setgqlData5] = useState("")
  const [gqldata6,setgqlData6] = useState("")
  React.useEffect(() => {
    axios.get("/api/getFloors").then (response => {
      setData(response);
    }).catch (error => {
      console.log(error);
    })

    gqlclient.query({query: gql`query GetExchangeRates {
      heroes(where: {saleAuction_not: null} first:1000 skip:0)
      {
        id
        statGenes
        visualGenes
        rarity
        shiny
        generation
        mining
        gardening
        foraging
        fishing
        level
        xp
        mainClass
        subClass
        summons
        maxSummons
        sp
        status
        strength
        intelligence
        wisdom
        luck
        agility
        vitality
        endurance
        dexterity
        hp
        mp
        stamina
        profession
        saleAuction
        {
          startingPrice
          endedAt
        }
        salePrice
        assistingPrice
        assistingAuction
        {
          startedAt
          endedAt
          startingPrice
          endingPrice
          
        }
      }
      }`
      }).then(res => {
        setgqlData0(res.data);
      });

      gqlclient.query({query: gql`query GetExchangeRates {
        heroes(where: {saleAuction_not: null} first:1000 skip:1000)
        {
          id
          statGenes
          visualGenes
          rarity
          shiny
          generation
          mining
          gardening
          foraging
          fishing
          level
          xp
          mainClass
          subClass
          summons
          maxSummons
          sp
          status
          strength
          intelligence
          wisdom
          luck
          agility
          vitality
          endurance
          dexterity
          hp
          mp
          stamina
          profession
          saleAuction
          {
            startingPrice
            endedAt
          }
          salePrice
          assistingPrice
          assistingAuction
          {
            startedAt
            endedAt
            startingPrice
            endingPrice
            
          }
        }
        }`
        }).then(res => {
          setgqlData1(res.data);
        });

        gqlclient.query({query: gql`query GetExchangeRates {
          heroes(where: {saleAuction_not: null} first:1000 skip:2000)
          {
            id
            statGenes
            visualGenes
            rarity
            shiny
            generation
            mining
            gardening
            foraging
            fishing
            level
            xp
            mainClass
            subClass
            summons
            maxSummons
            sp
            status
            strength
            intelligence
            wisdom
            luck
            agility
            vitality
            endurance
            dexterity
            hp
            mp
            stamina
            profession
            saleAuction
            {
              startingPrice
              endedAt
            }
            salePrice
            assistingPrice
            assistingAuction
            {
              startedAt
              endedAt
              startingPrice
              endingPrice
              
            }
          }
          }`
          }).then(res => {
            setgqlData2(res.data);
          });

          gqlclient.query({query: gql`query GetExchangeRates {
            heroes(where: {saleAuction_not: null} first:1000 skip:3000)
            {
              id
              statGenes
              visualGenes
              rarity
              shiny
              generation
              mining
              gardening
              foraging
              fishing
              level
              xp
              mainClass
              subClass
              summons
              maxSummons
              sp
              status
              strength
              intelligence
              wisdom
              luck
              agility
              vitality
              endurance
              dexterity
              hp
              mp
              stamina
              profession
              saleAuction
              {
                startingPrice
                endedAt
              }
              salePrice
              assistingPrice
              assistingAuction
              {
                startedAt
                endedAt
                startingPrice
                endingPrice
                
              }
            }
            }`
            }).then(res => {
              setgqlData3(res.data);
            });

            gqlclient.query({query: gql`query GetExchangeRates {
              heroes(where: {saleAuction_not: null} first:1000 skip:4000)
              {
                id
                statGenes
                visualGenes
                rarity
                shiny
                generation
                mining
                gardening
                foraging
                fishing
                level
                xp
                mainClass
                subClass
                summons
                maxSummons
                sp
                status
                strength
                intelligence
                wisdom
                luck
                agility
                vitality
                endurance
                dexterity
                hp
                mp
                stamina
                profession
                saleAuction
                {
                  startingPrice
                  endedAt
                }
                salePrice
                assistingPrice
                assistingAuction
                {
                  startedAt
                  endedAt
                  startingPrice
                  endingPrice
                  
                }
              }
              }`
              }).then(res => {
                setgqlData4(res.data);
              });

              gqlclient.query({query: gql`query GetExchangeRates {
                heroes(where: {saleAuction_not: null} first:1000 skip:5000)
                {
                  id
                  statGenes
                  visualGenes
                  rarity
                  shiny
                  generation
                  mining
                  gardening
                  foraging
                  fishing
                  level
                  xp
                  mainClass
                  subClass
                  summons
                  maxSummons
                  sp
                  status
                  strength
                  intelligence
                  wisdom
                  luck
                  agility
                  vitality
                  endurance
                  dexterity
                  hp
                  mp
                  stamina
                  profession
                  saleAuction
                  {
                    startingPrice
                    endedAt
                  }
                  salePrice
                  assistingPrice
                  assistingAuction
                  {
                    startedAt
                    endedAt
                    startingPrice
                    endingPrice
                    
                  }
                }
                }`
                }).then(res => {
                  setgqlData5(res.data);
                });

                gqlclient.query({query: gql`query GetExchangeRates {
                  heroes(where: {saleAuction_not: null} first:1000 skip:6000)
                  {
                    id
                    statGenes
                    visualGenes
                    rarity
                    shiny
                    generation
                    mining
                    gardening
                    foraging
                    fishing
                    level
                    xp
                    mainClass
                    subClass
                    summons
                    maxSummons
                    sp
                    status
                    strength
                    intelligence
                    wisdom
                    luck
                    agility
                    vitality
                    endurance
                    dexterity
                    hp
                    mp
                    stamina
                    profession
                    saleAuction
                    {
                      startingPrice
                      endedAt
                    }
                    salePrice
                    assistingPrice
                    assistingAuction
                    {
                      startedAt
                      endedAt
                      startingPrice
                      endingPrice
                      
                    }
                  }
                  }`
                  }).then(res => {
                    setgqlData6(res.data);
                  });
  },[])

  if (gqldata0 === "") return (<div><CircularProgress />0</div>);
  if (gqldata1 === "") return (<div><CircularProgress />1</div>);
  if (gqldata2 === "") return (<div><CircularProgress />2</div>);
  if (gqldata3 === "") return (<div><CircularProgress />3</div>);
  if (gqldata4 === "") return (<div><CircularProgress />4</div>);
  if (gqldata5 === "") return (<div><CircularProgress />5</div>);
  if (gqldata6 === "") return (<div><CircularProgress />6</div>);
  if (data === "") return (<div><CircularProgress />7</div>);

  gqldata4.heroes.map((x) => {
    return (
    <Grid item xs={12}>
        {x.id}: {x.generation}
    </Grid>
    );
  })

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
  var rarity = ["0","1","2","3","4"]
  var generations = ["g0","g1","g2","g3","g4","g5","g6","g7","g8","g9","g10","g11"]
  var professions = ["mining","fishing","gardening","foraging"]
  var sumLeft = ["0","1","2","3","4","5","6","7","8","9","10"]
  heroClass.forEach(c => {
    rarity.forEach(r => {
      dataParams[c]["Rarity"][r] = {}
      generations.forEach(g => {
        dataParams[c]["Rarity"][r][g] = {}
        professions.forEach(p => {
          dataParams[c]["Rarity"][r][g][p] = {}
          sumLeft.forEach (s => {
            dataParams[c]["Rarity"][r][g][p][s] = JSON.parse(JSON.stringify(priceParams));
          })
        })
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
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].min = element.MIN_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].max = element.MAX_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].avg = element.AVG_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].median = element.MEDIAN_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].mode = element.MODE_JEWEL
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].twavg = element.TW_AVERAGE
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].range = element.RANGE
      dataParams[element.HERO_INFO_CLASS]["Rarity"][element.HERO_INFO_RARITY]["g"+element.HERO_INFO_GENERATION][element.PROFESSION_MAIN][element.SUMMONS_LEFT].size = element.SAMPLE_SIZE
  });

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <h2>Data Agg</h2>
      </Grid>
      <Grid item md={12}>
        <h2>Warriors - Price Per SummonsLeft</h2>
      </Grid>
      <Grid container>
      <Grid item md={3}>common g1 mining
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g1" profFilter="mining"/>
      </Grid><Grid item md={3}>common g1 gardening
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g1" profFilter="gardening"/>
      </Grid><Grid item md={3}>common g1 fishing
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g1" profFilter="fishing"/>
      </Grid><Grid item md={3}>common g1 foraging
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g1" profFilter="foraging"/>
      </Grid>
      </Grid>

      <Grid container>
      <Grid item md={3}>uncommon g1 mining
      <LazyChartOne data={dataParams} classFilter="0" rarityFilter="1" genFilter="g1" profFilter="mining"/>
      </Grid><Grid item md={3}>uncommon g1 gardening
      <LazyChartOne data={dataParams} classFilter="0" rarityFilter="1" genFilter="g1" profFilter="gardening"/>
      </Grid><Grid item md={3}>uncommon g1 fishing
      <LazyChartOne data={dataParams} classFilter="0" rarityFilter="1" genFilter="g1" profFilter="fishing"/>
      </Grid><Grid item md={3}>uncommon g1 foraging
      <LazyChartOne data={dataParams} classFilter="0" rarityFilter="1" genFilter="g1" profFilter="foraging"/>
      </Grid>

      <Grid item md={3}>common g2 mining
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g2" profFilter="mining"/>
      </Grid><Grid item md={3}>common g2 gardening
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g2" profFilter="gardening"/>
      </Grid><Grid item md={3}>common g2 fishing
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g2" profFilter="fishing"/>
      </Grid><Grid item md={3}>common g2 foraging
        <LazyChartOne data={dataParams} classFilter="0" rarityFilter="0" genFilter="g2" profFilter="foraging"/>
      </Grid>
      </Grid>

    </Grid>
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
            <ListItem button key={'Lines'} onClick={() => setPage(4)}>
              <ListItemIcon>
                <Image alt="" src='/meLogo.png' height={24} width={24} />
              </ListItemIcon>
              <ListItemText primary={'Lines'} />
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
