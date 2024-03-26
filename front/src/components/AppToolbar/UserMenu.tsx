import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { logout } from '../../store/user/userThunk';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { apiUrl } from '../../constants.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let avatar = '';
  if (user?.avatar) {
    avatar = user.avatar.includes(`images`)
      ? apiUrl + user.avatar
      : user.avatar.toString();
  }
  let avatarFix = '';
  if (user?.avatar) {
    avatarFix = user.avatar.includes(`fixtures`) ? apiUrl + user.avatar : '';
  }

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user?.displayName}
      </Button>
      <Box>
        {avatarFix ? (
          <Card>
            <CardMedia sx={{ width: 70 }} component="img" image={avatarFix} alt="Image" />
          </Card>
        ) : (
          <Card>
            <CardMedia sx={{ width: 70 }} component="img" image={avatar} alt="Image" />
          </Card>
        )}
      </Box>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

    </>
  );
};

export default UserMenu;
