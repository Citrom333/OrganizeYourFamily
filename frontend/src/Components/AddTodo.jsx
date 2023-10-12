import { useState, useEffect } from "react";
export default function AddTodo(props) {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [toDoType, setToDoType] = useState("");
    const [rewardPoint, setRewardpoint] = useState("");
    const [message, setMessage] = useState("");
    let userId = localStorage.getItem("userId");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`: ${taskName}, : ${description}, : ${deadline}, type: ${toDoType}, : ${userId}`);
        try {
            let res = await fetch(`/api/ToDo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "taskName": taskName,
                    "description": description,
                    "deadline": deadline,
                    "type": parseInt(toDoType),
                    "rewardPoint": rewardPoint,
                    "ready": false,
                    "ownerID": userId
                }),
            });
            if (res.status === 200) {
                setTaskName("");
                setDescription("");
                setDeadline("");
                setToDoType("");
                setRewardpoint("");
                setMessage("ToDo added successfully");
                props.setAddedNew(true);
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
            setMessage("Some error occured");
        }
    };
    return (
        <div className="toDos">
            <h3>Add todo</h3>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Description</p>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Deadline</p>
                        <input
                            type="date"
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Type</p>
                        <select onChange={(e) => setToDoType(e.target.value)}>
                            <option value=""></option>
                            <option value={0}>Housework</option>
                            <option value={1}>Job</option>
                            <option value={2}>School</option>
                            <option value={3}>Other</option>
                        </select>
                    </label>
                    <label>
                        <p>Rewardpoint</p>
                        <input
                            onChange={(e) => setRewardpoint(e.target.value)}
                        />
                    </label>
                    <div>
                        <input className="submit" type="submit" value="Add task" />
                    </div>
                </form>
            </div>

            {message ? <p>{message}</p> : ""}
        </div>
    )
}