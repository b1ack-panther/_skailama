import { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [loginLoader, setLoginLoader] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

const handleLogin = async (event) => {
	event.preventDefault();

	const name = event.target.name.value;
	const email = event.target.email.value;
	setLoginLoader(true);
	try {
		const { data } = await axios.post(
			import.meta.env.VITE_BACKEND_DOMAIN + "/user",
			{
				name,
				email,
			}
		);

    dispatch(setUser(data));
    navigate("/home")
    
	} catch (error) {
		console.error("Error during login:", error);
	} finally {
		setLoginLoader(false);
	}
};

  return (
   <div className="login">
				<form className="login-inputs" onSubmit={handleLogin}>
					<label htmlFor="name">Name</label>
					<input type="text" name="name" />
					<br />
					<br />
					<label htmlFor="email">Email</label>
					<input type="text" name="email" />
					{loginLoader ? <Spinner /> : <button type="submit">Login</button>}
				</form>
			</div>
  )
}

export default Login
