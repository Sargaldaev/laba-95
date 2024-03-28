import { useEffect } from 'react';
import { Box, CardMedia, Container, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { fetchData } from '../../../store/cocktail/cocktailThunk.ts';
import { apiUrl } from '../../../constants.ts';
import './myCocktails.css'

const MyCocktails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {cocktails, fetchLoad} = useSelector((state: RootState) => state.cocktails);
  const {user} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchData(user._id));
      return;
    }
    navigate('/');
  }, [dispatch, navigate, user]);

  return (
    <Container sx={{mt: 4}}>
      {
        fetchLoad &&
        <Box sx={{width: '100%', height: '4px'}}>
          <LinearProgress/>
        </Box>
      }
      {
        !fetchLoad && !cocktails.length &&
        <Typography variant="h5" component="h5" sx={{padding: '10px'}}>
          You have no cocktails yet
        </Typography>
      }
      <Stack className="my-cocktails-list">
        {cocktails.map(cocktail => (
          <Paper
            className="my-cocktail"
            key={cocktail._id}
            onClick={() => navigate(`/cocktailFullInfo/${cocktail._id}`)}
          >
            <CardMedia
              component="img"
              sx={{height: '250px', width: '100%'}}
              image={apiUrl + '/' + cocktail.image}
            />
            <Grid
              className="my-cocktail-name"
            >
              <Typography
                variant="h5" component="span"
              >{cocktail.name}</Typography>
              {
                !cocktail.isPublished &&
                <Typography
                  variant="body2" component="p"
                >Your cocktail is being considered by admin</Typography>
              }
            </Grid>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
};

export default MyCocktails;