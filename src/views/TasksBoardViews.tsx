import React, { FormEvent, useState } from "react";
import styles from "../styles/taskBoard.module.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TasksList from "../components/taskComponents/TasksList";
import InputField from "../components/taskComponents/InputField";
import { Task, TaskStatus } from "../type";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

const CREATE_TASK = gql`
  mutation CreateTicket($title: String, $content: String, $status: String) {
    createTicket(title: $title, content: $content, status: $status) {
      id
      title
      content
      status
    }
  }
`;
const GET_TASKS = gql`
  query GetAllTickets {
    getAllTickets {
      id
      title
      content
      createdAt
      status
    }
  }
`;

const TasksBoardViews = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    content: "",
    createdAt: "",
  });
  const getTasks = useQuery(GET_TASKS);
  const [createTicket] = useMutation(CREATE_TASK);

  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [inprogress, setInprogress] = useState<Array<Task>>([]);
  const [reviews, setReviews] = useState<Array<Task>>([]);
  const [toVerify, setToVerify] = useState<Array<Task>>([]);
  const [completedTasks, setCompletedTasks] = useState<Array<Task>>([]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    createTicket({
      variables: {
        title: task.title,
        content: task.content,
        createdAt: Date.now(),
        status: TaskStatus.task,
      },
    });
    setTask({ title: "", content: "", createdAt: "" });
    setTasks([...tasks, task]);
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
      verified = toVerify,
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
    } else if (source.droppableId === "To verify") {
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
    } else if (destination.droppableId === "To verify") {
      verified.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setInprogress(progress);
    setCompletedTasks(complete);
    setTasks(active);
    setReviews(review);
    setToVerify(verified);
  };
  const setData = (data: any) => {
    setTasks(data.getAllTickets);
  };
  useEffect(() => {
    if (getTasks.data) {
      setData(getTasks.data);
    }
  }, [getTasks.data]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={styles.App}>
        <form onSubmit={handleAddTask}>
          <div className="form-group mb-3">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label>Content</label>
            <input
              type="text"
              name="detail"
              className="form-control"
              placeholder="Enter Detail"
              value={task.content}
              onChange={(e) => setTask({ ...task, content: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {/* <InputField task={task} setTask={setTask} handleAdd={handleAddTask} /> */}
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
            tasks={toVerify}
            setTasks={setToVerify}
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
