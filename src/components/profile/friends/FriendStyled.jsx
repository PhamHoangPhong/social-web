import styled from "styled-components";
const FriendStyled = styled.div`
  margin-bottom: 20px;
  .friends__header {
    width: 100%;
    background: var(--bg-box);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-top: 20px;
    height: fit-content;
    padding: 25px;
    p {
      color: var(--color-navy);
      font-weight: bolder;
      font-size: 18px;
    }
  }
  .friends__info {
    width: 100%;
    background: var(--bg-box);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    height: fit-content;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    &-name {
      margin: 20px 0px;
      text-align: center;
      p {
        color: var(--color-navy);
        font-weight: bolder;
        font-size: 14px;
        margin-top: ;
      }
      small {
        color: var(--color-gray-shade);
        font-weight: 500;
        font-size: 12px;
      }
    }
    &-btn {
      text-transform: none;
      font-family: var(--monsterrat-font);
      border-radius: var(--border-radius-xl);
    }
  }
`;
export { FriendStyled };
