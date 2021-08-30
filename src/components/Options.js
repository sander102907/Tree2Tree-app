import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from './Slider';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 350,
    backgroundColor: '#272e3a',
    color: 'whitesmoke'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Options({ temperature, onTemperatureChange, topK, onTopKChange, topP, onTopPChange }) {
  const classes = useStyles();  

    const top_p_marks = [
        {
            value: 0,
            label: '0',
        },
        {
        value: 0.2,
        label: '0.2',
        },
        {
        value: 0.4,
        label: '0.4',
        },
        {
        value: 0.6,
        label: '0.6',
        },
        {
        value: 0.8,
        label: '0.8',
        },
        {
        value: 1,
        label: '1',
        },
    ]

    const temp_marks = [
      {
        value: 0,
        label: '0',
      },
      {
      value: 0.4,
      label: '0.4',
      },
      {
      value: 0.8,
      label: '0.8',
      },
      {
      value: 1.2,
      label: '1.2',
      },
      {
        value: 1.6,
        label: '1.6',
      },
      {
        value: 2.0,
        label: '2',
      },
    ]

    const amt_marks = [{
        value: 0,
        label: '0',
        },
        {
        value: 40,
        label: '40',
        },
        {
        value: 80,
        label: '80',
        },
        {
        value: 120,
        label: '120',
        },
        {
        value: 160,
        label: '160',
        },
        {
        value: 200,
        label: '200',
        },
    ]

    function setGreedyPreset() {
        onTemperatureChange(null, 0);
        onTopKChange(null, 0);
        onTopPChange(null, 0);
    }

    function setSamplingPreset() {
        onTemperatureChange(null, 0.7);
        onTopKChange(null, 40);
        onTopPChange(null, 0.9);
    }

  return (
    <Card className={classes.root} raised={true}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Decoding options
        </Typography>
        <Divider style={{margin: "10px", height: "2px"}} />
        <Typography variant="h6" component="h3">
          Presets
        </Typography>
        <Button onClick={setGreedyPreset} variant="contained" color="primary" style={{margin: "10px"}}>
          Greedy
        </Button>
        <Button onClick={setSamplingPreset} variant="contained" color="primary">
          Sampling
        </Button>
        <Divider style={{margin: "10px", height: "2px"}} />
        <Typography variant="h6" component="h3" style={{margin: "10px 0 20px 0"}}>
          Manual controls
        </Typography>
        <Slider title={"Temperature"} value={temperature} onChange={onTemperatureChange} min={0} max={2} steps={0.01} marks={temp_marks} />
        <Slider title={"Top-k"} value={topK} onChange={onTopKChange} min={0} max={200} steps={1} marks={amt_marks} />
        <Slider title={"Top-p"} value={topP} onChange={onTopPChange} min={0} max={1} steps={0.01} marks={top_p_marks} />

      </CardContent>
    </Card>
  );
}
