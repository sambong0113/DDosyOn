import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        {new Date().getFullYear()}. 또시온 Co.  all rights reserved.
      </Typography>
    );
  }
  
export default function Footer() {
    const classes = useStyles();

    return (
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            또시온,
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          제주도 사는 또시온입니다! 
        </Typography>
        <Copyright />
      </footer>
    )
}
