import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    
    body::-webkit-scrollbar {
        display: none;
    }

    body::-webkit-scrollbar-thumb {
        background: rgba(102, 99, 97); /* 스크롤바의 색상 */
    }

    body::-webkit-scrollbar-track {
        background-color: rgba(217, 213, 210);  /*스크롤바 뒷 배경 색상*/
    }
`;

export default GlobalStyle;
