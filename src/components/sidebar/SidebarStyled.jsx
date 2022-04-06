import styled from "styled-components";

const FriendBoxStyled = styled.div`
  .rightbar__friend {
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
`;

export { FriendBoxStyled };
