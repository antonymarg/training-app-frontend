import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { SidebarContainer } from './viewTrainingSidebar.style';
import { ITraining } from '../../../../Firebase/trainingModule/trainingModule.types';
import { ConfirmationChips } from '../../../../Components';
import MenuIcon from '@mui/icons-material/Menu';

import { useTrainingSidebar } from './useTrainingSidebar';
import { useState } from 'react';
import { CreateTaskPage } from '../../../Trainers/CreateTaskPage/CreateTaskPage';
import { SendAnnouncementPage } from '../../../Trainers/SendAnnouncementPage/SendAnnouncementPage';
import { theme } from '../../../../theme';
import { SendFollowUpPage } from '../../../Trainers/SendFollowUpPage/SendFollowUpPage';

export interface IViewTrainingSidebarProps {
  training: ITraining;
  userId: string;
  getTraining: () => Promise<void>;
}

export function ViewTrainingSidebar({
  training,
  userId,
  getTraining,
}: IViewTrainingSidebarProps) {
  const {
    drawerButtons,
    isPartOfTheSession,
    hasConfirmedAttendance,
    isModalOpen,
    onModalClose,
    modalBody,
  } = useTrainingSidebar({ training, userId, getTraining });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  if (!isPartOfTheSession) return null;

  let getDialog = () => {
    let title = '';
    let mainBody = <></>;

    switch (modalBody) {
      case 'task':
        title = 'Create Task';
        mainBody = (
          <CreateTaskPage onCreated={onModalClose} training={training} />
        );
        break;
      case 'announcement':
        title = 'Send Announcement';
        mainBody = <SendAnnouncementPage onSent={onModalClose} />;
        break;
      case 'followUp':
        title = 'Send follow-up material';
        mainBody = <SendFollowUpPage onSent={onModalClose} />;
        break;
    }

    return (
      <Dialog
        open={isModalOpen}
        onClose={() => onModalClose(false)}
        fullWidth
        maxWidth={isMobile ? 'lg' : 'sm'}
      >
        <DialogTitle
          sx={{ background: theme.palette.primary.main, color: 'white' }}
        >
          {title}
        </DialogTitle>
        <Box padding={2}>{mainBody}</Box>
      </Dialog>
    );
  };

  if (isMobile)
    return (
      <>
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{ background: 'black', color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={isDrawerOpen}
          anchor="bottom"
          onClose={() => setIsDrawerOpen(false)}
        >
          <Stack spacing={4}>
            {isPartOfTheSession && !hasConfirmedAttendance && (
              <ConfirmationChips
                trainingId={training.id}
                getTraining={getTraining}
              />
            )}
            {drawerButtons.length > 0 && (
              <SidebarContainer>
                <Stack spacing={1}>
                  {drawerButtons.map((button) => (
                    <Button
                      key={button.key}
                      variant="contained"
                      onClick={button.onClick}
                    >
                      {button.label}
                    </Button>
                  ))}
                </Stack>
              </SidebarContainer>
            )}
          </Stack>
          {getDialog()}
        </Drawer>
      </>
    );

  return (
    <Stack spacing={4} minWidth="200px">
      {isPartOfTheSession && !hasConfirmedAttendance && (
        <ConfirmationChips trainingId={training.id} getTraining={getTraining} />
      )}
      {drawerButtons.length > 0 && (
        <SidebarContainer>
          <Stack spacing={1}>
            {drawerButtons.map((button) => (
              <Button
                key={button.key}
                variant="contained"
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ))}
          </Stack>
        </SidebarContainer>
      )}
      {getDialog()}
    </Stack>
  );
}
