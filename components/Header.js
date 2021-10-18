import React from 'react';
import clsx from 'clsx';
import { useRouter } from "next/router";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Link, Collapse } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 240
const items = [
  { 
    id: 1,
    name: "귤",
    subitems: [
      {
          id: 1,
          name: "천혜향"
      },
      {
          id: 2,
          name: "황금향"
      },
      {
          id: 3,
          name: "청귤"
      }
    ]
  },
  { 
    id: 1,
    name: "기타",
    subitems: [
      {
          id: 1,
          name: "뱅쇼 Kit"
      },
      {
          id: 2,
          name: "커피"
      },
    ]
  },
]
const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: 'white',
      boxShadow: 'none',
      borderBottom: '1px solid #d1d1d1'
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      zIndex: 10,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    headerTitle: {
      position: 'absolute',
      left: 0,
      width: '100%',
      color: 'black',
    },
    headerTitleShift: {
      position: 'relative',
      paddingLeft: '30px'
    },
    headerText: {
      display: 'block',
      textAlign: 'initial'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
  }));

const Header = ({ open, handleDrawerOpen, handleDrawerClose }) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    const [expand, setExpend] = React.useState({});

    const onClickHandler= e => {
      router.push('/')
    }

    const handleExpand = e => {
      console.log(e)
      setExpend(prevState => ({
          ...prevState,
          [e]: !expand[e]
      }));
  };

    return (
      <>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              position="fixed"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div className={clsx(classes.headerTitle, open && classes.headerTitleShift)}>
              <Typography variant="h6" align={ open ? "left" : "center" }  noWrap >
                <Link color='initial' underline='none' onClick={onClickHandler}>
                  또시온, 🍊
                </Link>
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['About', 'PRODUCT', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <div>
            {items.map(item => (
              <div key={item.id}>
                {item.subitems != null ? (
                  <div key={item.id}>
                    <ListItem
                      button 
                      key={item.id}
                      onClick={handleExpand.bind(this, item.name)}
                    >
                      <ListItemText primary={item.name} />
                      {expand[item.name] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      key={items.id}
                      in={expand[item.name]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding>
                        {item.subitems.map(sitem => (
                          <ListItem
                            button
                            key={sitem.id}
                            className={classes.nested}
                          >
                            <ListItemText key={sitem.id} primary={sitem.name} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>{" "}
                  </div>
                ) : (
                  <ListItem button key={item.id} >
                    <ListItemText primary={item.name} />
                  </ListItem>
                )}
              </div>
            ))}
          </div>
        </Drawer>
      </>
    );
}
export default Header;