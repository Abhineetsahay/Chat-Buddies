import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Typography, Stack } from '@mui/material';

const FriendAccount = ({ friend, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Friend Account Details</DialogTitle>
      <DialogContent>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Avatar src={friend.image} sx={{ width: 100, height: 100 }} />
          <Typography variant="h6">{friend.name}</Typography>
          <Typography variant="body1">Phone Number:- {friend.phone}</Typography>
          {/* Add more friend details here */}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FriendAccount;
