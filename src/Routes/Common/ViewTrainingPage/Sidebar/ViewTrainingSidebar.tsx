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
import { eFeedbackFormStatus } from '../../../../lib/enums';
import { ConfirmationChips } from '../../../../Components';
import MenuIcon from '@mui/icons-material/Menu';

import { useTrainingSidebar } from './useTrainingSidebar';
import { useState } from 'react';
import { CreateTaskPage } from '../../../Trainers/CreateTaskPage/CreateTaskPage';
import { SendAnnouncementPage } from '../../../Trainers/SendAnnouncementPage/SendAnnouncementPage';
import { theme } from '../../../../theme';

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
  const { actions, permissions, isModalOpen, onModalClose, modalBody } =
    useTrainingSidebar({ training, userId, getTraining });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  const trainerButtons = (
    <Stack spacing={1}>
      {!permissions.hasSessionStarted && (
        <Button variant="contained" onClick={actions.onEditTraining}>
          Edit training
        </Button>
      )}
      <Button variant="contained" onClick={actions.onSendAnnouncement}>
        Send announcement
      </Button>
      {/* <Button variant="contained" onClick={actions.onCreateTask}>
        Create task
      </Button> */}
      <Button variant="contained" onClick={actions.onViewNAFormResults}>
        See results of enrollment form
      </Button>
      {permissions.hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.notSent && (
          <Button variant="contained" onClick={actions.onSendFeedbackForm}>
            Send feedback form
          </Button>
        )}
      {permissions.hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.sent && (
          <Button
            variant="contained"
            onClick={actions.onViewFeedbackFormResults}
          >
            See feedback form results
          </Button>
        )}
    </Stack>
  );

  const participantButtons = (
    <Stack spacing={1}>
      {permissions.hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.sent &&
        !permissions.hasFilledFeedback && (
          <Button variant="contained" onClick={actions.onSendFeedbackForm}>
            Fill out feedback form
          </Button>
        )}
    </Stack>
  );
  if (!permissions.isPartOfTheSession) return null;
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
            {permissions.isPartOfTheSession &&
              !permissions.hasConfirmedAttendance && (
                <ConfirmationChips
                  trainingId={training.id}
                  getTraining={getTraining}
                />
              )}
            {permissions.hasConfirmedAttendance && (
              <SidebarContainer>
                {permissions.isTrainerInTheSession && trainerButtons}
                {permissions.isParticipantInTheSession && participantButtons}
              </SidebarContainer>
            )}
          </Stack>
        </Drawer>
      </>
    );
  return (
    <Stack spacing={4} minWidth="200px">
      {permissions.isPartOfTheSession &&
        !permissions.hasConfirmedAttendance && (
          <ConfirmationChips
            trainingId={training.id}
            getTraining={getTraining}
          />
        )}
      {permissions.hasConfirmedAttendance && (
        <SidebarContainer>
          {permissions.isTrainerInTheSession && trainerButtons}
          {permissions.isParticipantInTheSession && participantButtons}
        </SidebarContainer>
      )}
      <Dialog
        open={isModalOpen}
        onClose={() => onModalClose(false)}
        fullWidth
        maxWidth={isMobile ? 'lg' : 'sm'}
      >
        <DialogTitle
          sx={{ background: theme.palette.primary.main, color: 'white' }}
        >
          {modalBody === 'task' ? 'Create new task' : 'Send announcement'}
        </DialogTitle>
        <Box padding={2}>
          {modalBody === 'task' ? (
            <CreateTaskPage onCreated={onModalClose} training={training} />
          ) : (
            <SendAnnouncementPage onSent={onModalClose} />
          )}
        </Box>
      </Dialog>
    </Stack>
  );
}
