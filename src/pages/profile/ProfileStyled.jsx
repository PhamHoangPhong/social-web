import styled from "styled-components";
const WrapperProfileStyled = styled.div`
  background: var(--bg-layout);
  min-height: 100vh;
  margin-top: 56px;
  .active {
    border-bottom: 2px solid var(--color-navy);
    color: var(--color-black);
  }
  .profile {
    &__header {
      width: 100%;
      display: flex;
      flex-direction: column;
      background: var(--bg-box);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--box-shadow);
      padding: 15px 15px 0px 15px;
      margin-top: 15px;
      &-img {
        width: 100%;
        border-radius: var(--border-radius-lg);
        object-fit: fill;
      }
      &-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 5px 25px 180px;
        position: relative;
        &--left {
          display: flex;
          align-items: center;
          p {
            font-size: 20px;
            font-weight: bolder;
            color: var(--color-navy);
          }
          small {
            font-size: 13px;
            font-weight: 500;
            color: var(--color-gray-shade);
          }
        }
        &--img {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          top: -60px;
          left: 15px;
          label {
            position: absolute;
            right: 15px;
            bottom: 10px;
            zindex: 10;
          }
        }
        &--button {
          margin-right: 10px;
          text-transform: none;
          font-family: var(--monsterrat-font);
        }
      }
      &-link {
        display: flex;
        align-items: center;
        margin-top: 5px;
        &--button {
          text-transform: none;
          font-weight: bolder;
          color: var(--color-gray-shade);
          margin-left: 20px;
          border-radius: 0px;
          padding: 10px 0px;
          font-family: var(--monsterrat-font);
          &:hover {
            background: var(--bg-box);
          }
        }
      }
    }
  }
  .load-more {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
`;
export { WrapperProfileStyled };
