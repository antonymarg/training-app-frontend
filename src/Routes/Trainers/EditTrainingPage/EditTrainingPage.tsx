import { useEditTrainingPage } from './useEditTrainingPage';
import { AddEditTrainingPage } from '../../../Components/AddEditTrainingPage/AddEditTrainingPage';
import { FullBodyLoader } from '../../../Components';

export function EditTrainingPage() {
  const {
    formData,
    handleInputChange,
    training,
    errors,
    onContinue,
    isLoading,
  } = useEditTrainingPage();

  if (!training) return <FullBodyLoader />;
  return (
    <AddEditTrainingPage
      title="Edit training"
      buttonLabel="Update"
      formData={formData}
      handleInputChange={handleInputChange}
      errors={errors}
      onContinue={onContinue}
      isLoading={isLoading}
    />
  );
}
