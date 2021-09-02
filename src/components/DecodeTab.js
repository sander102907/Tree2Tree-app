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
import LatentVectorPanel from './LatentVectorPanel';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


export default function DecodeTab({ latentVector, setLatentVector }) {
    const [outProgram, setOutProgram] = useState('');
    const [outProgramFinal, setOutProgramFinal] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [topK, setTopK] = useState(0);
    const [topP, setTopP] = useState(0);
    const [loading, setLoading] = useState(false);
    const [compilesLoading, setCompilesLoading] = useState(true);
    const [compiles, setCompiles] = useState();
    const [binaryName, setBinaryName] = useState('');
    const [revealImports, setRevealImports] = useState(false);


    // useEffect(() => {
        
    // }, []);


    const imports = 'using namespace std;\n#include <vector>\n#include <iostream>\n#include <string>\n#include <cstring>\n#include <queue>\n#include <stdio.h>\n#include <math.h>\n#include <map>\n#include <set>\n#include <stack>\n\n';


    function decode() {
        setLoading(true);
        setOutProgram('');
        setOutProgramFinal('');


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({latent_vector: latentVector, temperature: temperature, top_k: topK, top_p: topP})
        }

        fetch('/api/decode', requestOptions)
        .then(res => res.json())
        .then(data => {
            setOutProgram(data.program);
            setLoading(false);
        });
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

 return (
     <div>
    <Grid container justifyContent="center" spacing={3} >
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
            <Typography variant="h6" component="h1" style={{color: "#fff", display: "inline-block"}}>{"Latent vector"}</Typography>
            <Tooltip disableFocusListener arrow title="The decoder of the autoencoder decodes a 150 dimensional latent vector into a C++ program. Here you can experiment with different values for the scalars of the latent vector.">
                <IconButton size="small" aria-label="help">
                    <HelpIcon fontSize="small" style={{color: "#fff"}} />
                </IconButton>
            </Tooltip>
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
            <LatentVectorPanel latentVector={latentVector} setLatentVector={setLatentVector} />
        </Grid>
        <Grid item xs={1}>
            <LoadButton onClick={decode} loading={loading} content={<ArrowRightAltIcon fontSize="large" style={{color: "whitesmoke"}}/>} />
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
    </div>
 );
}