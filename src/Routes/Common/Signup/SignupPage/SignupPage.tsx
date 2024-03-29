import {
  SignupPageContainer,
  SignupFormContainer,
  SignupFormDecorator,
  HeaderWrapper,
} from './SignupPage.style';
import { useState, useEffect } from 'react';
import { EmailCollectionPage } from '../EmailCollectionPage/EmailCollectionPage';
import { CreateProfilePage } from '../CreateProfilePage/CreateProfilePage';
import { Typography } from '@mui/material';
import SignupIcon from '../../../../Assets/svg/SignupIcon.svg';
import SignupProcessIcon from '../../../../Assets/svg/SignupProcessIcon.svg';

type SignupSteps = 'emailCollection' | 'createProfile';
interface IUserInfo {
  userId: string;
  email: string;
}
export function SignupPage() {
  const [signupStep, setSignupStep] = useState<SignupSteps>('emailCollection');
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [decoratorImg, setDecoratorImg] = useState(SignupIcon);

  const getSignupPage = () => {
    switch (signupStep) {
      case 'emailCollection':
        return (
          <EmailCollectionPage
            onNextStep={(userInfo: IUserInfo) => {
              setUserInfo(userInfo);
              setSignupStep('createProfile');
            }}
          />
        );
      case 'createProfile':
        return (
          <CreateProfilePage
            userId={userInfo?.userId ?? ''}
            email={userInfo?.email ?? ''}
          />
        );
    }
  };

  useEffect(() => {
    switch (signupStep) {
      case 'emailCollection':
        setDecoratorImg(SignupIcon);
        break;
      case 'createProfile':
        setDecoratorImg(SignupProcessIcon);
        break;
    }
  }, [signupStep]);

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
