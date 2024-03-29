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
import { deleteCocktail, fetchData, publishedCocktail } from '../../../store/cocktail/cocktailThunk.ts';
import { apiUrl } from '../../../constants.ts';

const CocktailsAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {cocktails, fetchLoad, deleteLoad, publishedLoad} = useSelector((state: RootState) => state.cocktails);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const deleteCocktailId = async (id: string) => {
    await dispatch(deleteCocktail(id));
    await dispatch(fetchData());
  };

  const togglePublishedCocktail = async (id: string) => {
    await dispatch(publishedCocktail(id));
    await dispatch(fetchData());
  };

  return (
    <>
      {
        !cocktails.length &&
        <Typography variant='h5' component='h5' sx={{ padding: '10px' }}>
          No published cocktails yet
        </Typography>
      }
      <Box>
        <Box display={'flex'} flexWrap={'wrap'} sx={{gap: '20px'}}>
          {fetchLoad ? (
            <CircularProgress/>
          ) : (
            cocktails.map((cocktail) => (
              <Box key={cocktail._id} display={'flex'} position={'relative'}>
                {!cocktail.isPublished && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      fontWeight: 1000,
                      background: 'black',
                      color: 'red',
                    }}
                  >
                    Not published
                  </Box>
                )}

                <Box component="div" style={{display: 'inline-block', margin: '20px'}}>
                  <Card sx={{width: 280, mb: 10, backgroundColor: '#00796B'}}>
                    <CardMedia
                      component="img"
                      sx={{height: 250}}
                      image={apiUrl + cocktail.image}
                    />
                    <CardContent
                      sx={{display: 'flex', flexDirection: 'column', position:'relative',alignItems: 'center'}}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {cocktail.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                      <Button component={Link} to={`/cocktailFullInfo/${cocktail._id}`} color="inherit">
                        Learn more
                      </Button>
                      {deleteLoad === cocktail._id ? (
                        <CircularProgress/>
                      ) : (
                        <Button
                          sx={{position:'absolute',top:320,left:10,color:'tomato',fontWeight:700}}
                          disabled={deleteLoad === cocktail._id}
                          onClick={() => deleteCocktailId(cocktail._id)}
                        >
                          Delete
                        </Button>
                      )}
                      {publishedLoad === cocktail._id ? (
                        <CircularProgress/>
                      ) : (
                        <Button
                          sx={{position:'absolute',top:320,right:20,fontWeight:700}}
                          onClick={() => togglePublishedCocktail(cocktail._id)}
                        >
                          {cocktail.isPublished ? 'UnPublish' : 'Publish'}
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default CocktailsAdmin;
