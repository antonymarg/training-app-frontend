import {
  SignupPageContainer,
  SignupFormContainer,
  SignupFormDecorator,
  HeaderWrapper,
} from './SignupPage.style';
import { useState, useEffect } from 'react';
import { EmailCollectionPage } from './EmailCollectionPage/EmailCollectionPage';
import { PersonalDataPage } from './PersonalDataPage/PersonalDataPage';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { getAsset } from '../../../Firebase/assets';
import { ParticipantProfileSignupPage } from './ParticipantProfilePage/ParticipantProfileSignupPage';
import { TrainerProfileSingupPage } from './TrainerProfilePage/TrainerProfileSingupPage';

export type SignupSteps =
  | 'emailCollection'
  | 'personalData'
  | 'participantProfile'
  | 'trainerProfile';

const steps = [
  { label: 'Sign up', step: 'emailCollection' },
  { label: 'Create your profile', step: 'personalData' },
  { label: 'Add more details', step: 'Profile' },
];
export function SignupPage() {
  const [signupStep, setSignupStep] = useState<SignupSteps>('emailCollection');
  const [svgUrl, setSvgUrl] = useState('');
  const activeStep = steps.findIndex((e) => signupStep.includes(e.step));

  const getSignupPage = () => {
    switch (signupStep) {
      case 'emailCollection':
        return <EmailCollectionPage setStep={setSignupStep} />;
      case 'personalData':
        return <PersonalDataPage setStep={setSignupStep} />;
      case 'participantProfile':
        return <ParticipantProfileSignupPage />;
      case 'trainerProfile':
        return <TrainerProfileSingupPage />;
    }
  };

  useEffect(() => {
    let svgDir: string;
    switch (signupStep) {
      case 'emailCollection':
        svgDir = 'SignupIcon';
        break;
      case 'personalData':
        svgDir = 'SignupProcessIcon';
        break;
      default:
        svgDir = 'SignupCompletedIcon';
    }
    getAsset(`assets/svg/${svgDir}.svg`)
      .then((url) => setSvgUrl(url))
      .catch((e) => console.log(e));
  }, [signupStep]);

  return (
    <SignupPageContainer>
      <HeaderWrapper>
        <Typography variant="h4">Create new account</Typography>
      </HeaderWrapper>
      <SignupFormContainer>
        <Stepper activeStep={activeStep}>
          {steps.map((e, i) => (
            <Step key={e.label} completed={i < activeStep}>
              <StepLabel>{e.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getSignupPage()}
      </SignupFormContainer>
      <SignupFormDecorator>
        {svgUrl && <img width="100%" src={svgUrl} alt="svg icon" />}
      </SignupFormDecorator>
    </SignupPageContainer>
  );
}
