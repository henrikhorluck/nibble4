import LoginPage from "pages/LoginPage";
import StorePage from "pages/StorePage";
import React, { useContext, useEffect, FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { INVENTORY_URI } from "./api/";
import { StateContext } from "./state/state";
import { setInventory } from "./state/actions";
import { fetchInventory } from "./api/";
import { useIdleTimer } from "react-idle-timer";
import { modalTypes } from "types/modal";
import { setModalState } from "state/actions";

const App: FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  useEffect(() => {
    const getData = async () => {
      const data = await fetchInventory(INVENTORY_URI);

      if (!state.inventory.length) {
        dispatch(setInventory(data));
      }
      if (user && JSON.stringify(data) !== JSON.stringify(state.inventory)) {
        dispatch(setInventory(data));
      }
    };
    getData();
  }, [dispatch, user]);

  const handleOnIdle = () => {
    if (user) {
      dispatch(setModalState(modalTypes.INACTIVE));
    }
  };

  const {} = useIdleTimer({
    timeout: 1000 * 50,
    onIdle: handleOnIdle,
  });

  return (
    <Router>
      <Switch>
        <Route path="/shop/" component={StorePage} />
        <Route path="/" component={LoginPage} />
        <Route component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
