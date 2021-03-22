import React, { useContext, FC } from "react";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import { OnlineOrange } from "utility/style";
import { StateContext } from "state/state";
import { calculateCartTotal } from "types/inventory";
import Button from "atoms/Button";
import { setModalState } from "state/actions";
import Modal from "components/Shop/Modal";
import { modalTypes } from "types/modal";

const BasketWindow: FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const { olCart, cart, user, inventory, olCoinsUser } = state;

  const totalPrice = calculateCartTotal(cart, inventory);
  const olCoinsPrice = calculateCartTotal(olCart, inventory);

  const insufficient = user!.balance - totalPrice < 0 ? true : false;
  const olCoinsInsufficient =
    olCoinsUser!.balance - olCoinsPrice < 0 ? true : false;

  const purchase = () => {
    if (
      insufficient ||
      olCoinsInsufficient ||
      (totalPrice <= 0 && olCoinsPrice <= 0)
    )
      return undefined;
    return dispatch(setModalState(modalTypes.PURCHASE));
  };

  const basketItems = Object.keys(cart).map((key: string) => (
    <BasketItem
      key={key}
      id={Number(key)}
      quantity={cart[Number(key)].quantity}
      ol={false}
    />
  ));

  const olCoinsItems = Object.keys(olCart).map((key: string) => (
    <BasketItem
      key={key}
      id={Number(key)}
      quantity={olCart[Number(key)].quantity}
      ol={true}
    />
  ));

  return (
    <Container>
      <h2> Handlekurven din</h2>
      <ItemDiv>
        {basketItems} {olCoinsItems}
      </ItemDiv>

      <CostDiv>
        <span>
          <b> Sum :</b>
        </span>
        <span id="pris">
          <b> {totalPrice}kr</b>
        </span>
        <span>
          <b> Ølcoins :</b>
        </span>
        <span id="pris">
          <b> {olCoinsPrice}øc</b>
        </span>
      </CostDiv>
      <Button onClick={purchase}>
        {insufficient || olCoinsInsufficient
          ? "Utilstrekkelig med penger"
          : "Kjøp"}
      </Button>

      <Modal />
    </Container>
  );
};

export default BasketWindow;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 8fr 1fr 1fr;

  text-align: left;
  background-color: white;
  width: 85%;
  height: 70%;
  border-top: 10px solid ${OnlineOrange};
  border-radius: 3px;
  box-shadow: 2px 2px 7px #888888;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const ItemDiv = styled.div`
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${OnlineOrange};
    border-radius: 2px;
  }

  overflow: auto;
`;

const CostDiv = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr 1fr;

  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 90%;
  text-align: left;
  padding: 5px;
  font-size: 16px;
  border-bottom: 1px dashed gray;
  border-top: 1px dashed gray;
  #olcoins {
    grid-column: 2;
    grid-row: 2;
  }
`;
