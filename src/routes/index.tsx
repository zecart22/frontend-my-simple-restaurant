import { Route, Switch } from "react-router";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Singup";
import { Dashboard } from "../pages/Dashboard";
import { CreateCategory } from "../pages/CreateCategory";
import { OpenOrder } from "../pages/OpenOrder";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/createcategory" component={CreateCategory} />
      <Route exact path="/openorder" component={OpenOrder} />
    </Switch>
  );
};
