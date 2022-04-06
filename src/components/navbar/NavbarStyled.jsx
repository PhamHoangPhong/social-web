import styled from "styled-components";
import { Box } from "@mui/material";

const WrapperNavbarStyled = styled(Box)`
  .navbar__left {
    display: flex;
    align-items: center;

    &-search {
      position: relative;
      display: flex;
      height: 38px;
      width: 420px;
      input {
        flex: 1;
        widht: 100%;
        height: 100%;
        padding: 5px 35px;
        background: var(--bg-layout);
        border: none;
        border-radius: var(--border-radius-xl);
        &:focus {
          outline: none;
          box-shadow: 0px 0px 2px var(--color-primary);
          background-color: var(--bg-box);
        }
      }
      &--result {
        position: absolute;
        top: 50px;
        background: var(--bg-box);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius-xl);
        width: 100%;
        padding: 0px 15px;
        max-height: 280px;
        overflow-y: auto;
        transition: .3s;
      }
      &--item {
        display: flex;
        align-items: center;
        margin: 15px 0px;
        p {
          font-size: 14px;
          font-weight: bolder;
          color: var(--color-navy);
        }
        small {
          font-size: 12px;
          font-weight: 500;
          color: var(--color-gray-shade);
        }
      }
    }
  }
  .navbar__input {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar__center {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
    
    &-icon {
      color: var(--color-navy);
      margin-left: 10px;
      width: 38px;
      height: 38px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background: var(--color-primary-light);
        color: var(--bg-layout);
      }
    }
  }
  .active {
    background: var(--color-primary-light);
    color: var(--bg-layout);
    box-shadow: var(--box-shadow);
  }
  .navbar__right {
    text-align: right;
    &-icon {
      padding: 13px;
      background: var(--bg-shade);
      margin-right: 10px;
      color: var(--color-navy);
      &:hover {
        background: var(--bg-shade-hover);
      }
    }
  }
`;
export {WrapperNavbarStyled}