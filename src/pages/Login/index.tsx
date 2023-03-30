import LoginForm from '../../components/LoginForm';
import DemoService from '../../services/demo.service';

function Login() {
  interface Parameters {
    type: string;
    m_id: number;
  }

  const testAPI = DemoService.getTest<Parameters>({ type: 'tiktok', m_id: 82 })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });

  const testAPI1 = DemoService.createTest<any>({
    username: 'a',
    password: 'b',
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });

  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
