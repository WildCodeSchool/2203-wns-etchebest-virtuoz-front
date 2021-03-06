import { useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import TasksBoardViews from '../views/TasksBoardViews';
import styles from '../styles/Index.module.css';
import { users } from './_app';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  // const getAllStatus = useQuery(status);
  const getAllUsers = useQuery(users);
  const router = useRouter();

  if (getAllUsers.loading) return <p>Loading...</p>;
  if (getAllUsers.error) return <p>Error :::(</p>;

  function testNum({ a }: { a: number }): string {
    let result;
    const newLocal = (result = a > 0 ? 'positive' : 'NOT positive');
    return newLocal;
  }

  console.log(testNum({ a: -5 }));
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <p>TEST</p>
      <button
        onClick={async () => {
          try {
            await localStorage.removeItem('token');
            router.push('/login');
          } catch (err) {
            console.log('not working :', err);
          }
        }}
      >
        Logout
      </button>
      <main className={styles.main}>
        <TasksBoardViews />
        {/* {getAllUsers.data.getAllUsers.map(
          ({ email, name }: { email: any; name: any }) => (
            <div key={name}>
              <p>
                {email}: {name}
              </p>
            </div>
          )
        )} */}
      </main>
    </div>
  );
};

export default Home;
