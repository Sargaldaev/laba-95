import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { fetchData } from '../../../store/cocktail/cocktailThunk.ts';
import { apiUrl } from '../../../constants.ts';

const Cocktails = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {cocktails, fetchLoad} = useSelector((state: RootState) => state.cocktails);

  useEffect(() => {
    dispatch(fetchData(''));
  }, [dispatch]);

  return (
    <Container sx={{mt: 4}}>
      <Card sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        {
           fetchLoad &&
          <Box sx={{ width: '100%', height: '4px' }}>
            <LinearProgress />
          </Box>
        }
        {
           !cocktails.length &&
          <Typography variant='h5' component='h5' sx={{ padding: '10px' }}>
            No published cocktails yet
          </Typography>
        }
        {cocktails.map(cocktail => (
          !cocktail.isPublished ? null :
          <Card key={cocktail._id} sx={{width: 250, mb: 10, backgroundColor: '#00796B'}}>
            <CardMedia
              component="img"
              sx={{height: 350}}
              image={apiUrl + '/' + cocktail.image}
            />
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography gutterBottom variant="h5" component="div">
                {cocktail.name}
              </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
              <Button
                component={Link}
                to={`/cocktailFullInfo/${cocktail._id}`}
                color="inherit">
                Learn more
              </Button>
            </CardActions>
          </Card>
        ))}
      </Card>
    </Container>
  );
};

export default Cocktails;
