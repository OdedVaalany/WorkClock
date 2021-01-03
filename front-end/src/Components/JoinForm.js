import { Box, Button, ButtonGroup, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core'
import React , {useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';


export default function JoinForm() {
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Gender, setGender] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [ShowPrompt, setShowPrompt] = useState(false);
    const [AlertMes,setAlertMes] = useState(<MuiAlert elevation={4} severity='info'>hey there</MuiAlert>)
    const classes = Style();

    const VerifyAndSend = () =>{
        if(Firstname !== null && Firstname !== '' && Lastname !== null && Lastname !== '' && Email !== null && Email !== '' && Password !== null && Password !== '' && Gender !== null && Gender !== '' && Phonenumber !== null && Phonenumber !== '' && Birthday !== null && Birthday !== '' ){
            if(true){
                lunchPrompt('Great','success');
                console.log({
                    Firstname : (Firstname.slice(0,1)).toUpperCase() + (Firstname.slice(1,Firstname.length)).toLowerCase(),
                    Lastname : (Lastname.slice(0,1)).toUpperCase() + (Lastname.slice(1,Lastname.length)).toLowerCase(),
                    Email : Email.toLowerCase(),
                    Password : Password.toLowerCase(),
                    Gender : Gender,
                    Phonenumber : Phonenumber,
                    Birthday : Birthday
                });
            }
            else{
                lunchPrompt('This email address already have account, try to sign in','warning');
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
            <Typography variant='h3'>Join Us</Typography>
            <TextField label="First name" variant='outlined' color='primary' fullWidth className={classes.FiledComponent}
            error={Firstname == null ? true : false}
            inputProps = {{pattern : '[A-Za-z]{1,}'}}
            onChange = {e => setFirstname(e.target.validity.valid ? e.target.value : null)}
            />
            <TextField label="Last name" variant='outlined' color='primary' fullWidth className={classes.FiledComponent}
            error={Lastname == null ? true : false}
            inputProps = {{pattern : '[A-Za-z]{1,}'}}
            onChange = {e => setLastname(e.target.validity.valid ? e.target.value : null)}
            />
            <ButtonGroup color='primary' fullWidth className={classes.FiledComponent}>
                <Button variant={Gender === 'male' ? 'contained' : 'outlined' } onClick={e => setGender("male")}>Male</Button>
                <Button variant={Gender === 'female' ? 'contained' : 'outlined' } onClick={e => setGender("female")}>Female</Button>
                <Button variant={Gender === 'other' ? 'contained' : 'outlined' } onClick={e => setGender("other")}>Other</Button>
            </ButtonGroup>
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
            <TextField label="Phone number" variant='outlined' color='primary' fullWidth className={classes.FiledComponent}
            error={Phonenumber == null ? true : false}
            inputProps = {{pattern : '[0-9]{10}'}}
            onChange = {e => setPhonenumber(e.target.validity.valid ? e.target.value : null)}
            />
            <TextField label="Birthday" type='date' variant='outlined' color='primary' fullWidth className={classes.FiledComponent}
            error={Birthday == null ? true : false}
            InputLabelProps={{shrink : true}}
            onChange = {e => setBirthday(e.target.value)}
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
