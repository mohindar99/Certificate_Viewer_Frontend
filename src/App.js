import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import RouteData from "./Routes/RouteData";
import PrivateRoute from "./Routes/PrivateRoute";
import store from "./Redux/Store";
import UserRoute from "./Routes/UserRoute";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {RouteData.map((route, index) => {
            if (route.type === "Admin") {
              if (route.auth) {
                return (
                  <PrivateRoute
                    exact
                    path={route.path}
                    component={route.component}
                    key={index}
                  />
                )
                
              } else {
                return (
                  <Route
                    exact
                    path={route.path}
                    component={route.component}
                    key={index}
                  />
                );
              }
            } else {
              if (route.auth) {
                return (
                  <UserRoute
                    exact
                    path={route.path}
                    component={route.component}
                    key={index}
                  />
                );
              } else {
                return (
                  <Route
                    exact
                    path={route.path}
                    component={route.component}
                    key={index}
                  />
                );
              }
            }
          })}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
