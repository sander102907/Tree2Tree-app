import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function LoadButton(props) {
    return (
        <Button position="relative" 
             display="inline-flex" 
            //  borderRadius="20%" 
             style={{backgroundColor: "#C72125", height: "55px", width: "55px", minWidth: "55px", borderRadius: "50%"}} 
             onClick={props.onClick}

        >
            <CircularProgress size={30} style={{color: "#fff", visibility: props.loading ? "visible": "hidden"}} />
            <Box
                top={"5px"}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary" style={{visibility: props.loading ? "hidden": "visible"}}>
                    {props.content}
                </Typography>
            </Box>
        </Button>
    );
}