import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

// Assuming Person is defined in '../lib/person'
import { Person } from '../lib/person';

interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const PersonDialog: React.FC<PersonDialogProps> = ({ open, handleClose, currentPerson, setCurrentPerson, handleSubmit }) => {
  const handleDateChange = (date: Dayjs | null) => {
    if (currentPerson) {
      setCurrentPerson(prev => ({
        ...prev!,
        dob: date ? date.format('DD-MM-YYYY') : '',
      }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{currentPerson ? 'Edit Person' : 'Add Person'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          value={currentPerson?.firstname || ''}
          onChange={e => setCurrentPerson(prev => ({ ...prev!, firstname: e.target.value }))}
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          value={currentPerson?.lastname || ''}
          onChange={e => setCurrentPerson(prev => ({ ...prev!, lastname: e.target.value }))}
        />
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          value={currentPerson?.phone || ''}
          onChange={e => setCurrentPerson(prev => ({ ...prev!, phone: e.target.value }))}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={currentPerson?.dob ? dayjs(currentPerson.dob) : null}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {currentPerson ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonDialog;
