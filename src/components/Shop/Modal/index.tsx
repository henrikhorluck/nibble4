import React, { useContext, FC } from "react";
import styled from "styled-components";
import { StateContext } from "state/state";
import { BiArrowBack } from "react-icons/bi";
import { IconContext } from "react-icons";
import { setModalState } from "state/actions";
import ReactDOM from "react-dom";
import { modalTypes } from "types/modal";
import PurchaseModal from "./PurchaseModal";
import CompleteModal from "./CompleteModal";
import ErrorModal from "./ErrorModal";
import InactiveModal from "./InactiveModal";

const Modal: FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const { modalState } = state;

  const HideModal = () => dispatch(setModalState(modalTypes.DISABLED));

  return ReactDOM.createPortal(
    <Container style={{ zIndex: modalState != modalTypes.DISABLED ? 1 : -1 }}>
      <div onClick={HideModal}>
        <IconContext.Provider value={{ color: "orange", size: "50px" }}>
          <BiArrowBack />
        </IconContext.Provider>
      </div>

      {modalState == modalTypes.PURCHASE ? <PurchaseModal /> : null}
      {modalState == modalTypes.COMPLETE ? <CompleteModal /> : null}
      {modalState == modalTypes.ERROR ? <ErrorModal /> : null}
      {modalState == modalTypes.INACTIVE ? <InactiveModal /> : null}
    </Container>,
    document.getElementById("root")!
  );
};

export default Modal;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;

  width: 400px;
  height: 400px;

  margin: auto;
  margin-top: 10%;
  border-radius: 25px;
  background: white;
  box-shadow: 2px 2px 7px #888888;
`;
