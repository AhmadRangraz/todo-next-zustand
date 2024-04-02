import { task, taskStatus } from "../interfaces/task";
import { useTaskStore } from "../store/taskStore";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const IndexPage = () => {
  const taskStore = useTaskStore();
  const { register, handleSubmit, reset } = useForm();

  return (
    <section className=" flex items-center justify-center bg-gradient-to-t from-[#09203f] to-[#537895]  min-w-screen  min-h-screen ">
      <div className="m-auto backdrop-blur border shadow-md rounded-lg felx bg-[#09203f]  text-white flex-col items-end justify-center border-blue-200 p-4 shadow-blue-400">
        <div>
          {taskStore.tasks.map((task, index) => (
            <div
              className={`${
                task.status === taskStatus.Done ? "bg-green-950" : ""
              } border m-2 flex items-center justify-between p-2 rounded-md shadow-md shadow-blue-950 border-blue-400 gap-3`}
              key={task.id}
            >
              <input
                type="checkbox"
                checked={task.status === taskStatus.Done ? true : false}
                onChange={(e) =>
                  taskStore.editTask(
                    index,
                    "status",
                    e.target.checked ? taskStatus.Done : taskStatus.NotDone
                  )
                }
              />
              <input
                type="text"
                value={task.title}
                className="taskInput"
                onChange={(e) =>
                  taskStore.editTask(index, "title", e.target.value)
                }
              />
              <textarea
                value={task.description}
                className="taskInput"
                onChange={(e) =>
                  taskStore.editTask(index, "description", e.target.value)
                }
              />
              <button onClick={taskStore.deleteTask.bind(this, index)}>
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <form
            className="border flex text-blue-400 items-center justify-between gap-3 p-4 rounded-lg"
            onSubmit={handleSubmit((data: task) => {
              reset();
              taskStore.addTask({
                ...data,
                status: taskStatus.NotDone,
                id: uuidv4(),
              });
            })}
          >
            <input
              placeholder="Task Title..."
              className="addTasksInput"
              type="text"
              {...register("title", { required: true })}
            />
            <textarea
              placeholder="Description..."
              className="addTasksInput"
              {...register("description")}
            ></textarea>
            <input className="addTasksInput " type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
