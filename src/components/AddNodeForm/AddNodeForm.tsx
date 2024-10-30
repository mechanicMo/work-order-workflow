import styles from "./form.module.css";

interface Props {
  addNewNode: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AddNodeForm: React.FC<Props> = ({ addNewNode }) => {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        addNewNode(e);
      }}
    >
      <label htmlFor="nodeLabel" className={styles.label}>
        Label (optional)
      </label>
      <input
        type="text"
        id="nodeLabel"
        name="nodeLabel"
        className={styles.input}
        placeholder="custom label"
        aria-label="Node label"
      />

      <button type="submit" className={styles.button}>
        Click to add a new node
      </button>
    </form>
  );
};
