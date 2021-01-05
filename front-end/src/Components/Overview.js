import { Button, Card, CardContent, CardHeader, Container, makeStyles, Paper,Box,Typography, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Grid } from '@material-ui/core';
import React, {useContext, useState} from 'react'
import { Skeleton } from '@material-ui/lab';
import { UserDataContext } from './Dashbord';

export default function Overview() {
    const classes = useStyle();
    return (
        <Grid container className={classes.Container}>
            <Grid item md={3} xs={12}>
                <Statistic/>
                <ReportForm/>
            </Grid>
            <Grid item md={9} xs={12}>
                <ReportedHours/>
            </Grid>
        </Grid>
    )
}

export function Statistic(){
    const classes = useStyle();
    const context = useContext(UserDataContext);

    const getTotalShifts = () => {
        return context.Reports.length;
    }
    const getTotalWorkHours = () => {
        var sum = 0;
        context.Reports.map(e =>{
            let start = parseInt(e.start.split(':')[0]) * 60 + parseInt(e.start.split(':')[1]);
            let end = parseInt(e.end.split(':')[0]) * 60 + parseInt(e.end.split(':')[1]);
            sum+= end < start ? end+(24*60 -start) : end-start;
        })
        sum = sum/60;
        sum = sum * 100;
        sum = Math.floor(sum)
        sum = sum/100
        return sum;
    }

    return(
        <Card variant='outlined' className={classes.Card}>
            <CardHeader title='Overview statistic'/>
            <CardContent style={{display:'flex', justifyContent:'space-evenly'}}>
                <Paper variant='outlined' className={classes.Paper}>
                    <Typography variant='body'>Total reported shifts: {getTotalShifts()}</Typography>
                </Paper>
                <Paper variant='outlined' className={classes.Paper}>
                    <Typography variant='body'>Total work hours: {getTotalWorkHours()}</Typography>
                </Paper>
                <Paper variant='outlined' className={classes.Paper}>
                    <Typography variant='body'>Avrage hours per shift: {getTotalWorkHours()/getTotalShifts()}</Typography>
                </Paper>
            </CardContent>
        </Card>
    )
}

export function ReportedHours() {
    const rows = (useContext(UserDataContext)).Reports;
    const classes = useStyle();
    const [TabNumber, setTabNumber] = useState(0);

    const Month = (n) =>{
        var year = (new Date(Date.now())).getFullYear();
        if(n<0) {
            year--;
            n+=12
        }
        switch (n) {
            case 0:
                return 'January ' + year 
                break;
            case 1:
                return 'February ' + year
                break;
            case 2:
                return 'March ' + year
                break;
            case 3:
                return 'April ' + year
                break;
            case 4:
                return 'May ' + year
                break;
            case 5:
                return 'June ' + year
                break;
            case 6:
                return 'July ' + year
                break;
            case 7:
                return 'August ' + year
                break;
            case 8:
                return 'September ' + year
                break;
            case 9:
                return 'October ' + year
                break;
            case 10:
                return 'November ' + year
                break;
            case 11:
                return 'December ' + year
                break;
            default:
                return null
                break;
        }
    }

    const tab_panel = (index) =>{
        var year = (new Date(Date.now())).getMonth() - index < 0 ? (new Date(Date.now())).getFullYear() -1 : (new Date(Date.now())).getFullYear();
        var month = (new Date(Date.now())).getMonth() - index < 0 ? (new Date(Date.now())).getMonth() - index + 12 : (new Date(Date.now())).getMonth() - index;
        return(
            <TabPanel value={TabNumber} index={index}>
                <Table key={index}>
                    <TableHead>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Start</TableCell>
                                            <TableCell>End</TableCell>
                                            <TableCell>Break</TableCell>
                                            <TableCell>Total Time</TableCell>
                                            <TableCell>Per hour</TableCell>
                                            <TableCell>Total Payment</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(item => 
                                                (month === (new Date(item.date)).getMonth() && year === (new Date(item.date)).getFullYear() ? (<Row item={item} />) : null)
                                            )}
                    </TableBody>
                </Table>
            </TabPanel>
        )
    }

    return (
        <Card variant='outlined' className={classes.Card}>
                <CardHeader title='Reported Hours'/>
                <CardContent>
                    <Tabs value={TabNumber} indicatorColor='primary' variant='fullWidth'>
                        <Tab label={Month((new Date(Date.now())).getMonth())} onClick={() => {setTabNumber(0)}}/>
                        <Tab label={Month((new Date(Date.now())).getMonth()-1)} onClick={() => {setTabNumber(1)}}/>
                        <Tab label={Month((new Date(Date.now())).getMonth()-2)} onClick={() => {setTabNumber(2)}}/>
                        <Tab label={Month((new Date(Date.now())).getMonth()-3)} onClick={() => {setTabNumber(3)}}/>
                        <Tab label={Month((new Date(Date.now())).getMonth()-4)} onClick={() => {setTabNumber(4)}}/>
                        <Tab label={Month((new Date(Date.now())).getMonth()-5)} onClick={() => {setTabNumber(5)}}/>
                    </Tabs>
                    {
                        [0,1,2,3,4,5].map(index => (
                            tab_panel(index)
                        ))
                    }
                </CardContent>
        </Card>
    )
}

