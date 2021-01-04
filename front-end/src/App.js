
import React from 'react'
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors';
import Dashbord from './Components/Dashbord';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Dashbord/>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

const theme = createMuiTheme({
  palette : {
    primary : { main : purple[500]},
    secondary : { main : '#ffffff'},
  },

  typography : {
    h1 : {
      fontSize : '42pt',
      fontWeight : 'bold',
      '@media (max-width:600px)' : {
        fontSize: '22pt',
      }
    },
    h3 : {
      fontSize : '24pt',
      fontWeight : 'bolder',
    }
  },

  overrides : {
    MuiButton : {
      root : {
        '@media (max-width:600px)' : {
          fontSize : '8pt'
        }
      }
    }
  }
});