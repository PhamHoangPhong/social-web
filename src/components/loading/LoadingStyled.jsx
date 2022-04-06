import styled from "styled-components";
import { Box } from "@mui/material";

const LoadingStyled = styled(Box)`
    position: absolute;
    width: 150px;
    height: 150px;
    top:50%; 
    left:50%; 
    transform:translate(-50%, -50%); 
`
export {LoadingStyled}