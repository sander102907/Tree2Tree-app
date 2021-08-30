import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: "88%",
  },
  input: {
    width: 70,
  },
});

export default function InputSlider({value, onSliderChange, index}) {
  const classes = useStyles();
  const [scalar, setScalar] = useState(value);

  const handleSliderChange = (event, newValue) => {
    onSliderChange(index, newValue);
    setScalar(newValue);
  };

  const handleInputChange = (event) => {
    onSliderChange(index, event.target.value === '' ? '' : Number(event.target.value));
    setScalar(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <div className={classes.root} >
      <Grid container spacing={2} alignItems="center">
      <Grid item>
          {index + 1}.
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof scalar === 'number' ? scalar : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={-6}
            max={6}
            step={0.01}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={scalar}
            margin="dense"
            onChange={handleInputChange}
            style={{color: '#fff'}}
            inputProps={{
              step: 0.01,
              min: -6,
              max: 6,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}