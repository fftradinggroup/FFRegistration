import React, { useState, Component} from 'react';
import {Link} from 'react-scroll';
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  makeStyles,
  Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const DrawerComponent = () => {
  const useStyles = makeStyles(theme => ({
    drawerContainer: {},
    iconButtonContainer: {
      marginLeft: 'auto',
      color: 'white',
      position: 'absolute',
      right: 0,
      color: '#74a0c7',
    },

    menuIconToggle: {
      fontSize: '3rem',
    },
  }));

  const [openDrawer, setOpenDrawer] = useState(false);

  //Css
  const classes = useStyles();
  return (
    <>
      <Drawer
        anchor='right'
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}>
        <List>
          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText> <Link activeClass="active" to="about" spy={true} smooth={true} offset={-180}>About</Link></ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText> <Link  to="faqs" spy={true} smooth={true} offset={-180}>FAQs</Link></ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText> <Link  to="contact" spy={true} smooth={true} offset={-180}>Contact Us</Link></ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText> <Link  to="register" spy={true} smooth={true} offset={-180}>Register</Link></ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      {/* Since this is inside our toolbar we can push it to the end of the toolbar */}
      <IconButton
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple>
        <MenuIcon className={classes.menuIconToggle} />
      </IconButton>
    </>
  );
};

export default DrawerComponent;