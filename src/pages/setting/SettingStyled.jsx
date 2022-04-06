import styled from "styled-components";
const WrapperSettingStyled = styled.div`
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  .setting-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--bg-box);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--box-shadow);
    margin-top: 20px;
    height: fit-content;
    padding-bottom: 35px;

    &__title {
      padding: 35px 0px 35px 50px;
      margin-bottom: 25px;
      background: var(--color-primary-shade);
      border-radius: var(--border-radius-lg);
      display: flex;
      align-items: center;
      p {
        margin-left: 20px;
        font-size: 21px;
        font-weight: bolder;
        color: var(--bg-box);
      }
    }
    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      &-info {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 25px;
        position: relative;
        &--uploadbtn {
          position: absolute;
          bottom: 50px;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          z-index: 10;
        }
        p {
          font-size: 19px;
          font-weight: bolder;
          color: var(--color-navy);
          margin-top: 20px;
        }
        small {
          font-size: 15px;
          font-weight: 500;
          color: var(--color-gray-shade);
        }
      }
      &-form {
        padding-left: 35px;
        &--input {
          width: 46%;
          margin-left: 15px;
          margin-top: 20px;
        }
        &--btn {
          width: 80%;
          padding: 20px 15px;
        }
      }
    }
  }
`;

export {WrapperSettingStyled}