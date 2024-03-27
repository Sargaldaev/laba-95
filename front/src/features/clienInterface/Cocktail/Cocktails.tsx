import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { fetchData } from '../../../store/cocktail/cocktailThunk.ts';
import { apiUrl } from '../../../constants.ts';

const Cocktails = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {cocktails, fetchLoad} = useSelector((state: RootState) => state.cocktails);
  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Box display={'flex'} flexWrap={'wrap'} sx={{gap: '20px'}}>
          {fetchLoad ? (
            <CircularProgress/>
          ) : (
            cocktails.map((cocktail) => {
              return cocktail.isPublished || user?._id === cocktail.user ? (
                user?._id === cocktail.user && !cocktail.isPublished ? (
                  <Box key={cocktail._id} position={'relative'}>
                    <Box sx={{position: 'absolute', fontWeight: 700, background: 'black', top: 0, color: 'red'}}>Not
                      published</Box>
                    <Card sx={{width: 345}}>
                      <CardMedia
                        sx={{height: 470}}
                        image={apiUrl + cocktail.image}
                      />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {cocktail.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/artist/${cocktail._id}`} size="small">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                ) : (
                  <Box key={cocktail._id}>
                    <Card sx={{width: 345}}>
                      <CardMedia
                        sx={{height: 470}}
                        image={apiUrl + cocktail.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {cocktail.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/cocktailFullInfo/${cocktail._id}`} size="small">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                )
              ) : null;
            })
          )}
        </Box>
      </Box>
    </>
  );
};

export default Cocktails;
