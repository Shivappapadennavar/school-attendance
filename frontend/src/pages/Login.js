import api from '../api';

function Login() {
  const login = async () => {
    const res = await api.post('/auth/login', {
      email: "student@gmail.com",
      password: "123"
    });
    localStorage.setItem("token", res.data.token);
    alert("Login Success");
  };

  return <button onClick={login}>Login</button>;
}

export default Login;
