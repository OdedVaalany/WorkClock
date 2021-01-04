import { Container, makeStyles, Typography } from '@material-ui/core'
import Vector from '../Sources/undraw_success_factors_fay0.svg';
import React from 'react'

export default function HomePage() {
    const classes = useStyle();
    return (
        <Container fixed className={classes.Container}>
            <Typography variant='h3' className={classes.Title}>Hey there</Typography>
            <Typography variant='body1' className={classes.Q}>Want to calculate your monthly salary?</Typography>
            <Typography variant='body1' className={classes.A}>Try our prudact! It will help you to know better your income</Typography>
            <img src={Vector} className={classes.Img}/>
        </Container>
    )
}

const useStyle = makeStyles((theme => ({
    Container : {
        marginTop : '65px',
        border: 'red solid 1px',
        height: (window.innerHeight - 100) + 'px',
        padding : '5px 5px 5px 5px',
        display: 'grid',
        gridTemplateColumns : 'repeat(12,1fr)',
        gridTemplateRows: 'repeat(10,1fr)',
    },
    Img : {
        gridColumn: '4/12',
        gridRow: '3/10',
        height: (window.innerHeight - 250) + 'px',
        justifySelf : 'right',
    },
    Title : {
        gridColumn: '1/3',
        gridRow: '1/2',
    },
    Q : {
        gridColumn: '1/6',
        gridRow: '2/3',
    },
    A : {
        gridColumn: '1/6',
        gridRow: '3/4',
    }
})));
