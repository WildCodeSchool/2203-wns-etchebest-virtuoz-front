import { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("p4ssw0rd");

  const [getToken, { data }] = useLazyQuery(LOGIN);
  const router = useRouter();
  console.log(data);
  if (data) {
    console.log(data);
    localStorage.setItem("token", data.login);
  }
  return (
    <>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button
        onClick={async () => {
          try {
            await getToken({ variables: { email: email, password: password } });
            router.push("/");
          } catch (err) {
            console.log("Handle me", err);
          }
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
