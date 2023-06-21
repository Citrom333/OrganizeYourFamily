import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LoginAsFamilyMember() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [members, setMembers] = useState([]);
    const [message, setMessage] = useState("");
    const fetchMembers = () =>
        fetch("/api/User", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setMembers(json);
            });

    useEffect(() => {
        fetchMembers();
        console.log(members);
    }, [members.length])

    const fetchLogin = async (username, password, id) => {
        await fetch("/api/User/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: username, password: password }),
        })
            .then((response) => response.status !== 200 ? response : response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem("userName", data.name);
                localStorage.setItem("userId", id);
                data.name === undefined
                    ? setMessage("Something is wrong, please try again")
                    : navigate("/MainFamilyPage/MyPage");
            });
    };
    const handleLogin = async () => {
        localStorage.setItem("userName", "");
        localStorage.setItem("userId", "");
        console.log(name);
        console.log(password);
        console.log(id);
        await fetchLogin(name, password, id);
    }
    const handleMemberSelect = (e) => {
        setName(e.target.value.split(",")[1]);
        setId(e.target.value.split(",")[0]);
    }

    return (
        <>
            <div>
                <h1>Login</h1>
                <label>
                    <p>Choose member</p>
                    <select onChange={handleMemberSelect}>
                        <option value="">Choose your name</option>
                        {members.map(member => <option value={[member.id, member.name]}>{member.name}</option>)}
                    </select>
                </label>
                <label>
                    <p>Your password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button onClick={handleLogin} >
                        Login
                    </button>
                </div>
                <div>
                    {message === "" ? "" : <p>{message}</p>}
                </div>
                <div>
                    <a href="/MainFamilyPage">
                        <button >
                            Back
                        </button>
                    </a>
                </div>
            </div>

        </>
    )
}

export default LoginAsFamilyMember