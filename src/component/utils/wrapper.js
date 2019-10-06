import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Hidden,
  Box,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  dialogContent: {
    margin: "0 12px 12px",
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Hint</DialogTitle>
      <DialogContentText className={classes.dialogContent}>
        Swipe to remove the item
      </DialogContentText>
      <Button onClick={handleClose}>Close</Button>
    </Dialog>
  );
}

function ResponsiveDialog() {
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(false);

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

function WrapperComponent(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box textAlign="center">
        <h3>About This app</h3>
      </Box>
      <Divider />
      <Container>
        <p>This is a demo for Foreign Exchange Currency.</p>
        <p>You can add new Currency, or Change the base of the currency.</p>
        <p>You can Swipe the item to remove it from list.</p>
        <p>If you open it from mobile device, you can add to home screen so it's looks like an app on your mobile device.</p>
      </Container>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Foreign Exchange Currency
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default function Wrapper({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <WrapperComponent />
      <main className={classes.content}>
        <div className={classes.content} />
        <ResponsiveDialog />
        {children}
      </main>
    </div>
  );
}

// Wrapper = ({ children }) => (

// );
