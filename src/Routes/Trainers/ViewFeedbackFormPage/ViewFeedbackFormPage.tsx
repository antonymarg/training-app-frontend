import { useParams } from 'react-router-dom';
import { BodyContainer } from '../../../Components';

export function ViewFeedbackFormPage() {
  const { trainingId } = useParams();
  return <BodyContainer>View Feedback for {trainingId}</BodyContainer>;
}
