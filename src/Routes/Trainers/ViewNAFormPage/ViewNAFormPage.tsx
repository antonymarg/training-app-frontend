import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUserProfile } from '../../../Models/User/types';
import { NAModule } from '../../../Firebase/NAModule';
import { Link, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { grey } from '@mui/material/colors';
import { BodyContainer } from '../../../Components';

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
      // @ts-ignore
      let NARepliesResp: INAReply[] = await NAModule.getNAResponses(
        trainingId as string
      );
      setNAReplies(NARepliesResp);
    })();
  }, [trainingId]);
  return (
    <BodyContainer>
      <Stack spacing={2}>
        <Typography fontSize="1.4em" fontWeight="bold">
          Need assessment form responses
        </Typography>
        {NAReplies.map((repl, index) => (
          <ResponseContainer key={repl.user.userId}>
            <Stack spacing={1}>
              <Typography fontSize="1.2em" fontWeight="bold">
                <Link
                  variant="inherit"
                  underline="hover"
                  href={`/user/${repl.user.userId}`}
                >
                  {`#${index + 1} - ${repl.user.name} ${repl.user.surname}`}
                </Link>
              </Typography>
              <Stack>
                <Typography>Why do you want to attend this session?</Typography>
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
    </BodyContainer>
  );
}

const ResponseContainer = styled.div`
  border-radius: 20px;
  border: 1px solid ${grey[300]};
  padding: 16px;
  height: fit-content;
  display: grid;
`;
