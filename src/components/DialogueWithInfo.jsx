import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// eslint-disable-next-line react/prop-types
export default function FormDialog({
  // eslint-disable-next-line react/prop-types
  open,
  // eslint-disable-next-line react/prop-types
  handleClose,
}) {
  console.log(open)
  // const [openDialogueWithInfo, setOpenDialogueWithInfo] = React.useState(false)

  // const handleOpenDialogueWithInfo = () => {
  //   setOpenDialogueWithInfo(true)
  // }

  // const handleCloseDialogueWithInfo = () => {
  //   setOpenDialogueWithInfo(false)
  // }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reject this result, please kindly add a reason for rejection
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Reason for rejection'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
