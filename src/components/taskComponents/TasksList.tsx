import { Droppable } from "react-beautiful-dnd";
import { Task } from "type";
import styles from "../../styles/taskBoard.module.css";
import SingleTask from "./SingleTask";

interface TasksListProps {
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  completedTasks: Array<Task>;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className={styles.container}>
      <Droppable droppableId="TaskList">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.tasks} ${
              snapshot.isDraggingOver ? styles.dragactive : ""
            }`}
          >
            <span className={styles.tasks__heading}>Tasks</span>
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
      <Droppable droppableId="TaskComplete">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.tasks} ${
              snapshot.isDraggingOver ? styles.dragcomplete : styles.completed
            }`}
          >
            <span className={styles.tasks__heading}>Tasks completed</span>
            {completedTasks?.map((task, index) => (
              <SingleTask
                tasks={completedTasks}
                task={task}
                key={task.id}
                setTasks={setCompletedTasks}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TasksList;
