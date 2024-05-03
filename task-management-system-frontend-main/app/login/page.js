import LoginForm from "@/components/Auth/LoginForm";
import Unlogged_Navbar from "@/components/Auth/Unlogged_Navbar";

export default function page() {
  return (
    <>
    <Unlogged_Navbar/>
      <LoginForm />
    </>
  );
}