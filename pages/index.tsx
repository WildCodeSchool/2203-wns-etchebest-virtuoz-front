import type { NextPage } from "next";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import styles from "../styles/Index.module.css";
import { users, status } from "./_app";
import SideNavbar from "../components/SideNavbar";

const Home: NextPage = () => {
  const getAllStatus = useQuery(status);
  const getAllUsers = useQuery(users);

  if (getAllStatus.loading || getAllUsers.loading) return <p>Loading...</p>;
  if (getAllStatus.error || getAllUsers.loading)
    return <p className="text-3xl font-bold underline">Error :(</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideNavbar />
      <main className={styles.main}>
        {getAllStatus.data.getAllStatus.map(({ name }: { name: any }) => (
          <div key={name}>
            <p>{name}</p>
          </div>
        ))}
        {getAllUsers.data.getAllUsers.map(({ email, name }: { email: any; name: any }) => (
          <div key={name}>
            <p>
              {email}: {name}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
