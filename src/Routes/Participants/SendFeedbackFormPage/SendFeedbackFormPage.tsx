import { useParams } from 'react-router-dom';
import { BodyContainer } from '../../../Components';

export function SendFeedbackFormPage() {
  const { trainingId } = useParams();
  return <BodyContainer>Send feedback for {trainingId}</BodyContainer>;
}
