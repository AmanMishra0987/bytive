import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTask } from "../redux/tasksSlice";

const EditTaskPage = () => {
  const { id } = useParams();
  const task = useSelector((state) =>
    state.tasks.data.find((t) => t.id === parseInt(id))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStatusChange = () => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
    navigate("/");
  };

  if (!task) return <p className="text-center text-red-500">Task not found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-semibold text-center mb-6">Edit Task</h1>
        <div className="text-center mb-4">
          <h3 className="text-xl font-medium">{task.title}</h3>
          <p className="mt-2 text-lg">
            Status:{" "}
            <span
              className={`${
                task.completed ? "text-green-500" : "text-red-500"
              } font-semibold`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleStatusChange}
            className={`w-full py-3 font-semibold rounded-md ${
              task.completed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            } text-white transition duration-300`}
          >
            Mark as {task.completed ? "Pending" : "Completed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
