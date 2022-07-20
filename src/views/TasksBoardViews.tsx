import React, { FormEvent, useState } from "react";
import styles from "../styles/taskBoard.module.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TasksList from "../components/taskComponents/TasksList";
import InputField from "../components/taskComponents/InputField";
import { Task, TaskStatus } from "../type";

const TasksBoardViews = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [inprogress, setInprogress] = useState<Array<Task>>([]);
  const [reviews, setReviews] = useState<Array<Task>>([]);
  const [verify, setVerify] = useState<Array<Task>>([]);
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
      complete = completedTasks,
      review = reviews,
      verified = verify,
      progress = inprogress;

    if (source.droppableId === "Task") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "In progress") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else if (source.droppableId === "Review") {
      add = review[source.index];
      review.splice(source.index, 1);
    } else if (source.droppableId === "verified") {
      add = verified[source.index];
      verified.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    // Destination Logic
    if (destination.droppableId === "Task") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "Review") {
      review.splice(destination.index, 0, add);
    } else if (destination.droppableId === "In progress") {
      progress.splice(destination.index, 0, add);
    } else if (destination.droppableId === "verified") {
      verified.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setInprogress(progress);
    setCompletedTasks(complete);
    setTasks(active);
    setReviews(review);
    setVerify(verified);
  };
  console.log(tasks, inprogress, reviews, verify, completedTasks);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={styles.App}>
        <span className={styles.heading}>Virtuoz</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAddTask} />
        <div className={styles.container}>
          <TasksList
            tasks={tasks}
            setTasks={setTasks}
            status={TaskStatus.task as string}
          />
          <TasksList
            tasks={inprogress}
            setTasks={setInprogress}
            status={TaskStatus.inprogress as string}
          />
          <TasksList
            tasks={reviews}
            setTasks={setReviews}
            status={TaskStatus.review}
          />
          <TasksList
            tasks={verify}
            setTasks={setVerify}
            status={TaskStatus.verified as string}
          />
          <TasksList
            tasks={completedTasks}
            setTasks={setCompletedTasks}
            status={TaskStatus.completed as string}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default TasksBoardViews;
