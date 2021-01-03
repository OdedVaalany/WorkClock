import { AppBar, Box, Button, Drawer, makeStyles, Tabs, Toolbar, Typography, Switch, IconButton } from '@material-ui/core';
import React, { createContext, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import App from '../App';
import JoinForm from './JoinForm';
import SignInForm from './SignInForm';

export default function Dashbord() {
    const UserDataContext = createContext(null);
    const [userData, setUserData] = useState();
    //need to build the reload function for the data

    const classes = style();
    const [openConnections, setOpenConnections,] = useState(false);
    const [CS, setCS,] = useState(false);
    const ToggleConnections = () => {
        setCS(!CS);
    }
    return (
        <React.Fragment>
            <UserDataContext.Provider value={null}>
                <AppBar color='primary' variant='elevation' className={classes.AppBar}>
                    <Toolbar className={classes.Toolbar}>
                        <Typography variant='h1' className={classes.Title}>WorkClock</Typography>
                        <Box className={classes.Box}>
                            <Button variant='contained' color='secondary' className={classes.HeaderButton} onClick={() => setOpenConnections(true)}>Join</Button>
                            <Button variant='outlined' color='secondary' className={classes.HeaderButton}>Log In</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer open={openConnections} onClose={() => setOpenConnections(false)} anchor='right' className={classes.Drawer}>
                    <Box className={classes.DrawerBox}> 
                        <IconButton className={classes.ExitIcons} onClick={() => setOpenConnections(false)}><CloseIcon/></IconButton>
                        {CS ? <JoinForm/> : <SignInForm/>}
                        <Box className={classes.ToggleBox}>
                            Sign In
                            <Switch size='medium' checked={CS} onChange={ToggleConnections} color='primary'/>
                            Join
                        </Box>
                    </Box>
                </Drawer>
            </UserDataContext.Provider>
        </React.Fragment>
    )
}

const style = makeStyles((theme) =>({
    Toolbar : {
        justifyContent : 'space-between',
    },
    Title : {
        display : 'inline-block',
        width : 'fit-content',
    },
    Box : {
        display : 'flex',
        width : 'fit-content',
    },
    HeaderButton : {
        margin : 'auto 5px',
    },
    Drawer : {
        width : '200px',
    },
    AppBar : {
        zIndex : theme.zIndex.drawer +1,
    },
    DrawerBox : {
        margin : '0px',
        width : '350px',
        padding : '5px',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        height : '100%',
        [theme.breakpoints.down('xs')] : {
            width: '100vw',
        },
    },
    ToggleBox : {
        position : 'absolute',
        bottom : '0px',
    },
    ExitIcons : {
        position : 'absolute',
        top : '5px',
        left : '5px'
    }

}));
