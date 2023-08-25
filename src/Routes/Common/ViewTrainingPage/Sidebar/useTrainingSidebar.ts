import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { eTrainingConfirmStatus } from '../../../../lib/enums';
import { feedbackModule } from '../../../../Firebase/feedbackModule/feedbackModule';
import { IViewTrainingSidebarProps } from './ViewTrainingSidebar';

export function useTrainingSidebar({
  training,
  userId,
  getTraining,
}: IViewTrainingSidebarProps) {
  const navigate = useNavigate();
  const [hasFilledFeedback, setHasFilledFeedback] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState<'announcement' | 'task'>();

  useEffect(() => {
    (async function () {
      let val = await feedbackModule.hasFilledFeedback(training.id, userId);
      setHasFilledFeedback(val);
    })();
  }, [training.id, userId]);

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
      hasFilledFeedback,
    };
  }, [
    hasFilledFeedback,
    training.endDate.seconds,
    training.participants,
    training.startDate.seconds,
    training.trainers,
    userId,
  ]);

  const navigateToTrainingPage = (page: string) => () =>
    navigate(`/trainings/${training.id}/${page}`);

  const openModalWithBody = (page: 'announcement' | 'task') => () => {
    setModalBody(page);
    setIsModalOpen(true);
  };

  console.log(getTraining);
  const onRefresh = async () => await getTraining();

  return {
    permissions,
    actions: {
      onSendFeedbackForm: navigateToTrainingPage('feedback'),
      onViewFeedbackFormResults: navigateToTrainingPage('feedback'),
      onSendAnnouncement: openModalWithBody('announcement'),
      onViewNAFormResults: navigateToTrainingPage('enroll'),
      onCreateTask: openModalWithBody('task'),
    },
    isModalOpen,
    onModalClose: async (refresh: boolean) => {
      setIsModalOpen(false);
      if (refresh) await onRefresh();
    },
    modalBody,
  };
}
