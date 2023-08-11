import { useParams } from 'react-router-dom';

export function SendFeedbackFormPage() {
  const { trainingId } = useParams();
  return <div>Send feedback for {trainingId}</div>;
}
