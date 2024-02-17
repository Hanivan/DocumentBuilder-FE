"use client";

import { AuthStore } from "@/features/store/authStore";

const AdminDashboardPage = () => {
  const [email, hashId, token] = AuthStore((s) => [
    s.email,
    s.hashId,
    s?.token,
  ]);

  console.log(email, hashId, token);

  return (
    <>
      <div>AdminDashboardPage</div>
      <p>oke</p>
      <h1>{email}</h1>
      <h2>{hashId}</h2>
      <h3>{token}</h3>
    </>
  );
};

export default AdminDashboardPage;
