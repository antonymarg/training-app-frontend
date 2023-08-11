import {
  Button,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { SidebarContainer } from './viewTrainingSidebar.style';
import { useNavigate } from 'react-router-dom';
import { ITraining } from '../../../../Firebase/trainingModule/trainingModule.types';
import { useMemo, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  eFeedbackFormStatus,
  eTrainingConfirmStatus,
} from '../../../../lib/enums';
import { trainingModule } from '../../../../Firebase';
import { ConfirmationChips } from '../../../../Components';
import MenuIcon from '@mui/icons-material/Menu';

interface IViewTrainingSidebarProps {
  training: ITraining;
  userId: string;
}

export function ViewTrainingSidebar({
  training,
  userId,
}: IViewTrainingSidebarProps) {
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const permissions = useMemo(() => {
    let participantStatus = training.participants[userId]?.status;
    let trainerStatus = training.trainers[userId]?.status;
    let hasConfirmedAttendance =
      (participantStatus || trainerStatus) > eTrainingConfirmStatus.Pending;
    return {
      isPartOfTheSession: Boolean(trainerStatus || participantStatus),
      hasConfirmedAttendance,
      isTrainerInTheSession: Boolean(trainerStatus && hasConfirmedAttendance),
      isParticipantInTheSession: Boolean(
        participantStatus && hasConfirmedAttendance
      ),
      hasSessionStarted: training.startDate.seconds < Timestamp.now().seconds,
      hasSessionFinished: training.endDate.seconds < Timestamp.now().seconds,
    };
  }, [
    training.endDate.seconds,
    training.participants,
    training.startDate.seconds,
    training.trainers,
    userId,
  ]);

  const onSendFeedbackForm = async () => {
    await trainingModule.updateFeedbackField(
      training.id,
      eFeedbackFormStatus.sent
    );
    window.location.reload();
  };
  const onSendAnnouncement = () =>
    navigate(`/trainings/${training.id}/announce`);
  const onViewNAFormResults = () =>
    navigate(`/trainings/${training.id}/enroll`);
  const onViewFeedbackFormResults = () =>
    navigate(`/trainings/${training.id}/feedback`);

  const trainerButtons = (
    <Stack spacing={1}>
      {!permissions.hasSessionStarted && (
        <Button variant="contained">Add participants</Button>
      )}
      <Button variant="contained" onClick={onSendAnnouncement}>
        Send announcement
      </Button>
      <Button variant="contained" onClick={onViewNAFormResults}>
        See results of enrollment form
      </Button>
      {permissions.hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.notSent && (
          <Button variant="contained" onClick={onSendFeedbackForm}>
            Send feedback form
          </Button>
        )}
      {permissions.hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.sent && (
          <Button variant="contained" onClick={onViewFeedbackFormResults}>
            See feedback form results
          </Button>
        )}
    </Stack>
  );
  const participantButtons = (
    <Stack spacing={1}>
      {permissions.hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.sent && (
          <Button variant="contained" onClick={onSendFeedbackForm}>
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
                <ConfirmationChips trainingId={training.id} />
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
          <ConfirmationChips trainingId={training.id} />
        )}
      {permissions.hasConfirmedAttendance && (
        <SidebarContainer>
          {permissions.isTrainerInTheSession && trainerButtons}
          {permissions.isParticipantInTheSession && participantButtons}
        </SidebarContainer>
      )}
    </Stack>
  );
}