function Row(props){
    var color = '#d7a8df';
    const start = parseInt(props.item.start.split(':')[0]) * 60 + parseInt(props.item.start.split(':')[1]);
    const end = parseInt(props.item.end.split(':')[0]) * 60 + parseInt(props.item.end.split(':')[1]);
    var duration = end < start ? end+(24*60 -start) : end-start;
    const textDuration = (Math.floor(duration/60) < 10 ? '0' + Math.floor(duration/60) : Math.floor(duration/60)) + ":" + (duration%60 < 10 ? '0' + duration%60 : duration%60);
    var gradient = end < start ? 'linear-gradient(90deg, ' + color + ' 0%' : 'linear-gradient(90deg, #ffffff 0%'; 
    if(end < start){
        gradient += ', ' + color + ' ' + (Math.round(end/14.4)) +'%';
        gradient += ', #ffffff ' + (Math.round(end/14.4)) +'%';
        gradient += ', #ffffff ' + (Math.round(start/14.4)) +'%';
        gradient += ', ' + color +' ' + (Math.round(end/14.4)) +'%';
    }
    else{
        gradient += ', #ffffff ' + (Math.round(start/14.4)) +'%';
        gradient += ', ' + color +' ' + (Math.round(start/14.4)) +'%';
        gradient += ', ' + color + ' ' + (Math.round(end/14.4)) +'%';
        gradient += ', #ffffff ' + (Math.round(end/14.4)) +'%';
    }
    gradient+= ')';
    console.log(gradient);
    return(
        <TableRow key={Math.random()} style={{background : gradient}}>
            <TableCell>{0}</TableCell>
            <TableCell>{(new Date(props.item.date)).toLocaleDateString()}</TableCell>
            <TableCell>{props.item.start}</TableCell>
            <TableCell>{props.item.end}</TableCell>
            <TableCell>{props.item.break}</TableCell>
            <TableCell>{textDuration}</TableCell>
            <TableCell>{props.item.perHour}</TableCell>
            <TableCell>{props.item.totalPay}</TableCell>
        </TableRow>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

function ReportForm() {
    const classes = useStyle();
    const user = (useContext(UserDataContext));
    const [date, setDate] = useState(null);
    const [Start, setStart] = useState(null);
    const [End, setEnd] = useState(null);
    const [Break, setBreak] = useState(null);
    const [perHour, setPerHour] = useState(user.perHour || null);

    const push = () => {
        console.log({
            date : date,
            start : ((new Date(date)).setTime(parseInt(Start.split(':')[0]) * parseInt(Start.split(':')[1]) * 60 * 1000)),
            end : ((new Date(date)).setTime(parseInt(End.split(':')[0]) * parseInt(End.split(':')[1]) * 60 * 1000)),
            perhour : perHour,
            Break : Break,
        });
    }

    const CanPush = () =>{
        return date === null || Start === null || End === null || Break === null || perHour === null;
    }
    return (
        <Card variant='outlined' className={classes.Card}>
                <CardHeader title='Manual Reporting'/>
                <CardContent className={classes.ReportFormCard}>
                    <TextField type='date' label='Date' variant='outlined'
                    className={classes.TextField}
                    InputLabelProps={{shrink : true}}
                    onChange={(e) => setDate(e.target.value)}
                    />
                    <TextField type='time' label='Start' variant='outlined'
                    className={classes.TextField}
                    InputLabelProps={{shrink : true}}
                    onChange={(e) => setStart(e.target.value)}
                    />
                    <TextField type='time' label='End' variant='outlined'
                    className={classes.TextField}
                    InputLabelProps={{shrink : true}}
                    onChange={(e) => setEnd(e.target.value)}
                    />
                    <TextField type='number' label='Break' variant='outlined'
                    className={classes.TextField}
                    InputLabelProps={{shrink : true}}
                    onChange={(e) => setBreak(e.target.value)}
                    />
                    <TextField type='number' label='Per Hour' variant='outlined'
                    className={classes.TextField}
                    InputLabelProps={{shrink : true}}
                    value={perHour || 0}
                    onChange={(e) => setPerHour(e.target.value)}
                    />
                    <Button variant='contained' color='primary' disabled={CanPush()} onClick={push} >Report</Button>
                </CardContent>
        </Card>
    )
}


const useStyle = makeStyles((theme => ({
    Container : {
        marginTop : '65px',
        padding : '5px',
    },
    Card : {
        margin : '10px 5px',
    },
    Paper : {
        margin : '5px',
        padding : '5px',
    },
    ReportFormCard : {
        display : 'flex',
        flexDirection : 'column',
    },
    TextField : {
        margin : '5px 0px',
    }
})));
