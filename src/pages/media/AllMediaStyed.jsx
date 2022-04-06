import styled from "styled-components";
const AllMediaStyled = styled.div`
  margin-top: 56px;
  width: 100%;
  min-height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  padding: 35px;
  .title {
    margin-bottom: 35px;
    p {
      font-size: 18px;
      color: var(--color-navy);
      font-weight: bolder;
    }
  }
  .card-author {
    background: var(--bg-box);
    border-radius: var(--border-radius);

    .flex-around {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__btn {
        text-transform: none;
        font-family: var(--monsterrat-font);
        font-size: 12px;
        width: 90px;
        height: 35px;
        border-radius: var(--border-radius-lg);
        margin-right: 5px;
        box-shadow: none;
      }
    }
    &__img {
      border-top-right-radius: var(--border-radius);
      border-top-left-radius: var(--border-radius);
      cursor: pointer;
    }
    &__box {
      display: flex;
      align-items: center;
      padding: 5px 0px 0px 10px;
      line-height: 20px;
      cursor: pointer;
      &-info {
        margin-left: 10px;
        p {
          font-size: 13px;
          color: var(--color-navy);
          font-weight: bolder;
        }
        small {
          font-size: 12px;
          color: var(--color-gray-shade);
          font-weight: 500;
        }
      }
    }
  }
`;

export {AllMediaStyled}