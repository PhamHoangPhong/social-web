import styled from "styled-components";
const AboutStyled = styled.div`
  .p-style {
    font-size: 14px;
    font-weight: 900;
    color: var(--color-navy);
  }
  .small-style {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-gray-shade);
  }
  .profile__body-desc {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--bg-box);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--box-shadow);
    margin-top: 20px;
    padding: 25px;
    &--header {
      line-height: 25px;
      margin-bottom: 20px;
    }
    &--info {
      display: flex;
      align-items: center;
      padding: 10px 0px;
      &-ml {
        margin-left: 18px;
      }
    }
  }
`;
export {AboutStyled}