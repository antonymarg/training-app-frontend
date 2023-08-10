import { Button, Stack } from '@mui/material';
import { SidebarContainer } from './viewTrainingSidebar.style';
import { useNavigate } from 'react-router-dom';
import { ITraining } from '../../../../Firebase/trainingModule/trainingModule.types';
import { useMemo } from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  eFeedbackFormStatus,
  eTrainingConfirmStatus,
} from '../../../../lib/enums';
import { trainingModule } from '../../../../Firebase';
import { ConfirmationChips } from '../../../../Components';

interface IViewTrainingSidebarProps {
  training: ITraining;
  userId: string;
}

export function ViewTrainingSidebar({
  training,
  userId,
}: IViewTrainingSidebarProps) {
  const navigate = useNavigate();
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
  return (
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
  );
}
