import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Index.module.css";
import { users, status } from "./_app";

const Home: NextPage = () => {
  // const getAllStatus = useQuery(status);
  const getAllUsers = useQuery(users);

  if (getAllUsers.loading) return <p>Loading...</p>;
  // if (getAllUsers.error) return <p>Error :(</p>;

  function testNum({ a }: { a: number }): string {
    let result;
    const newLocal = (result = a > 0 ? "positive" : "NOT positive");
    return newLocal;
  }

  console.log(testNum({ a: -5 }));
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* {getAllStatus.data.getAllStatus.map(({ name }: { name: any }) => (
          <div key={name}>
            <p>{name}</p>
          </div>
        ))} */}
        {getAllUsers.data.getAllUsers.map(
          ({ email, name }: { email: any; name: any }) => (
            <div key={name}>
              <p>
                {email}: {name}
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Home;
