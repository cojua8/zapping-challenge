import PublicNavbar from "../components/PublicNavbar";
import SignupForm from "../components/SignupForm";

const Signup = () => (
  <div>
    <PublicNavbar />
    <div className="p-3 m-0 border-0 m-0 border-0">
      <div className="d-lg-flex justify-content-between">
        <div className="w-100 w-lg-50">
          <h1>Regístrate</h1>
        </div>
        <div className="w-100 w-lg-50">
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
);

export default Signup;
