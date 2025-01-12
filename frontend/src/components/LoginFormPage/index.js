import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/session';
import { Redirect } from 'react-router-dom'


function LoginFormPage() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser({credential, password}))
    }

    if (user) {
        return <Redirect to="/"/>
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input
                        type='text'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginFormPage;
