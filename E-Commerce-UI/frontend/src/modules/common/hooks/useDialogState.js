import { useState, useCallback } from 'react';

export const useDialogState = (open = false) => {
  const [isDialogOpen, setIsDialogOpen] = useState(open);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    isDialogOpen,
    openDialog,
    closeDialog
  };
};
