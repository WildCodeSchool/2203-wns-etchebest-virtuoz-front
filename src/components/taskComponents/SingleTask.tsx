import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import styles from "../../styles/taskBoard.module.css";
import { Task } from "src/type";

const SingleTask: React.FC<{
  index: number;
  task: Task;
  tasks: Array<Task>;
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
}> = ({ task, tasks, setTasks, index }) => {
  const [edit, setEdit] = useState(false);
  const [editTask, setEditTask] = useState(task.task);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <Draggable
      draggableId={task.id.toString()}
      index={index}
      key={task.id.toString()}
    >
      {(provided, snapshot) => (
        <form
          className={`${styles.tasks__single} ${
            snapshot.isDragging ? styles.drag : ""
          }`}
          onSubmit={(e) => handleEdit(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className={styles.tasks__single__text}
              ref={inputRef}
            />
          ) : task.isDone ? (
            <s className={styles.tasks__single__text}>{task.task}</s>
          ) : (
            <span className={styles.tasks__single__text}>{task.task}</span>
          )}
          <div>
            <span
              className={styles.icon}
              onClick={() => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className={styles.icon} onClick={() => handleDelete(task.id)}>
              <AiFillDelete />
            </span>
            <span className={styles.icon} onClick={() => handleDone(task.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
