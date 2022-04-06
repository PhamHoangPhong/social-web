import styled from "styled-components";

const MessageTextStyled = styled.div`
  .textbox {
    display: flex;
    align-items: end;
    margin-top: 30px;
    &-content {
      margin: 0px 10px;
      background: var(--color-primary-shade);
      padding: 14px 18px;
      position: relative;
      border-radius: 10px 10px 10px 0;
      small {
        font-size: 13px;
        color: var(--color-gray);
        font-weight: 500;
      }
      p {
        font-size: 15px;
        font-weight: 500;
        color: var(--bg-layout);
      }
    }
    &-time {
      font-size: 10px;
      font-weight: 500;
      color: var(--color-gray-shade);
    }
  }
  .owner {
    justify-content: right;
    flex-direction: row-reverse;
    &-box {
      border-radius: 10px 10px 0px 10px;
    }
  }
`;

const MessageFormStyled = styled.div`
   
  .message-form {
    with: 100%;
    display: flex;
    align-items: center;
    input {
      padding: 10px 20px;
      width: 100%;
      border-radius: var(--border-radius-xl);
      font-size: 13px;
      font-family: var(--monsterrat-font);
      font-weight: 500;
      border: none;
      height: 40px;
      background: var(--color-gray-light);
      transition: 0.3s;
      &:focus {
        outline: none;
        box-shadow: 0px 0px 2px var(--color-primary);
        background-color: var(--bg-box);
      }
    }
    &__btn {
      margin-left: 15px;
      background: var(--color-primary-light);
      border-radius: var(--border-radius-lg);
      padding: 10px;
    }
  }
`;

export { MessageFormStyled, MessageTextStyled };
