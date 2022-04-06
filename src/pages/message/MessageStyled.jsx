import styled from "styled-components";

const WrapperMessageStyled = styled.div`
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  .active {
    background: var(--color-gray-light);
  }
  .message {
    background: var(--bg-layout);
    &-list {
      background: var(--bg-box);
      height: calc(100vh - 56px);
      overflow-y: auto;
      border-right: var(--border);
      &__title {
        padding: 15px 35px 5px 25px;
        p {
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
    &-center {
      height: calc(100vh - 56px);
      &__alert {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 25px;
          font-weight: bolder;
          color: var(--color-gray-shade);
        }
      }
      &__header {
        height: 70px;
        padding-left: 15px;
        background: var(--bg-box);
        display: flex;
        align-items: center;
        box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.04);
        &-info {
          margin-left: 15px;
          p {
            color: var(--color-navy);
            font-weight: bolder;
            font-size: 0.9375rem;
            letter-spacing: 0.5px;
          }
          small {
            color: var(--color-gray-shade);
            font-size: 12px;
          }
        }
      }
      &__body {
        height: calc(100vh - 196px);
        padding: 0px 15px 15px 15px;
        overflow-y: auto;
      }
      &__footer {
        height: 70px;
        background: var(--bg-box);
        border-top: var(--border);
        padding: 15px;
      }
    }
    &-rightbar {
      height: calc(100vh - 56px);
      background: var(--bg-box);
      border-left: var(--border);
      &__title {
        padding: 15px 35px 5px 25px;
        p {
          font-size: 20px;
          font-weight: bolder;
        }
      }
      &__media {
        padding: 15px 35px 5px 35px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        position: relative;
        &--cover {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: var(--border-radius-lg);
        }
        &--profile {
          width: 100px;
          height: 100px;
          position: absolute;
          bottom: -45px;
          border: 4px solid var(--bg-box);
        }
      }
      &__info {
        text-align: center;
        margin-top: 50px;
        p {
          font-size: 18px;
          font-weight: bolder;
          color: var(--color-navy);
        }
        small {
          color: var(--color-gray-shade);
          font-weight: 500;
        }
      }
      &__about {
        display: flex;
        flex-direction: column;
        padding: 15px 35px 5px 35px;
        &--box {
          display: flex;
          justify-content: left;
          border: var(--border);
          margin-top: 10px;
          border-radius: var(--border-radius);
          align-items: center;
          padding: 10px;
          &-desc {
            margin-left: 15px;
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
        }
      }
    }
  }
`;

export { WrapperMessageStyled };
