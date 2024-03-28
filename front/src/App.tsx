import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import { Container } from '@mui/material';
import Register from './features/clienInterface/User/RegisterForm/RegisterForm.tsx';
import Login from './features/clienInterface/User/LoginForm/LoginForm.tsx';
import CocktailsAdmin from './features/adminInterface/Cocktail/CocktailsAdmin.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './app/store.ts';
import Cocktails from './features/clienInterface/Cocktail/Cocktails.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import CocktailFullInfo from './features/clienInterface/Cocktail/CocktailFullInfo.tsx';
import MyCocktails from './features/clienInterface/Cocktail/MyCocktails.tsx';
import AddCocktail from './features/clienInterface/Cocktail/AddCocktail.tsx';

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);

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
            <Route
              path="/"
              element={
                user && user.role === 'admin' ? (
                  <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                    <CocktailsAdmin />
                  </ProtectedRoute>
                ) : (
                  <Cocktails />
                )
              }
            />
            <Route path="/myCocktails" element={<MyCocktails/>}/>
            <Route path="/cocktailFullInfo/:id" element={<CocktailFullInfo/>} />
            <Route path="/addCocktail" element={<AddCocktail/>}/>
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