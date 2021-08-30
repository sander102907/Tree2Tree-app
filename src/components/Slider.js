import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    marginRight: 20,
    marginLeft: 10,
  },
  input: {
    width: 42,
  },
});

export default function TemperatureSlider({ title, value, onChange, min, max, steps, marks }) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={onChange}
            aria-labelledby="input-slider"
            min={min}
            max={max}
            step={steps}
            marks={marks}
          />
        </Grid>

      </Grid>
    </div>
  );
}
