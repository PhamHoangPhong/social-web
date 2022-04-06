import { ImageList } from "@mui/material";
import styled from "styled-components";

const CreatePostStyled = styled.div`
  .crtpost {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--bg-box);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--box-shadow);
    margin-top: 20px;
    height: fit-content;
    padding: 25px;
    &__header {
      display: flex;
      align-items: center;

      p {
        font-size: 13px;
        font-weight: bolder;
        color: var(--color-gray-shade);
        margin-left: 10px;
      }
    }
    &__body {
      position: relative;
      display: flex;
      height: 120px;
      width: 100%;
      margin-top: 20px;
      textarea {
        flex: 1;
        widht: 100%;
        height: 100%;
        padding: 15px 45px;
        background: var(--bg-box);
        border: none;
        border-radius: var(--border-radius-lg);
        transition: 0.3s;
        box-shadow: 0px 0px 2px var(--color-gray-shade);
        &:focus {
          outline: none;
          box-shadow: 0px 0px 2px var(--color-primary);
          background-color: var(--bg-box);
        }
      }
      &-avatar {
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
    &__media {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      &-icon {
        text-transform: none;
        color: var(--color-gray);
        font-size: 13px;
        font-weight: bolder;
      }
    }
  }
`;

const ImageRenderStyled = styled(ImageList)`
  margin-top: 20px;
  .img-item {
    &__img {
      border-radius: var(--border-radius);
    }
    &__icon {
      color: var(--color-danger);
      cursor: pointer;
      margintop: 3px;
    }
  }
`;
export { CreatePostStyled, ImageRenderStyled };
