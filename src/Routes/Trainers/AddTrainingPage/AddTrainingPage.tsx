import { useAddTrainingPage } from './useAddTrainingPage';
import { AddEditTrainingPage } from '../../../Components/AddEditTrainingPage/AddEditTrainingPage';

export function AddTrainingPage() {
  const { formData, handleInputChange, errors, onContinue, isLoading } =
    useAddTrainingPage();

  return (
    <AddEditTrainingPage
      title="Create new training"
      formData={formData}
      handleInputChange={handleInputChange}
      errors={errors}
      onContinue={onContinue}
      isLoading={isLoading}
      buttonLabel="Create"
    />
  );
}
