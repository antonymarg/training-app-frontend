import {
  SignupPageContainer,
  SignupFormContainer,
  SignupFormDecorator,
} from './SignupPage.style';
import { useSignup } from './useSignup';
import { EmailCollectionPage } from './EmailCollectionPage/EmailCollectionPage';
import { PersonalDataPage } from './PersonalDataPage/PersonalDataPage';
import { ProfilePage } from './ProfilePage/ProfilePage';
import { Step, StepLabel, Stepper } from '@mui/material';

const steps = [
  { label: 'Sign up', step: 'emailCollection' },
  { label: 'Create your profile', step: 'personalData' },
  { label: 'Add more details', step: 'profile' },
];
export function SignupPage() {
  const { signupStep } = useSignup();
  const activeStep = steps.findIndex((e) => e.step.includes(signupStep));

  const getSignupPage = () => {
    switch (signupStep) {
      case 'emailCollection':
        return <EmailCollectionPage></EmailCollectionPage>;
      case 'personalData':
        return <PersonalDataPage></PersonalDataPage>;
      case 'participantProfile':
        return <ProfilePage></ProfilePage>;
      case 'trainerProfile':
        return <ProfilePage></ProfilePage>;
    }
  };

  return (
    <SignupPageContainer>
      <SignupFormContainer>
        <Stepper activeStep={activeStep}>
          {steps.map((e, i) => (
            <Step completed={i < activeStep}>
              <StepLabel>{e.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getSignupPage()}
      </SignupFormContainer>
      <SignupFormDecorator></SignupFormDecorator>
    </SignupPageContainer>
  );
}
