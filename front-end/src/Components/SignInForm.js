import { Box, Button, ButtonGroup, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core'
import React , {useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';


export default function SignInForm() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ShowPrompt, setShowPrompt] = useState(false);
    const [AlertMes,setAlertMes] = useState(<MuiAlert elevation={4} severity='info'>hey there</MuiAlert>)
    const classes = Style();

    const VerifyAndSend = () =>{
        if(Email !== null && Email !== '' && Password !== null && Password !== ''){
            if(true){
                lunchPrompt('Great','success');
                console.log({
                    Email : Email.toLowerCase(),
                    Password : Password.toLowerCase(),
                });
            }
            else{
                lunchPrompt('No any account connect to this email address, try to Join','warning');
            }
        }
        else{
            lunchPrompt('Some of the the data is not correct','warning');
        }
    }

    const lunchPrompt = (mes,ser) =>{
        setAlertMes(<MuiAlert elevation={4} severity={ser}>{mes}</MuiAlert>);
        setShowPrompt(true);
    }

    return (
        <Box className={classes.root}>
            <Snackbar open={ShowPrompt} onClose={e=> setShowPrompt(false)} anchorOrigin={{vertical : 'top', horizontal : 'center'}} autoHideDuration={4000}>
                {AlertMes}
            </Snackbar>
            <Typography variant='h3'>Sign In</Typography>
            <TextField label="Email address" variant='outlined' color='primary' fullWidth className={classes.FiledComponent}
            error={Email == null ? true : false}
            placeholder='exemple@exmp.com'
            inputProps = {{pattern : '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$'}}
            onChange = {e => setEmail(e.target.validity.valid ? e.target.value : null)}
            />
            <TextField label="Password" type='password' variant='outlined' color='primary' fullWidth className={classes.FiledComponent}
            error={Password == null ? true : false}
            inputProps = {{pattern : '(?=.*[a-z])(?=.*[A-Z]).{8,}'}}
            onChange = {e => setPassword(e.target.validity.valid ? e.target.value : null)}
            />
            <Button color='primary' variant='contained' fullWidth onClick={VerifyAndSend}>Join Now</Button>
        </Box>
    )
}

const Style = makeStyles(theme => ({
    root : {
        width : '80%',
        justifyContent: 'cneter',
    },
    FiledComponent : {
        margin : '5px auto',
    }
}));
