'use client';

const Dashboard = () => {
  return (
    <div className="mt-8 flex flex-col justify-center text-2xl">
      <p>Email Confirmed Successfully</p>
      <a className="underline" href="/auth/sign-in">
        Sign in
      </a>
    </div>
  );
};

export default Dashboard;
