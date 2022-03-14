import React from "react";
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: 'rgba(247, 66, 66, 0.8);  ',
        dark: '#ba000d',
        contrastText: '#fff',
      },
      text: {
          primary: '#fff'
      }
    },
  });

const MyPagination = ({page, setPage, totalPages}) => {

    const handleOnChange = (elem) => { 
      let numberOfPage = +elem.textContent
      
      if(!numberOfPage && elem.closest('svg').dataset.testid === 'NavigateNextIcon') {
          setPage(++page)
      } else if (!numberOfPage && elem.closest('svg').dataset.testid === 'NavigateBeforeIcon') {
          setPage(--page)
      } else {
        setPage(numberOfPage)
      }
    }
    
    return (
        <>
          <ThemeProvider theme={theme}>
              <Pagination 
                  style={{
                      display: "flex",
                      justifyContent: "center",
                  }} 
                  count={totalPages} 
                  shape="rounded" 
                  color="secondary"
                  size="medium"
                  siblingCount={1}
                  onChange={(e) => handleOnChange(e.target)}/>
          </ThemeProvider>
        </>      
    )
}

export default MyPagination