import { useRef } from "react";
import styles from "../../styles/taskBoard.module.css";

interface props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ task, setTask, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={styles.input}
      onSubmit={(e) => {
        handleAdd(e);
        return inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={task}
        ref={inputRef}
        onChange={(e) => setTask(e.target.value)}
        className={styles.input__box}
      />
      <button type="submit" className={styles.input_submit}>
        Add
      </button>
    </form>
  );
};

export default InputField;
