import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Editor from './Editor';
import Options from './Options';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';
import LoadButton from './LoadButton';
import Chip from '@material-ui/core/Chip';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function MutateTab({ setTab, setLatentVector }) {
    const [inpProgram, setInpProgram] = useState(
`// Try a different input here!

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    map<int,int> cn;
    int ans = 0;

    for(int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cn[x]++;
        ans = max(ans,cn[x]);
    }

    cout << ans;
    return 0;
}`);

    const [outProgram, setOutProgram] = useState('');
    const [latentVectorTemp, setLatentVectorTemp] = useState([]);
    const [outProgramFinal, setOutProgramFinal] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [topK, setTopK] = useState(0);
    const [topP, setTopP] = useState(0);
    const [loading, setLoading] = useState(false);
    const [compilesLoading, setCompilesLoading] = useState(true);
    const [compiles, setCompiles] = useState();
    const [binaryName, setBinaryName] = useState('');
    const [revealImports, setRevealImports] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const imports = 'using namespace std;\n#include <vector>\n#include <iostream>\n#include <string>\n#include <cstring>\n#include <queue>\n#include <stdio.h>\n#include <math.h>\n#include <map>\n#include <set>\n#include <stack>\n\n';


    function mutate() {
        setLoading(true);
        setOutProgram('');
        setOutProgramFinal('');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({program: inpProgram, temperature: temperature, top_k: topK, top_p: topP})
        }

        fetch('/api/mutate', requestOptions)
        .then(res => res.json())
        .then(data => {
            setOutProgram(data.program);
            setLatentVectorTemp(data.latent_vector)
            setLoading(false);
        })
        .catch(function(error) {
            setSnackbarOpen(true);
            setLoading(false);
        });
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    }

    useEffect(() => {
        // action on update of outProgram
        if (outProgram.length > 0) {
            setCompilesLoading(true);

            if (binaryName != '') {
                fetch('/api/programs/' + binaryName, {method: 'DELETE'})
                setBinaryName('')
            }

            setOutProgramFinal(outProgram);
            console.log('outprogram: ' + outProgram)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({program: outProgram})
            }

            fetch('/api/programs', requestOptions)
            .then(res => {
                setCompiles(res.ok);
                setCompilesLoading(false);
                if (res.ok) res.json().then(json => setBinaryName(json.binary));
            });
        }
    }, [outProgram]);


    useEffect(() => {
        console.log(outProgramFinal);
        if (outProgramFinal.length > 0 && revealImports) {
            setOutProgramFinal(imports + outProgramFinal.replace(imports, ''));
        }
    }, [outProgramFinal]);

    function onTemperatureChange(event, newValue) {
        setTemperature(newValue);
    }

    function onTopKChange(event, newValue) {
        setTopK(newValue);
    }

    function onTopPChange(event, newValue) {
        setTopP(newValue);
    }

    function onInpProgramChange(newValue, event) {
        setInpProgram(newValue);
    }

    const handleRevealImports = (event) => {
        setRevealImports(event.target.checked);

        if (event.target.checked) {
            if (outProgram.length > 0) {
                setOutProgramFinal(imports + outProgramFinal.replace(imports, ''));
            }
        } else {
            setOutProgramFinal(outProgramFinal.replace(imports, ''))
        }
    };

    const copyLatentToDecode = () => {
        setLatentVector(latentVectorTemp);
        setTab(1);
    };

 return (
     <div>
    <Grid container justifyContent="center" spacing={3} >
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
            <Typography variant="h6" component="h1" style={{color: "#fff"}}>{"Input program"}</Typography>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} style={{position: "relative"}}>
            <Typography variant="h6" component="h1" style={{color: "#fff", display: "inline"}}>{"Output program "}</Typography>
            <div style={{position: "absolute", display: "inline", right: 0}}>
            <Typography variant="h6" component="h6" style={{color: "#fff", display: "inline", fontSize: "14px"}}>{"Reveal imports"}</Typography>
            <Switch
                checked={revealImports}
                onChange={handleRevealImports}
                name="reveal imports"
                inputProps={{ 'aria-label': 'reveal imports' }}
            />
            </div>
        </Grid>
    </Grid>
    <Grid container spacing={3}  justify="center" direction="row" alignItems="center">
        <Grid item xs={2}>
        <Options 
          temperature={temperature}
          onTemperatureChange={onTemperatureChange}
          topK={topK}
          onTopKChange={onTopKChange}
          topP={topP}
          onTopPChange={onTopPChange}
          />
        </Grid>
        <Grid item xs={4}>
        <Box boxShadow={10}>
          <Editor onChange={onInpProgramChange} value={inpProgram} />
          </Box>
        </Grid>
        <Grid item xs={1}>
            <LoadButton onClick={mutate} loading={loading} content={<ArrowRightAltIcon fontSize="large" style={{color: "whitesmoke"}}/>} />
            <div style={{marginTop: "20px"}}>
            <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                onClick={copyLatentToDecode}
                disabled={outProgramFinal.length === 0}
                >
                <FileCopyIcon />
                Decode
            </Fab>
            </div>
        </Grid>

        <Grid item xs={4}>
        <Box boxShadow={10}>
        <div style={{position: "relative", zIndex: 9}}>
        <Chip
        size="small"
        label="Compiles"
        color="primary"
        icon={compiles ? <BeenhereIcon /> : <NotInterestedIcon />}
        style={{position: "absolute", 
                top: "10px", 
                right: "10px", 
                visibility: loading ? "hidden": compilesLoading ? "hidden" : "visible",
                backgroundColor: compiles ? "#088729": "#af0116"}}
        />
        </div>
          <Editor value={outProgramFinal} readOnly={true} />
          </Box>
        </Grid>
    </Grid>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          Cannot process the input, please make sure the input program is compilable.
        </Alert>
      </Snackbar>
    </div>
 );
}