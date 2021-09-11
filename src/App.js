import React, { useState } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MutateTab from './components/MutateTab';
import DecodeTab from './components/DecodeTab';
import BookIcon from '@material-ui/icons/Book';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Footer from './components/Footer';


const theme = createTheme({
  palette: {
    primary: {
      light: '#ea0408',
      main: '#C72125',
      dark: '#840306',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'Roboto'
    ].join(','),
  },
});

function App() {
  const [tab, setTab] = useState(0);
  const [latentVector, setLatentVector] = useState(new Array(150).fill(0));


  const changeTab = (event, newTab) => {
    setTab(newTab);
  };

  const changeTabIndex = (index) => {
    setTab(index);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Box boxShadow={10}>
        <header className="App-header">
        <Typography variant="h4" component="h1">
          Tree2Tree
        </Typography>

        <Typography variant="h6" component="h1">
          A Tree-based VAE-RNN autoencoder for C++
        </Typography>
          <div>
          <Button
          variant="outline"
          color="inherit"
          startIcon={<BookIcon />}
          href="https://arxiv.org/abs/2108.07129"
          target="_blank"
          rel="noreferrer"
          >
          Paper
          </Button>
          <Button
            variant="outline"
            color="inherit"
            startIcon={<GitHubIcon />}
            href="https://github.com/sander102907/autoencoder_program_synthesis/"
            target="_blank"
            rel="noreferrer"
          >
          Source Code
          </Button>
        </div>
      </header>
      </Box>
      <Tabs
        value={tab}
        onChange={changeTab}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Mutate" style={{color: 'whitesmoke'}}/>
        <Tab label="Decode" style={{color: 'whitesmoke'}}/>
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tab}
        onChangeIndex={changeTabIndex}
      >
        <TabPanel value={tab} index={0} dir={theme.direction} style={{minWidth: '1800px', width: 'fit-content'}}>
          <MutateTab setTab={setTab} setLatentVector={setLatentVector} />
        </TabPanel>
        <TabPanel value={tab} index={1} dir={theme.direction} style={{minWidth: '1800px', width: 'fit-content'}}>
          <DecodeTab latentVector={latentVector} setLatentVector={setLatentVector} />
        </TabPanel>
      </SwipeableViews>
        
      </div>
      <Footer />
    </MuiThemeProvider>
  );
}

export default App;
