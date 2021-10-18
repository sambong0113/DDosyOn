import React from 'react';
import { useRouter } from "next/router";
import { ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';            

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
    borderRadius: 0
  },
  cardMedia: {
    paddingTop: '100%',
    
  },
  cardContent: {
    flexGrow: 1,
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
}));


const GridItem = ({ item }) => {
  const classes = useStyles();
  const router = useRouter();
  // const { thumbnail, name, subTitle, price } = item

  const onClickHandler= e => {
    router.push({
      pathname: '/item/[id]',
      query: { id: 0 },
    })
  }
  
  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.cardAction}
        onClick={onClickHandler}
      >
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom align="center" variant="h5" component="h2">
            풋귤
          </Typography>
          <Typography align="center" >
            This is a media card. You can use this section to describe the content.
          </Typography>
          <Typography align="center" >
            ₩15000 ~
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
}

export default GridItem;
