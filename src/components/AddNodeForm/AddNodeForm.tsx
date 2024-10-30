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
      <label htmlFor="name" className={styles.label}>
        Name
      </label>
      <input type="text" id="name" name="name" className={styles.input} />

      <label htmlFor="quantity" className={styles.label}>
        Quantity
      </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Click to add a new node
      </button>
    </form>
  );
};
