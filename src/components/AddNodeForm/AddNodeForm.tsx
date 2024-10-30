import styles from "./form.module.css";

interface Props {
  addNewNode: () => void;
  nodeId: number;
}

export const AddNodeForm: React.FC<Props> = ({ addNewNode, nodeId }) => {
  return (
    <form className={styles.form}>
      <label htmlFor="nodeLabel" className={styles.label}>
        Label (optional)
      </label>
      <input
        type="text"
        id="nodeLabel"
        name="nodeLabel"
        className={styles.input}
        placeholder={`${nodeId + 1}`}
        aria-label="Node label"
      />

      <button type="button" className={styles.button} onClick={addNewNode}>
        Click to add a new node
      </button>
    </form>
  );
};
