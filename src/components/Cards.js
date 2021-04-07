import React,{ useEffect, useState }  from 'react';

import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from '@material-ui/core/GridListTileBar';

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

const useStyles = makeStyles(theme => ({
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
        
    }
  }));
  

const Cards=()=>{
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [cardData, setCardData] = useState();

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
    return(
        <div>
                {console.log("dttt ** ",cardData)}
            {cardData?(
        <Grid  className={classes.root}>
                <Grid container justify="center" display="flex">
                {cardData.map(crd=>(
                    <Grid key={crd.flight_number} item xs={12} sm={4} md={4} lg={3} className={classes.card}>
                       <Card  className={classes.cardContainer}>
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
            ):(<div>
                Loading
            </div>)}
        </div>
    )
}

export default Cards;

/*

 <Card  className={classes.cardContainer}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={crd.rocket.rocket_name}
                                    image = {crd.links.mission_patch}
                                    title="space"
                                    className={classes.cardImg}
                                />
                            </CardActionArea>
                            <CardContent>
                                <h2>{crd.mission_name} #{crd.flight_number}</h2>
                            </CardContent>
                        </Card>
*/