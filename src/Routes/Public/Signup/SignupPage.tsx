import {
  SignupPageContainer,
  SignupFormContainer,
  SignupFormDecorator,
  HeaderWrapper,
} from './SignupPage.style';
import { useState, useEffect } from 'react';
import { EmailCollectionPage } from './EmailCollectionPage/EmailCollectionPage';
import { PersonalDataPage } from './PersonalDataPage/PersonalDataPage';
import { Typography } from '@mui/material';
import SignupIcon from '../../../Assets/svg/SignupIcon.svg';
import SignupProcessIcon from '../../../Assets/svg/SignupProcessIcon.svg';
import { CompletePage } from './CompletePage/CompletePage';

export type SignupSteps = 'emailCollection' | 'personalData' | 'complete';

export function SignupPage() {
  const [signupStep, setSignupStep] = useState<SignupSteps>('emailCollection');
  const [decoratorImg, setDecoratorImg] = useState(SignupIcon);

  const getSignupPage = () => {
    switch (signupStep) {
      case 'emailCollection':
        return <EmailCollectionPage setStep={setSignupStep} />;
      case 'personalData':
        return <PersonalDataPage setStep={setSignupStep} />;
    }
  };

  useEffect(() => {
    switch (signupStep) {
      case 'emailCollection':
        setDecoratorImg(SignupIcon);
        break;
      case 'personalData':
        setDecoratorImg(SignupProcessIcon);
        break;
    }
  }, [signupStep]);

  if (signupStep === 'complete') return <CompletePage />;

  return (
    <SignupPageContainer>
      <HeaderWrapper>
        <Typography variant="h4">Sign up</Typography>
        <Typography variant="h5">
          {signupStep === 'emailCollection'
            ? "Let's get started"
            : 'Time to get to know you'}
        </Typography>
      </HeaderWrapper>
      <SignupFormContainer>{getSignupPage()}</SignupFormContainer>
      <SignupFormDecorator>
        <img width="100%" src={decoratorImg} alt="svg icon" />
      </SignupFormDecorator>
    </SignupPageContainer>
  );
}
