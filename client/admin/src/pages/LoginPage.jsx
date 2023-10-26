import { useState } from "react";
import LoginImage from "../assets/login-img.jpg";
import { useDispatch } from "react-redux";
import { login } from "../stores/actions/actionCreator";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginForm = (event) => {
    const { name, value } = event.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(loginForm));
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex">
        <img className="w-[40vw] h-screen" src={LoginImage} alt="login-img" />
        <div className="w-full flex justify-center items-center">
          <section className="w-[30vw] text-center">
            <h1 className="font-bold text-3xl mb-10">JobLink</h1>
            <p className="font-semibold text-xl mb-16">Welcome Back!</p>
            <form className="flex flex-col gap-5">
              <input
                className="p-3 rounded-md border-[1px]"
                type="text"
                placeholder="Email address"
                name="email"
                value={loginForm.email}
                onChange={handleLoginForm}
              />
              <input
                className="p-3 rounded-md border-[1px]"
                type="password"
                placeholder="Password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginForm}
              />
              <button
                onClick={handleSubmitLoginForm}
                className="mt-5 p-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-800 transition-colors duration-200"
                type="submit"
              >
                Login
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
