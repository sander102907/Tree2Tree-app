import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import avatarSander from '../assets/SanderdeBruin.jpeg';
import avatarVadim from '../assets/VadimLiventsev.jpeg';
import avatarMilan from '../assets/MilanPetkovic.jpg';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
    root: {
      minWidth: "100%",
      backgroundColor: '#272e3a',
      color: 'whitesmoke',
      marginTop: "60px",
      textAlign: "center",
    },
    title: {
      fontSize: 14,
    },
    paper: {
        height: 270,
        width: 200,
        backgroundColor: "#272e3a",
        color: "#fff",
        marginTop: "15px"
      },
  });


export default function Footer() {
    const classes = useStyles(); 

    return (
      <Card className={classes.root} raised={true}>
      <CardContent>
      <Typography variant="h4" component="h2">
          About
        </Typography>
        <Typography>
            Tree2Tree is a dedicated website for demonstrating the principles shown in the paper
        </Typography>
        <Typography style={{}}>
            <b>Autoencoders as Tools for Program Synthesis</b>
        </Typography>
        <Typography variant="h6" component="h6" style={{marginTop: "25px"}}>
          Authors
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3}>
                {[
                    {"name": "Sander de Bruin", "organization": "Eindhoven University of Technology", "site": "https://github.com/sander102907", "avatar": avatarSander},
                    {"name": "Vadim Liventsev", "organization": "Eindhoven University of Technology", "site": "https://vadim.me/", "avatar": avatarVadim},
                    {"name": "Milan Petkovic", "organization": "Eindhoven University of Technology Philips Electronics N.V.", "site": "https://www.tue.nl/en/research/researchers/milan-petkovic/", "avatar": avatarMilan},
                    
                ].map((value) => (
                    <Grid key={value} item>
                        <Paper className={classes.paper} style={{paddingTop: "5px"}}>
                        <Avatar alt={value.name} src={value.avatar} style={{width: "150px", height: "150px", margin: "10px auto", backgroundColor: "#C72125", fontSize: "35px"}} />
                        <Typography variant="subtitle1">
                            <b>{value.name}</b>
                        </Typography>
                        <Typography variant="caption">
                            {value.organization}
                        </Typography>
                        <br />
                        <IconButton 
                            size="small" 
                            aria-label="help"
                            href={value.site}
                            target="_blank"
                            rel="noreferrer">
                            <LanguageIcon fontSize="small" style={{color: "#fff"}} />
                        </IconButton>
                        </Paper>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
        <Typography variant="h6" component="h6" style={{marginTop: "25px"}}>
          Website by
        </Typography>
        <Typography variant="subtitle1" component="h6">
          Sander de Bruin
        </Typography>
      </CardContent>
      </Card>
    )
}