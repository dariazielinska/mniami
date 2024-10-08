import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

      body {
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      button {
        font-family: 'Montserrat', sans-serif;
      }
    `}
  />
)

export default GlobalStyles
