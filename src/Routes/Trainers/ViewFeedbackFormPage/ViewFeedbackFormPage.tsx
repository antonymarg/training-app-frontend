import { useParams } from 'react-router-dom';

export function ViewFeedbackFormPage() {
  const { trainingId } = useParams();
  return <div>View Feedback for {trainingId}</div>;
}
