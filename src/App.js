import './Styles/App.css';
import { Router, Route, Switch } from 'react-router-dom'
import { CountryContextProvider } from './Contexts/CountryContext'
import React, { Suspense } from 'react'
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup';
import NotFound from './pages/NotFound'
import MyCountryModal from './components/MyCountryModal';
import NetlifyIdentityContext from 'react-netlify-identity-gotrue'
import { Box } from '@mui/material'
import Spinner from './components/Spinner';
import NavMenu from './components/nav/NavMenu';

const CountryCards = React.lazy(() => import('./components/CountryCards'))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}


const App = () => {

  return (
    <div id="main-div" className='App'>
      {/* <NetlifyIdentityContext url='https://ammonroberts-dgm3790project4.netlify.app/'> */}
      <NetlifyIdentityContext url='http://localhost:8888/'>
        <CountryContextProvider>
          <NavMenu />
          <Suspense
            fallback={
              <Box sx={style}>
                <Spinner />
              </Box>
            }
          >
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/countries">
                <CountryCards />
              </Route>
              <Route path="/countries/:countryId" exact>
                <MyCountryModal />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </CountryContextProvider>
      </NetlifyIdentityContext>
    </div>
  );
}

export default App;
