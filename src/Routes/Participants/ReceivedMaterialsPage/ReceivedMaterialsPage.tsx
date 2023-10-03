import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../Models/User/selectors';
import { useEffect, useState } from 'react';
import { assetsModule, trainingModule } from '../../../Firebase';
import { eTrainingConfirmStatus } from '../../../lib/enums';
import { IFollowUpMaterial } from '../../../Firebase/trainingModule/trainingModule.types';
import { InfoTable } from '../../../Components';

interface IReceivedMaterial {
  trainingId: string;
  title: string;
  materials: IFollowUpMaterial[];
}

export function ReceivedMaterialsPage() {
  const userId = useSelector(getUserProfile)?.userId;
  const [receivedMaterials, setReceivedMaterials] = useState<
    IReceivedMaterial[]
  >([]);

  useEffect(() => {
    (async function () {
      const receivedMaterials = (
        await trainingModule.getTrainings(userId as string, 'participant', {
          timePeriod: 'past',
          trainingStatus: eTrainingConfirmStatus.Pending,
        })
      ).map((training) => ({
        materials: training.followUpMaterials,
        trainingId: training.id,
        title: training.title,
      }));
      setReceivedMaterials(receivedMaterials);
    })();
  });
  return (
    <Stack spacing={2}>
      <Typography variant="h4">My received materials</Typography>
      {receivedMaterials.map((training) => (
        <Stack key={training.trainingId}>
          <InfoTable
            tableData={{
              headers: [{ label: 'Title' }, { label: 'Description' }],
              data: training.materials.map((material) => ({
                id: material.fileUrl,
                title: material.title,
                description: material.description,
              })),
            }}
            noDataMessage="No materials"
            title={training.title}
            onRowClick={async (_, id) => {
              let link = await assetsModule.getAsset(id);
              window.open(link, '_blank');
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
}
