import { Switch } from "react-router";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Singup";
import { Dashboard } from "../pages/Dashboard";
import { CreateCategory } from "../pages/CreateCategory";
import { OpenOrder } from "../pages/OpenOrder";
import { CreateProduct } from "../pages/CreateProduct";
import { ListCategory } from "../pages/ListCategories";
import { ListOrders } from "../pages/ListOrders";
import { ListProducts } from "../pages/ListProducts";
import { EditProduct } from "../pages/EditProducts";

import { Route } from "./Route";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route
        exact
        path="/createcategory"
        component={CreateCategory}
        isPrivate
      />
      <Route exact path="/openorder" component={OpenOrder} isPrivate />
      <Route exact path="/createproduct" component={CreateProduct} isPrivate />
      <Route exact path="/listcategory" component={ListCategory} isPrivate />
      <Route exact path="/listorders" component={ListOrders} isPrivate />
      <Route exact path="/listproducts" component={ListProducts} isPrivate />
      <Route exact path="/editproduct/:id" component={EditProduct} isPrivate />
    </Switch>
  );
};
