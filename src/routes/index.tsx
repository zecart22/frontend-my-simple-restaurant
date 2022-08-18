import { Route, Switch } from "react-router";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Singup";
import { Dashboard } from "../pages/Dashboard";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
};
