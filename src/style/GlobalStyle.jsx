import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }

    div {
        transition: background-color 0.5s ease;
    }

    span, p, h1, h2, h3, a, svg {
        transition: color 0.5s ease;
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
