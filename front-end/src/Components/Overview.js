import { Button, Card, CardContent, CardHeader, Container, makeStyles, Paper,Box,Typography, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField } from '@material-ui/core';
import React, {useContext, useState} from 'react'
import { Skeleton } from '@material-ui/lab';
import { UserDataContext } from './Dashbord';

export default function Overview() {
    const context = useContext(UserDataContext);
    const classes = useStyle();
    return (
        <Container fixed className={classes.Container}>
            <Card variant='outlined'>
                <CardHeader title='Overview statistic'/>
                <CardContent style={{display:'flex', justifyContent:'space-evenly'}}>
                    <Paper variant='outlined' className={classes.Paper}>
                        Monthly payment
                        {context.Reports.map(item => (<Paper>{item.perHour}</Paper>)) }
                    </Paper>
                </CardContent>
            </Card>
            <ReportForm/>
            <ReportedHours/>
        </Container>
    )
}

export function ReportedHours() {
    const rows = (useContext(UserDataContext)).Reports;
    const [TabNumber, setTabNumber] = useState(0);
    var i = 1;

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
                break;
        }
    }

    const tab_panel = (index) =>{
        var year = (new Date(Date.now())).getMonth() - index < 0 ? (new Date(Date.now())).getFullYear() -1 : (new Date(Date.now())).getFullYear();
        var month = (new Date(Date.now())).getMonth() - index < 0 ? (new Date(Date.now())).getMonth() - index + 12 : (new Date(Date.now())).getMonth() - index;
        return(
            <TabPanel value={TabNumber} index={index}>
                <Table>
                                    <TableHead>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Start</TableCell>
                                        <TableCell>End</TableCell>
                                        <TableCell>Total Time</TableCell>
                                        <TableCell>Per hour</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(item => 
                                            (month === (new Date(item.date)).getMonth() && year === (new Date(item.date)).getFullYear() ? (<TableRow>
                                                <TableCell>{i}</TableCell>
                                                <TableCell>{(new Date(item.date)).toLocaleDateString()}</TableCell>
                                                <TableCell>{item.start}</TableCell>
                                                <TableCell>{item.end}</TableCell>
                                                <TableCell>{item.end - item.start}</TableCell>
                                                <TableCell>{item.perHour}</TableCell>
                                            </TableRow>): null)
                                        )}
                                    </TableBody>
                                </Table>
            </TabPanel>
        )
    }

    return (
        <Card variant='outlined'>
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

export function ReportForm() {
    const user = (useContext(UserDataContext));
    const [date, setDate] = useState(null);
    const [Start, setStart] = useState(null);
    const [End, setEnd] = useState(null);
    const [perHour, setPerHour] = useState(user.perHour || null);

    const push = () => {
        console.log({
            date : date,
            start : ((new Date(date)).setTime(parseInt(Start.split(':')[0]) * parseInt(Start.split(':')[1]) * 60 * 1000)),
            end : ((new Date(date)).setTime(parseInt(End.split(':')[0]) * parseInt(End.split(':')[1]) * 60 * 1000)),
            perhour : perHour,
        });
    }
    return (
        <Card variant='outlined'>
                <CardHeader title='Manual Reporting'/>
                <CardContent>
                    <TextField type='date' label='Date' variant='outlined'
                    InputLabelProps={{shrink : true}}
                    onChange={(e) => setDate(e.target.value)}
                    />
                    <TextField type='time' label='Start' variant='outlined'
                    InputLabelProps={{shrink : true}}
                    onChange={(e) => setStart(e.target.value)}
                    />
                    <TextField type='time' label='End' variant='outlined'
                    InputLabelProps={{shrink : true}}
                    onChange={(e) => setEnd(e.target.value)}
                    />
                    <TextField type='number' label='Per Hour' variant='outlined'
                    InputLabelProps={{shrink : true}}
                    value={perHour || 0}
                    onChange={(e) => setPerHour(e.target.value)}
                    />
                    <Button variant='contained' color='primary' onClick={push} >Report</Button>
                </CardContent>
        </Card>
    )
}


const useStyle = makeStyles((theme => ({
    Container : {
        marginTop : '65px',
        border: 'red solid 1px',
        padding : '5px 5px 5px 5px',
    },
    Paper : {
        height: '200px',
        width : '200px',
        padding : '5px',
    }
})));
