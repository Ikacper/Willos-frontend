import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import { AboutPage, LoginPage, RegisterPage, HomePage, SearchPage, ErrorPage } from './pages'

import PageTemplate from './components/PageTemplate'
import { ROUTES } from './Routes'

function App() {
  return (
    <Router>
      <Switch>
          <Route path={ROUTES.LOGIN} component={LoginPage}/>
          <Route path={ROUTES.REGISTER} component={RegisterPage}/>
          <PageTemplate>
              <Switch>
                  <Route exact path={ROUTES.HOME} component={HomePage} />
                  <Route path={ROUTES.ABOUT} component={AboutPage}/>
                  <Route path={ROUTES.SEARCH} component={SearchPage}/>
                  <Route component={ErrorPage}/> 
              </Switch>
          </PageTemplate>
          
      </Switch>
    </Router>
  );
}

export default App;
