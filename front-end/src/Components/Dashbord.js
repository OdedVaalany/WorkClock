import { AppBar, Box, Button, Drawer, makeStyles, Toolbar, Typography, Switch, IconButton, Avatar, TextField } from '@material-ui/core';
import React, { createContext, useContext, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import JoinForm from './JoinForm';
import SignInForm from './SignInForm';
import HomePage from './HomePage';
import Overview from './Overview';
import { purple } from '@material-ui/core/colors';

export const UserDataContext = createContext(null);

export default function Dashbord() {
    const [userData, setUserData] = useState({
        Firstname : 'Oded',
        Lastname : 'Vaalany',
        Email : 'avoded2@gmail.com',
        Password : 'avoded2@gmail.com',
        Gender : 'male',
        Phonenumber : '0546862210',
        Birthday : Date.now(),
        perHour : 35,
        Reports : [
            {date : Date.now(), start : '01:00' , end : '08:00' , perHour : 35,totalPay : 250,break : '00:00'},
            {date : (Date.now()-1000*60*60*24), start : '20:00' , end : '04:00', perHour : 35,totalPay : 250,break : '00:00'},
            {date : (Date.now()-1000*60*60*24*10), start : '00:00' , end : '08:00', perHour : 35,totalPay : 250,break : '00:00'},
            {date : Date.now(), start : '09:00' , end : '17:34', perHour : 35,totalPay : 250,break : '00:00'},
        ]
    });
    //need to build the reload function for the data

    const classes = style();
    const [openConnections, setOpenConnections,] = useState(false);
    const [OpenAccountSetting, setOpenAccountSetting] = useState(false)
    const [CS, setCS,] = useState(false);
    const ToggleConnections = () => {
        setCS(!CS);
    }
    
    const LogOut = () =>{
        setUserData(null);
        //קריאת ניתוק לשרת
    }

    return (
        <React.Fragment>
            <UserDataContext.Provider value={userData}>
                <Drawer open={openConnections} onClose={() => setOpenConnections(false)} anchor='right' className={classes.Drawer} ref={React.createRef()}>
                    <Box className={classes.DrawerBox} > 
                        <IconButton className={classes.ExitIcons} onClick={() => setOpenConnections(false)}><CloseIcon/></IconButton>
                        {CS ? <JoinForm/> : <SignInForm/>}
                        <Box className={classes.ToggleBox}>
                            Sign In
                            <Switch size='medium' checked={CS} onChange={ToggleConnections} color='primary'/>
                            Join
                        </Box>
                    </Box>
                </Drawer>

                <Drawer open={OpenAccountSetting} onClose={() => setOpenAccountSetting(false)} anchor='right' className={classes.Drawer} ref={React.createRef()}>
                    <Box className={classes.DrawerBox} > 
                        <IconButton className={classes.ExitIcons} onClick={() => setOpenAccountSetting(false)}><CloseIcon/></IconButton>
                        <AccountSetting />
                        <Box className={classes.LogOutBox}>
                            <Button variant='contained' color='primary' fullWidth className={classes.HeaderButton} onClick={LogOut}>Log Out</Button>
                        </Box>
                    </Box>
                </Drawer>

                

                <AppBar color='primary' variant='elevation' className={classes.AppBar}>
                    <Toolbar className={classes.Toolbar}>
                        <Typography variant='h1' className={classes.Title}>WorkClock</Typography>
                        {
                            userData === null ? 
                        (<Box className={classes.Box}>
                            <Button variant='contained' color='secondary' className={classes.HeaderButton} onClick={() => {setOpenConnections(true);setCS(true);}}>Join</Button>
                            <Button variant='outlined' color='secondary' className={classes.HeaderButton} onClick={() => {setOpenConnections(true);setCS(false);}}>Log In</Button>
                        </Box>)
                        :
                        (<Box className={classes.Box}>
                             <Button variant='outlined' color='secondary' className={classes.HeaderButton} onClick={() => (setOpenAccountSetting(true))}>Account</Button>
                        </Box>)
                        }
                    </Toolbar>
                </AppBar>

                {userData === null ? <HomePage/> : <Overview/>}
                
            </UserDataContext.Provider>
        </React.Fragment>
    )
}

function AccountSetting(){
    const classes = style();
    const context = useContext(UserDataContext);
    const [Mode, setMode] = useState('ReadOnly');
    return(
        <Box className={classes.AccountBox}>
            <Typography variant='body1'>hello {context.Firstname + ' ' + context.Lastname}</Typography>
        </Box>
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
    },

    LogOutBox : {
        position : 'absolute',
        bottom : '5px',
        width : '90%',
    }, 
    AccountBox : {
        width : '90%',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'column'
    }

}));
