import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUserProfile } from '../../../Models/User/types';
import { needsAssessmentModule } from '../../../Firebase/needsAssessmentModule';
import { Link, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { grey } from '@mui/material/colors';

interface INAReply {
  user: IUserProfile;
  response: {
    motivation: string;
    expectation: string;
  };
}

export function ViewNAFormPage() {
  const { trainingId } = useParams();
  const [NAReplies, setNAReplies] = useState<INAReply[]>([]);
  useEffect(() => {
    (async function () {
      let NARepliesResp: INAReply[] =
        await needsAssessmentModule.getNAResponses(trainingId as string);
      setNAReplies(NARepliesResp);
    })();
  }, [trainingId]);
  return (
    <Stack spacing={2}>
      <Typography fontSize="1.4em" fontWeight="bold">
        Enrollment form responses
      </Typography>
      {NAReplies.length === 0 ? (
        <Typography>No responses</Typography>
      ) : (
        <Stack direction="row" flexWrap="wrap" useFlexGap gap={4} flex="1 1 0">
          {NAReplies.map((repl, index) => (
            <ResponseContainer key={repl.user.userId}>
              <Stack spacing={1}>
                <Typography fontSize="1.2em" fontWeight="bold">
                  <Link variant="inherit" href={`/user/${repl.user.userId}`}>
                    {`#${index + 1} - ${repl.user.name} ${repl.user.surname}`}
                  </Link>
                </Typography>
                <Stack>
                  <Typography>
                    Why do you want to attend this session?
                  </Typography>
                  <Typography>{repl.response.motivation}</Typography>
                </Stack>
                <Stack>
                  <Typography>Why do you expect from this session?</Typography>
                  <Typography>{repl.response.expectation}</Typography>
                </Stack>
              </Stack>
            </ResponseContainer>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

const ResponseContainer = styled.div`
  border-radius: 20px;
  border: 1px solid ${grey[300]};
  padding: 16px;
  height: fit-content;
  display: grid;
`;
