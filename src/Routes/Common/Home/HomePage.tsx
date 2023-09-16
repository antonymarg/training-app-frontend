import {
  Alert,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
  Stack,
  useMediaQuery,
  Divider,
  TextFieldProps,
} from '@mui/material';
import {
  TextWithPhoto,
  LoginFormContainer,
  TextWithPhotoRev,
} from './HomePage.style';
import { GoogleButton } from '../../../Components';
import { useLogin } from './useLogin';
import { theme } from '../../../theme';
import InstructionManual from '../../../Assets/svg/InstructionManual.svg';
import BuildingBlock from '../../../Assets/svg/BuildingBlocks.svg';
import Tasks from '../../../Assets/svg/Tasks.svg';

const HomePage = () => {
  const {
    errors,
    isLoading,
    onLoginClick,
    formData,
    setFormData,
    onLoginWithGoogleClick,
  } = useLogin();
  const isMobile = useMediaQuery('@media only screen and (max-width: 768px)');

  return (
    <Stack spacing={4}>
      <Stack
        alignItems="center"
        direction={isMobile ? 'column' : 'row'}
        style={{
          margin: isMobile ? '-16px' : '-16px -10vw',
          padding: isMobile ? '32px 16px' : '32px 10vw',
          background: theme.palette.primary.main,
        }}
      >
        <div>
          <Typography
            variant="h1"
            color="secondary"
            flexWrap="wrap"
            fontSize="4rem"
            textAlign="center"
          >
            Training thesis app
          </Typography>
        </div>
        <LoginFormContainer>
          <Typography m={1} variant="h5" textAlign="center" color="secondary">
            Welcome to the future of training!
          </Typography>
          {errors.genericError && (
            <Alert severity="error">{errors.genericError}</Alert>
          )}
          <Stack spacing={1}>
            <StyledTextField
              id="email"
              type="email"
              label="Email"
              color="secondary"
              value={formData.email}
              onChange={(v) =>
                setFormData({ ...formData, email: v.target.value })
              }
              error={Boolean(errors.emailError)}
              helperText={errors.emailError}
            />
            <StyledTextField
              id="password"
              type="password"
              label="Password"
              color="secondary"
              value={formData.password}
              onChange={(v) =>
                setFormData({ ...formData, password: v.target.value })
              }
              error={Boolean(errors.passwordError)}
              helperText={errors.passwordError}
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ alignSelf: 'center' }}
              onClick={onLoginClick}
            >
              {isLoading === 'credentials' ? (
                <CircularProgress color="primary" size={25} />
              ) : (
                'Login'
              )}
            </Button>
          </Stack>
          <Divider
            sx={{
              '&::before, &::after': {
                borderColor: 'white',
              },
            }}
          >
            <Typography variant="overline" color="white">
              Or
            </Typography>
          </Divider>
          <GoogleButton
            color="secondary"
            onClick={onLoginWithGoogleClick}
            isLoading={isLoading === 'google'}
            text="Sign in with Google"
          />
          <Typography textAlign="center" color="white">
            If you don't have an account, make one{' '}
            <Link href="/signup" color="secondary">
              here
            </Link>
            !
          </Typography>
        </LoginFormContainer>
      </Stack>
      <TextWithPhoto>
        <div>
          <Typography fontWeight="bold" variant="h6" color="primary" mb={1}>
            Welcome to Training Thesis App: Empowering Education Excellence!
          </Typography>
          <Typography>
            Embark on a journey of knowledge and growth with Training Thesis App
            – your ultimate platform for seamless trainer-participant
            collaboration. We understand the pivotal role that effective
            communication plays in education, and that's why we've designed this
            app to be your dynamic hub for training coordination. Experience the
            convenience of coordinating training sessions effortlessly,
            leveraging past participant experiences to streamline needs
            assessments, and ensuring timely task completion through friendly
            reminders. Join us in revolutionizing the way education and training
            come together!
          </Typography>
        </div>
        <img
          src={BuildingBlock}
          width="60%"
          alt="building block img"
          style={{
            gridArea: 'photo',
            justifySelf: isMobile ? 'center' : 'self-end',
          }}
        />
      </TextWithPhoto>
      <TextWithPhotoRev>
        <img
          alt="instruction img"
          src={InstructionManual}
          width="70%"
          style={{
            gridArea: 'photo',
            justifySelf: isMobile ? 'center' : 'self-end',
          }}
        />
        <div>
          <Typography fontWeight="bold" variant="h6" color="primary" mb={1}>
            Seize the Power of Past Experiences for Future Learning!
          </Typography>
          <Typography>
            At Training Thesis App, we're all about making every training
            session count. Dive into a world where each participant's unique
            journey is a valuable asset. Our app proudly showcases the rich
            tapestry of past participant experiences, aiding trainers in
            crafting personalized and impactful sessions. Uncover insights that
            make needs assessment a breeze and unleash the full potential of
            collaborative learning. With Training Thesis App, your training
            sessions are not just events; they're transformative experiences
            that tap into the collective wisdom of the past to shape a brighter
            future.
          </Typography>
        </div>
      </TextWithPhotoRev>
      <TextWithPhoto>
        <div>
          <Typography fontWeight="bold" variant="h6" color="primary" mb={1}>
            Stay on Track, Achieve Brilliance: Your Training Companion!
          </Typography>
          <Typography>
            Say goodbye to missed deadlines and forgotten tasks. Training Thesis
            App stands by your side as your dedicated training companion. Our
            intuitive platform keeps participants engaged and accountable,
            sending timely reminders that empower them to accomplish tasks and
            embrace their learning journey. From pre-session preparations to
            post-session reflections, our app ensures that every step is a
            confident stride towards excellence. With Training Thesis App,
            you're not alone on your educational voyage – we're here to help you
            shine at every stage.
          </Typography>
        </div>
        <img
          alt="tasks img"
          src={Tasks}
          width="60%"
          style={{
            gridArea: 'photo',
            justifySelf: isMobile ? 'center' : 'self-end',
          }}
        />
      </TextWithPhoto>
      <Typography
        p={4}
        fontSize="1.2em"
        fontWeight="bold"
        color="primary"
        textAlign="center"
      >
        Feel the enthusiasm and drive of Training Thesis App as it fuels your
        passion for education, bridges connections between trainers and
        participants, and transforms learning into an adventure of discovery.
        Join us today and experience a new era of education collaboration!
      </Typography>
    </Stack>
  );
};

export default HomePage;
export const StyledTextField = (props: TextFieldProps) => (
  <TextField
    InputLabelProps={{ shrink: true }}
    sx={{
      '& .MuiInputLabel-root': { color: 'secondary.main' }, //styles the label
      '& .MuiOutlinedInput-root': {
        '& > fieldset': {
          borderColor: 'secondary.light',
        },
      },
      '& .MuiOutlinedInput-root:hover': {
        '& > fieldset': {
          borderColor: 'secondary.main',
        },
      },
      input: {
        color: 'secondary.main',
      },
      'input:-webkit-autofill, input:-webkit-autofill:focus': {
        boxShadow: '0 0 0 1000px #0b2027 inset',
        WebkitTextFillColor: '#ffba08',
      },
    }}
    {...props}
  />
);
