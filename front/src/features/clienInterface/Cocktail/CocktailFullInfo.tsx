import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { useEffect } from 'react';
import { getFullInfo } from '../../../store/cocktail/cocktailThunk.ts';
import { Link, useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { apiUrl } from '../../../constants.ts';
import Button from '@mui/material/Button';

const CocktailFullInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {id} = useParams() as { id: string };
  const {cocktailFullInfo, fetchLoadFullInfo} = useSelector((state: RootState) => state.cocktails);

  useEffect(() => {
    if (id) {
      dispatch(getFullInfo(id));
    }
  }, [dispatch]);
  return cocktailFullInfo && (
    fetchLoadFullInfo ? <CircularProgress/> :
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
            <Typography sx={{fontWeight: 700, fontSize: 17}} gutterBottom variant="h5">
            <span style={{fontWeight: 700, display: 'inline-block', marginRight: 1, color: 'green'}}>
              Cocktail name:
            </span>
              {cocktailFullInfo.name}
            </Typography>

            <Typography gutterBottom component="div">
            <span style={{fontWeight: 700, color: 'green'}}>
              Recipe:
            </span>
              {cocktailFullInfo.recipe}
            </Typography>

            <Typography gutterBottom component="div">
            <span style={{fontWeight: 700, color: 'green'}}>
              Ingredients :
            </span>

              {cocktailFullInfo.ingredients.map(item => (
                <Box key={item.name} display={'flex'}>
                  <Typography key={item._id} width={150}>
                  <span style={{display: 'inline-block', fontWeight: 700, marginRight: 1, color: 'blue'}}>
                    name:
                  </span>
                    {item.name}
                  </Typography>

                  <Typography key={item._id}>
                  <span style={{display: 'inline-block', color: 'tomato', fontWeight: 700, marginRight: 1}}>
                    amount:
                  </span>
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
