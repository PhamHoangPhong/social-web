import { Box } from "@mui/material";
import styled from "styled-components";

const ModalStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  boxshadow: 24; 
  .container {
    max-height: 530px;
    overflow-y: auto;
  }
  p: 4;
  .modal-text {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    border: none;
    &:focus {
      border: none;
      outline:none;
    }
    &:active {
      border: none;
      outline:none;
    }
  }
  .modal-btn {
    margin-top: 20px;
    border-radius: var(--border-radius-lg);
    background: var(--color-info);
  }
`;

const ModalShareStyled = styled.div`
  background: var(--bg-layout);
  border-radius: var(--border-radius);
  padding: 20px 20px 0px 20px;
  .modal-body {
    padding: 0px 30px 25px 30px;
  }
  .modal-bottom {
    display: flex;
    justify-content: right;
  }
  .modal-share-text {
    background: var(--bg-layout);
    padding: 10px 20px 10px 20px;
  }
`

export { ModalStyled, ModalShareStyled };
