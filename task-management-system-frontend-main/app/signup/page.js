import SignUpForm from "@/components/Auth/SignUpForm";
import Unlogged_Navbar from "@/components/Auth/Unlogged_Navbar";
export default function page() {
  return (
    <>
    <Unlogged_Navbar/>
      <SignUpForm />
    </>
  );
}