// import React, { useMemo, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
// import { CreateNewPasswordDialog } from 'modules/createNewPassword';
// import { useDialogState, useIsScreenDown } from 'modules/common';
// // import { ResetPasswordDialog } from './ResetPasswordDialog';
// // import { useResetPasswordHooks } from './useResetPasswordHooks';

// export const ResetPasswordHome = () => {
//   const history = useHistory();
//   const isMobile = useIsScreenDown(800);

//   const { isDialogOpen: isResetPasswordDialogOpen } = useDialogState(true);
//   const {
//     openDialog: openNewPasswordDialog,
//     closeDialog: closeNewPasswordDialog,
//     isDialogOpen: isNewPasswordDialogOpen
//   } = useDialogState(false);

//   const context = useMemo(
//     () => (history.location.pathname === '/reset-password' ? 'user' : 'seller'),
//     [history.location.pathname]
//   );

//   const onCloseResetPasswordDialog = useCallback(() => {
//     history.push('/');
//   }, [history]);

//   const {
//     values,
//     onPhoneNumberChange,
//     onEmailAddressChange,
//     onOTPChange,
//     onPasswordChange,
//     onConfirmPasswordChange,
//     setFieldValue
//   } = useResetPasswordHooks();

//   return (
//     <>
//       <ResetPasswordDialog
//         context={context}
//         open={isResetPasswordDialogOpen}
//         openNewPasswordDialog={openNewPasswordDialog}
//         closeNewPasswordDialog={closeNewPasswordDialog}
//         onPhoneNumberChange={onPhoneNumberChange}
//         onEmailAddressChange={onEmailAddressChange}
//         setFieldValue={setFieldValue}
//         onOTPChange={onOTPChange}
//         isNewPasswordDialogOpen={isNewPasswordDialogOpen}
//         closeResetPasswordDialog={onCloseResetPasswordDialog}
//         history={history}
//         isMobile={isMobile}
//         values={values}
//       />
//       {isNewPasswordDialogOpen ? (
//         <CreateNewPasswordDialog
//           open={isNewPasswordDialogOpen}
//           closeNewPasswordDialog={closeNewPasswordDialog}
//           onPasswordChange={onPasswordChange}
//           onConfirmPasswordChange={onConfirmPasswordChange}
//         />
//       ) : null}
//     </>
//   );
// };
