import styled from "styled-components";

const FeedStyled = styled.div`
  .post {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--bg-box);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--box-shadow);
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 25px;
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-user {
        display: flex;
        align-items: center;
        p {
          font-size: 14px;
          font-weight: bolder;
          color: var(--color-navy);
        }
        small {
          font-size: 12px;
          font-weight: bolder;
          color: var(--color-gray-shade);
        }
      }
    }
    &__body {
      margin-top: 20px;
      p {
        font-size: 13px;
        color: var(--color-gray);
        font-weight: 500;
        line-height: 1.5rem;
      } 
      &-img {
        margin-top: 20px;
        &--item {
          position: relative;
        }
        img {
          width: 100%;
          height: auto;
          border-radius: var(--border-radius-lg);
          cursor: pointer;
          object-fit: cover;
        }
        &--none {
          display: none;
        }
        &--children {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: var(--border-radius-lg);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          p {
            font-size: 32px;
            font-weight: bolder;
            color: var(--color-gray-shade);
          }
          &:hover {
            display: none;
          }
        }
      }
    }
    &__media {
      display: flex;
      align-items: center;
      margin-top: 20px;
      &-icon {
        display: flex;
        align-items: center;
      }
    }
    &__comment {
      background: var(--bg-box);
      padding: 10px 20px 20px 20px;
      width: 500px;
      border-top-left-radius: var(--border-radius-lg);
      border-top-right-radius: var(--border-radius-lg);
      max-height: 500px;
      overflow-y: auto;
      &-content {
        display: flex;
        align-items: end;
        margin-top: 20px;
        margin-bottom: 15px;
        &--box {
          margin-left: 10px;
          background: var(--color-gray-light);
          padding: 14px 18px;
          border-radius: 10px 10px 10px 0;
          position: relative;
          
          small {
            font-size: 13px;
            color: var(--color-gray);
            font-weight: 500;
          }
          p {
            font-size: 15px;
            font-weight: bolder;
            color: var(--color-navy);
          }
        }
        &--time {
          font-size: 9px;
          font-weight: 500;
          color: var(--color-gray-shade);
          margin-left: 10px;
        }
      }
      &-form {
        padding: 20px;
        display: flex;
        align-items: end;
        background: var(--bg-box);
        border-bottom-left-radius: var(--border-radius-lg);
        border-bottom-right-radius: var(--border-radius-lg);
        &--input {
          padding: 10px 20px;
          width: 100%;
          margin-left: 10px;
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
          &:active {
            border: none;
            outline: none;
          }
        }
      }
    }
  }
  .post-share {
    background: var(--bg-box);
    margin-top: 20px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius-xl);
    padding-bottom: 20px;
    &__content {
      margin-top: 20px;
    }
    &__box {
      box-shadow: none;
      border: 3px solid var(--bg-layout-home);
    }
  }
`;

export { FeedStyled };
