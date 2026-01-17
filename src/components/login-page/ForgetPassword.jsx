import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

function ForgotPassword({ open, handleClose }) {

  const submitHandler = (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    // ✅ Fake reset link (testing only)
    const fakeResetLink = `https://hepl-reset-password.test/reset?email=${email}`;

    // Simulate sending email
    console.log('Reset Email Sent To:', email);
    console.log('Fake Reset Link:', fakeResetLink);

    alert(
      `Fake reset link sent!\n\nEmail: ${email}\n\nLink:\n${fakeResetLink}`
    );

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: submitHandler,
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <DialogContentText>
          Enter your registered email address.  
          (Testing mode – fake reset link will be generated)
        </DialogContentText>

        <OutlinedInput
          autoFocus
          required
          id="email"
          name="email"
          placeholder="Email address"
          type="email"
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Send Link
        </Button>
      </DialogActions>
    </Dialog>
  );
}

  ForgotPassword.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ForgotPassword;