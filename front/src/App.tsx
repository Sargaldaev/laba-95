import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import { Container } from '@mui/material';
import Register from './components/RegisterForm/RegisterForm.tsx';
import Login from './components/LoginForm/LoginForm.tsx';

const App = () => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider  theme={darkTheme}>
        <CssBaseline />
        <AppToolbar />
        <Container>
          <Routes>
            <Route path="/" element={<h1>Hello world</h1>} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;