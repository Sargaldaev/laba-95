import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { getFullInfo } from '../../store/cocktail/cocktailThunk.ts';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { apiUrl } from '../../constants.ts';
import Button from '@mui/material/Button';

const CocktailFullInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {id} = useParams() as { id: string };
  const {cocktailFullInfo, fetchLoadFullInfo} = useSelector((state: RootState) => state.cocktails);
  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getFullInfo(id));
    }
  }, [dispatch]);
  return cocktailFullInfo && (
    <>
        <Button component={Link} to={`/`} size="small">
          Back
        </Button>
      <Box display="flex">
        <Box>
          <CardMedia
            sx={{height: 570, width: 470}}
            image={apiUrl + cocktailFullInfo.image}
          />
        </Box>

        <Box marginLeft={3}>
          <Typography
            sx={{fontWeight: 700, fontSize: 17}}
            gutterBottom variant="h5">
            <Typography
              sx={{fontWeight: 700, display: 'inline-block', marginRight: 1}}
              color={'green'}>Cocktail name:</Typography>
            {cocktailFullInfo.name}
          </Typography>

          <Typography gutterBottom component="div">
            <Typography
              sx={{fontWeight: 700}}
              color={'green'}>Recipe:</Typography>
            {cocktailFullInfo.recipe}
          </Typography>

          <Typography gutterBottom component="div">
            <Typography
              color={'green'}
              sx={{fontWeight: 700}}
            >Ingredients :
            </Typography>

            {cocktailFullInfo.ingredients.map(item => (

              <Box display={'flex'}>

                <Typography
                  width={150}
                >
                  <Typography
                    color={'blue'}
                    display={'inline-block'}
                    sx={{fontWeight: 700, marginRight: 1}}
                  >
                    name:
                  </Typography>
                  {item.name},
                </Typography>

                <Typography
                >
                  <Typography
                    display={'inline-block'}
                    color={'tomato'}
                    sx={{fontWeight: 700, marginRight: 1}}
                  >
                    amount:
                  </Typography>
                  {item.amount}
                </Typography>
              </Box>
            ))}
          </Typography>
        </Box>
      </Box>
    </>

  );
};

export default CocktailFullInfo;
