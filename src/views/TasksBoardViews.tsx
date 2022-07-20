import React, { FormEvent, useState } from "react";
import styles from "../styles/taskBoard.module.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TasksList from "../components/taskComponents/TasksList";
import InputField from "../components/taskComponents/InputField";
import { Task } from "type";

const TasksBoardViews = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [inprogress, setInprogress] = useState<Array<Task>>([]);
  const [reviews, setReviews] = useState<Array<Task>>([]);
  const [verfy, setVerify] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Array<Task>>([]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { task, id: Date.now(), isDone: false }]);
      setTask("");
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add,
      active = tasks,
      complete = completedTasks;

    // Source Logic
    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    // Destination Logic
    if (destination.droppableId === "TaskList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    setTasks(active);
    console.log(complete);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={styles.App}>
        <span className={styles.heading}>Virtuoz</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAddTask} />
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default TasksBoardViews;
