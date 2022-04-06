import styled from "styled-components";

const WrapperAuthStyled = styled.div`
  height: 100vh;
  
  .auth {
    height: 100vh;
    
    &-right {
      height: 100%;
      border: none;
      padding: 30px 20px;
      background: #e8f1fa;
      position: relative;

      &__logo {
        display: flex;
    
        p {
          font-weight: bold;
          font-size: 34px;
          font-family: var(--fredoka-font);
          line-height: 83px;
          letter-spacing: 2px;
        }
      }
      &__bgr {
        position: absolute;
        bottom: 70px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
      }
    }

    &-left {
      height: 100%;
      display: flex;

      &__header {
        font-weight: bold;
        line-height: 45px;
      }

      &__footer {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-top: 1.2rem;
        &-btn {
          margin-bottom: 0.5rem;
          height: 56px;
        }
      }

      p {
        font-weight: 500 !important;
        color: var(--color-gray-shade);
        font-size: 14px;
        margin-bottom: 1rem;
      }

      img {
        position: absolute;
        left: 10px;
        bottom: 8px;
      }

      &__form {
        display: flex;
        flex-direction: column;
        margin-top: 0.5rem;
        margin-bottom: 0.9rem;
        &-input {
          margin-bottom: 1.2rem;
          position: relative;
        }
        &-icon {
          color: var(--color-gray-shade);
        }
        &-btn {
          height: 56px;
          background-color: var(--color-navy);
        }
        &-btn:hover {
          background-color: var(--color-black);
        }
      }
    }
  }
`;

export { WrapperAuthStyled };
