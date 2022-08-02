import { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [getToken, { data }] = useLazyQuery(LOGIN);
  const router = useRouter();
  console.log('data :', data);
  if (data) {
    console.log(data.login);
    localStorage.setItem('token', data.login);
  }
  return (
    <div className={styles.container}>
      <h3>Login</h3>
      <input className={styles.input}
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className={styles.input2}
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={async () => {
          try {
            await getToken({ variables: { email: email, password: password } });
            router.push('/');
          } catch (err) {
            console.log('Handle me', err);
          }
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
