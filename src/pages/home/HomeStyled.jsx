import styled from "styled-components";
const WrapperHomeStyled = styled.div`
  background: var(--bg-layout);
  min-height: 100vh;
  margin-top: 56px;
  position: relative;
  .rightbar {
    background: var(--bg-box);
    height: 100vh;
    overflow-y: auto;
    position: fixed;
    width: 380px;
    box-shadow: var(--box-shadow);

    &__title {
      padding: 20px 27px 10px 27px;

      p {
        color: var(--color-gray-shade);
        font-weight: bold;
        font-size: 15px;
      }
    }
    &__friend {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 27px;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background: var(--bg-shade-hover);
      }

      &-ml {
        margin-left: 17px;
      }

      &-info {
        display: flex;
        align-items: center;

        p {
          color: var(--color-black);
          font-weight: bolder;
          font-size: 0.9375rem;
          letter-spacing: 0.5px;
        }
        small {
          color: var(--color-gray-shade);
          font-size: 12px;
        }
      }
      &-offline {
        color: var(--color-gray-shade);
        font-size: 12px;
      }
      &-online {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--color-success);
      }
    }
  }
  .midbar {
    .load-more {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
  .leftbar {
    background: var(--bg-box);
    height: 100vh;
    overflow-y: auto;
    position: fixed;
    width: 356px;
    right: 0;
    box-shadow: var(--box-shadow);
    padding-bottom: 20px;
    ::-webkit-scrollbar {
      width: 0px;
    }

    &__title {
      margin-top: 20px;
      display: flex;
      align-items: center;
      p {
        color: var(--color-gray-shade);
        font-weight: bold;
        font-size: 15px;
      }
    }

    &__header {
      position: relative;
      margin-top: 15px;
      p {
        position: absolute;
        font-size: 35px;
        font-weight: bolder;
        color: var(--bg-box);
        font-family: var(--fredoka-font);
        left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
      }
      &-img {
        border-radius: var(--border-radius-lg);
        border: 3px solid var(--bg-box);
        width: 100%;
        height: 200px;
      }
    }

    &__user {
      position: relative;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      &-info {
        position: absolute;
        display: flex;
        align-items: center; 
        bottom: 9px;
        left: 10px;
        width: 100%;
        text-shadow: 3px 3px 20px var(--color-navy),
        -2px 1px 30px var(--color-navy);
        p {
          font-size: 13px;
          color: var(--bg-box);
          font-weight: 500;
          margin-left: 3px;
        }
      }
      &-img {
        border-radius: var(--border-radius-lg);
        border: 4px solid var(--bg-box);
        box-shadow: var(--box-shadow);
        object-fit: cover;
      }
    }
    &__follow {
      display: flex;
      align-items: center;
      margin-top: 13px;
      margin-left: 10px;
      margin-bottom: 13px;
      p {
          font-size: 13px;
          color: var(--color-gray-shade);
          font-weight: 500;
          margin-left: 5px;
      }
    }
  }
`;

export {WrapperHomeStyled}