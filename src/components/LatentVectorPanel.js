import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import LatentSlider from './LatentSlider';
import { FixedSizeList } from 'react-window';
import CasinoIcon from '@material-ui/icons/Casino';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    backgroundColor: '#272e3a',
    color: 'whitesmoke',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },


});

export default function Options({ latentVector, setLatentVector }) {
  const classes = useStyles(); 
  

    function handleSliderChange(index, value) {
        if (value > 6) {
            value = 6;
        } else if (value < -6) {
            value = -6;
        }

        latentVector[index] = value;
    }


    const Row = ({data, index, style}) => (
        <div style={style}>
            <LatentSlider 
                value={typeof data[index] === 'number' ? parseFloat(data[index].toFixed(2)) : 0 } 
                onSliderChange={handleSliderChange}
                index={index}
            >
            </LatentSlider>
        </div>
    );

    const randomize = () => {
        const newValues = [];

        for (let i = 0; i < 150; i++) {
            newValues.push(randn());
        }

        setLatentVector([...newValues]);
    }

    // Generate random guassian scalar
    function randn() {
        var u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    }

    const reset = () => {
        setLatentVector(new Array(150).fill(0));
    }



  return (
    <Card className={classes.root} raised={true} style={{height: "500px"}}>
      <CardContent>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CasinoIcon />}
        style={{marginBottom: "20px", marginRight: "20px"}}
        onClick={randomize}
      >
        Randomize
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<RotateLeftIcon />}
        style={{marginBottom: "20px"}}
        onClick={reset}
      >
        Reset
      </Button>
        <FixedSizeList 
            height={450} 
            itemCount={150} 
            itemSize={60} 
            itemData={latentVector}
            style={{overflow: "auto"}}>
            {Row}
        </FixedSizeList>
      </CardContent>
    </Card>
  );
}
