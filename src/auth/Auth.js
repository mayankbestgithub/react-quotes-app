import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginpostAsync, errorMessage } from '../auth/authSlice';
import './Auth.css';
export const Auth = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const err = useSelector(errorMessage);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginpostAsync({ username, password }));
    }

    return (
        <div>
            {err && err === "INVALID REQUEST" && <strong>Invalid Input!</strong>}
            {err && err === "UNAUTHORISED" && <strong>Invalid UserName or Password, Please try Again</strong>}
            <form >
                <fieldset>
                    <legend>Login Area</legend>
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="button" onClick={(e) => handleSubmit(e)}>LOGIN</button>
                </fieldset>

            </form>

        </div>
    )

}

