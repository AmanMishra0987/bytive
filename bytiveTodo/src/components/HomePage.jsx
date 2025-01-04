import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../redux/tasksSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: tasks, status } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p className="text-center text-gray-500">Loading...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error loading tasks.</p>;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Task List</h1>
      <Link
        to="/add-task"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mb-4"
      >
        Add Task
      </Link>

      <ul className="space-y-4">
        {currentTasks.map((task) => (
          <li key={task.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
              <p className="text-gray-500">
                Status:{" "}
                <span className={`font-semibold ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </p>
            </div>
            <Link
              to={`/edit-task/${task.id}`}
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Edit Task
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {Math.ceil(tasks.length / tasksPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
