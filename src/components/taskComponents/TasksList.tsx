import { Droppable } from "react-beautiful-dnd";
import { Task, TaskStatus } from "../../type";
import styles from "../../styles/taskBoard.module.css";
import SingleTask from "./SingleTask";

interface TasksListProps {
  tasks: Array<Task>;
  status: string;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
}

const TasksList: React.FC<TasksListProps> = ({ tasks, setTasks, status }) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${styles.tasks} ${
            snapshot.isDraggingOver ? styles.dragactive : ""
          }`}
        >
          <span className={styles.tasks__heading}>{status}</span>
          {tasks?.map((task, index) => (
            <SingleTask
              tasks={tasks}
              task={task}
              key={task.id}
              setTasks={setTasks}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TasksList;
