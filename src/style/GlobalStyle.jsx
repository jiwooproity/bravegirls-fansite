import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
