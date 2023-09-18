import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  eFeedbackFormStatus,
  eTrainingConfirmStatus,
} from '../../../../lib/enums';
import { feedbackModule } from '../../../../Firebase/feedbackModule/feedbackModule';
import { IViewTrainingSidebarProps } from './ViewTrainingSidebar';
interface IButton {
  key: string;
  label: string;
  onClick: () => void;
}

export function useTrainingSidebar({
  training,
  userId,
  getTraining,
}: IViewTrainingSidebarProps) {
  const navigate = useNavigate();
  const [hasFilledFeedback, setHasFilledFeedback] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState<
    'announcement' | 'task' | 'followUp'
  >();

  useEffect(() => {
    (async function () {
      let val = await feedbackModule.hasFilledFeedback(training.id, userId);
      setHasFilledFeedback(val);
    })();
  }, [training.id, userId]);

  const navigateToTrainingPage = useCallback(
    (page: string) => () => navigate(`/trainings/${training.id}/${page}`),
    [navigate, training.id]
  );

  const openModalWithBody =
    (page: 'announcement' | 'task' | 'followUp') => () => {
      setModalBody(page);
      setIsModalOpen(true);
    };

  const onRefresh = async () => await getTraining();

  let permissions = useMemo(() => {
    return {
      isPartOfTheSession: Boolean(
        training.participants[userId]?.status ||
          training.trainers[userId]?.status
      ),
      hasConfirmedAttendance:
        (training.participants[userId]?.status ||
          training.trainers[userId]?.status) !== eTrainingConfirmStatus.Pending,
    };
  }, [training.participants, training.trainers, userId]);

  let drawerButtons = useMemo(() => {
    if (!permissions.hasConfirmedAttendance) return [];
    let buttons: IButton[] = [];
    let participantStatus = training.participants[userId]?.status;
    let trainerStatus = training.trainers[userId]?.status;
    let isTrainerInTheSession = Boolean(
      trainerStatus && permissions.hasConfirmedAttendance
    );
    let isParticipantInTheSession = Boolean(
      participantStatus && permissions.hasConfirmedAttendance
    );
    let hasSessionStarted =
      training.startDate.seconds < Timestamp.now().seconds;
    let hasSessionFinished = training.endDate.seconds < Timestamp.now().seconds;
    if (isTrainerInTheSession) {
      buttons.push({
        key: 'send-announcement',
        label: 'Send announcement',
        onClick: openModalWithBody('announcement'),
      });
      buttons.push({
        key: 'create-task',
        label: 'Create task',
        onClick: openModalWithBody('task'),
      });
      buttons.push({
        key: 'see-enrollment-form',
        label: 'See results of enrollment form',
        onClick: navigateToTrainingPage('enroll'),
      });
      if (!hasSessionStarted)
        buttons.push({
          key: 'edit-training',
          label: 'Edit training',
          onClick: navigateToTrainingPage('edit'),
        });
      if (hasSessionFinished)
        buttons.push({
          key: 'send-follow-up-materials',
          label: 'Send follow up materials',
          onClick: openModalWithBody('followUp'),
        });
      if (
        hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.notSent
      )
        buttons.push({
          key: 'send-feedback-form',
          label: 'Send feedback form',
          onClick: navigateToTrainingPage('feedback'),
        });
      if (
        hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.sent
      )
        buttons.push({
          key: 'see-feedback-form-results',
          label: 'See feedback form results',
          onClick: navigateToTrainingPage('feedback'),
        });
    }
    if (isParticipantInTheSession) {
      if (
        hasSessionFinished &&
        training.feedbackFormStatus === eFeedbackFormStatus.notSent &&
        !hasFilledFeedback
      )
        buttons.push({
          key: 'fill-out-feedback-form',
          label: 'Fill out feedback form',
          onClick: navigateToTrainingPage('feedback'),
        });
    }
    return buttons;
  }, [
    permissions,
    hasFilledFeedback,
    navigateToTrainingPage,
    training.endDate.seconds,
    training.feedbackFormStatus,
    training.participants,
    training.startDate.seconds,
    training.trainers,
    userId,
  ]);

  return {
    isModalOpen,
    onModalClose: async (refresh: boolean) => {
      setIsModalOpen(false);
      if (refresh) await onRefresh();
    },
    ...permissions,
    modalBody,
    drawerButtons: drawerButtons,
  };
}
