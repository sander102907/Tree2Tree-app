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
      </CardContent>
      </Card>
    )
}