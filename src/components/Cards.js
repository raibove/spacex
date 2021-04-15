import React,{ useEffect, useState }  from 'react';
import {withRouter,useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from '@material-ui/core/CardHeader';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";

const useStyles = makeStyles( (theme) => ({
    root: {
      flexGrow:1,
      backgroundColor:'#aaf',
 
    },
    
    cardContainer:{
      /*  width:'10vw',
        height:'20vh'
        */
    },
    card:{
        padding:'10px',
       // height:'440px',
       [theme.breakpoints.down('sm')]: {
        padding:'25px'
        },
    },
    cardAction:{
        display:'flex',
        alignItem: "center",
        justifyContent: "center"
    },
    cardImg:{
        width:'80%',
        padding:'20px 0px',
        //width:'auto',
        //maxHeight:'240px',
    },
    cardTitle:{
        [theme.breakpoints.down('sm')]: {
            fontSize:'15px'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:'25px'
        },
    },
    filter:{
        margin:'10px',
        backgroundColor:'white',
    },
    activeYear:{
        backgroundColor:'#cfd',
        color:'blue',
        fontSize:'28px'
    },
    launchSuccess:{
        backgroundColor:'yellow'
    }
  }));
  
const setParams = ({year})=>{
    const searchParams = new URLSearchParams();
    if(year)
    searchParams.set("year",year);
    else
    searchParams.delete("year")
    return searchParams.toString(); 
}

//const url = setParams({year:"2000"});
const years = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
const launch_success = ['true','false'];
const Cards=(props)=>{

    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [cardData, setCardData] = useState();
    const [activeYear, setActiveYear] = useState(null);
    const [launchSuccess, setLaunchSuccess] = useState(null);

    let history = useHistory();

    const handleYear= (e,yr)=>{
        if(activeYear==yr)
            setActiveYear(null);
        else
            setActiveYear(yr);
        };

    const handleLaunch=(e,launch)=>{
        if(launchSuccess==launch)
            setLaunchSuccess(null);
        else
            setLaunchSuccess(launch);
    }

    const updateUrl = ({year,success})=>{
        const searchParams = new URLSearchParams();
        if(success!=null)
            searchParams.set("success",success)
        else
            searchParams.delete("success")
        if(year!=null)
            searchParams.set("year",year)
        else
            searchParams.delete("year")     
        const url = searchParams.toString();
        //if(url){
        history.push(`?${url}`);
        /*
        else{
            history.push('/')
        } 
    */
    }

    useEffect(()=>{

        setIsLoading(true);
        axios
        .get("https://api.spacexdata.com/v3/launches?limit=10")
        .then((res)=>{
            setCardData(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        setIsLoading(false);
    },[]);

    useEffect(()=>{
        updateUrl({year:activeYear, success:launchSuccess});
    },[activeYear,launchSuccess]);
    return(
        <div>
                {console.log("dttt ** ",cardData)}
            {cardData?(
            <Grid  className={classes.root} container justify="center" display="flex">
                <Grid item xs={2}>
                    <div className={classes.filter}>
                        Filters
                        <h2>Launch Year</h2>
                        <Grid container  display="flex" style={{padding:'8px'}}>
                        {years.map((yr,index)=>(
                        <Grid item xs={12} sm={4} lg={6} style={{padding:'8px'}}>
                            <Chip 
                                key={index}
                                label={yr}
                                onClick={e=> handleYear(e,yr)}
                                className={activeYear==years[index]?classes.activeYear:''}
                            />
                        </Grid>
                        )  
                    )}
                    </Grid>

                    <h2>Launch Success</h2>
                    <Grid container display="flex" style={{padding:'8px'}}>
                        {launch_success.map((launch,index)=>(
                            <Grid item xs={12} sm={4} lg={6} style={{padding:'8px'}}>
                                <Chip
                                    key={index}
                                    label={launch}
                                    onClick={e=>{ handleLaunch(e,launch);  }}
                                    className={launchSuccess==launch_success[index]?classes.launchSuccess:''}
                                />
                            </Grid>
                        ))}

                    </Grid>
                    </div>
                </Grid>
                <Grid item xs={2} sm={8}>
                <Grid container  display="flex">
                {cardData.filter(card=> (
                        (!activeYear? card.launch_year: card.launch_year == activeYear) && (launchSuccess==null? String(card.launch_success): String(card.launch_success) == launchSuccess)
                        )).map((crd,i)=>(
                            <Grid key={crd.flight_number} item xs={12} sm={4} md={4} lg={3} className={classes.card}>
                            <Card  key={i} className={classes.cardContainer}>
                                    <CardActionArea className={classes.cardAction}>
                                        <CardMedia
                                            component="img"
                                            alt={crd.rocket.rocket_name}
                                            image = {crd.links.mission_patch}
                                            title="space"
                                            className={classes.cardImg}
                                        />
                                    </CardActionArea>
                                    <CardContent>
                                        
                                        <h2 className={classes.cardTitle} style={{color:'blue'}}>{crd.mission_name} #{crd.flight_number}</h2>
                                        <h3>Launch Year: {crd.launch_year}</h3>
                                        <h3>Launch Success: {(crd.launch_success).toString()}</h3>
                                    </CardContent>
                                </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
            ):(<div>
                Loading
            </div>)}
        </div>
    )
};

export default withRouter(Cards);
