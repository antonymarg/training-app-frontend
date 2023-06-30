import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUser } from '../../../Models/User/selectors';
// import { startSignupWithEmailThunk } from '../../../Models/User/thunks';
// import { AppDispatch } from '../../../Store';
import { ISignUpFormErrors } from '../../../Models/User/types';

type SignupSteps =
  | 'emailCollection'
  | 'personalData'
  | 'participantProfile'
  | 'trainerProfile';

const getDefaultFormState = (signupStep: SignupSteps): FormDataType => {
  switch (signupStep) {
    case 'emailCollection':
      return {
        type: 'emailCollection',
        email: '',
        password: '',
        confirmPassword: '',
      };
    case 'personalData':
      return {
        type: 'personalData',
        name: '',
        surname: '',
        role: 'participant',
        photo: '',
      };
    case 'participantProfile':
      return {
        type: 'participantProfile',
      };
    case 'trainerProfile':
      return { type: 'trainerProfile' };
  }
};

export interface EmailCollectionFormData {
  type: 'emailCollection';
  email: string;
  password: string;
  confirmPassword: string;
}

interface PersonalDataFormData {
  type: 'personalData';
  name: string;
  surname: string;
  role: 'participant' | 'trainer';
  photo: string;
}

interface ParticipantProfileFormData {
  type: 'participantProfile';
}

interface TrainerProfileFormData {
  type: 'trainerProfile';
}

type FormDataType =
  | EmailCollectionFormData
  | PersonalDataFormData
  | ParticipantProfileFormData
  | TrainerProfileFormData;

export function useSignup() {
  const [signupStep, setSignupStep] = useState<SignupSteps>('emailCollection');
  const [formData, setFormData] = useState<FormDataType>(
    getDefaultFormState(signupStep)
  );
  const [errors, setErrors] = useState<ISignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState<string | null>(null);

  return { formData, setFormData, errors, isLoading, signupStep };
}
