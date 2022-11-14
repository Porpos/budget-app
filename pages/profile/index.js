import Profile from "../../components/Profile";
import { getSession } from "next-auth/react";

const ProfilePage = ({ userData, expensesData }) => {
  return <Profile userData={userData} expensesData={expensesData}></Profile>;
};

export default ProfilePage;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
  const response = await fetch("http://localhost:3000/api/get-expenses", {
    method: "POST",
    body: JSON.stringify({ emailOfUser: "onuralphho@hotmail.com"}),
    headers: { "Content-Type": "application/json" },
  });
  const expensesData = await response.json();

  const res = await fetch("http://localhost:3000/api/get-user", {
    method: "POST",
    body: JSON.stringify({ email: session.user.email }),
    headers: { "Content-Type": "application/json" },
  });
  const userData = await res.json();
  return {
    props: {
      expensesData,
      userData,
      session,
    },
  };
};