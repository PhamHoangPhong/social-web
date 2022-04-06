import styled from "styled-components";
import { Box } from "@mui/material";
const MediaListStyled = styled(Box)`
  width: 100%;
  background: var(--bg-box);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-top: 20px;
  height: fit-content;
  padding: 25px;
  .title {
    margin-bottom: 15px;
    p {
      font-size: 18px;
      color: var(--color-navy);
      font-weight: bolder;
    }
  }
  img {
    border-radius: var(--border-radius);
    object-fit: contain;
    cursor: pointer;
  }
`;
export { MediaListStyled };
