import { memo, useMemo } from "react";
import {
  Position,
  Handle,
  useReactFlow,
  type NodeProps,
  getIncomers,
  useNodes,
  useEdges,
} from "@xyflow/react";
import { TextNode as TextNodeType } from "../../App";

import styles from "./node.module.css";

export const TextNode = memo(
  ({ id, data, selected }: NodeProps<TextNodeType>) => {
    const { updateNodeData } = useReactFlow();
    const nodes = useNodes<TextNodeType>();
    const edges = useEdges();
    const incomers = useMemo(
      () => getIncomers({ id }, nodes, edges),
      [edges, id, nodes]
    );

    const incompleteIncomers = incomers.filter(
      ({ data: { completed } }) => !completed
    );
    const canDoWork = incompleteIncomers.length === 0;
    const completed = data.completed;

    return (
      <div
        style={{
          background: completed ? "lightgreen" : canDoWork ? "orange" : "pink",
          color: "#222",
          padding: 10,
          fontSize: 12,
          borderRadius: 6,
          outline: selected ? "2px solid blue" : "",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          {completed ? (
            <span>completed!</span>
          ) : canDoWork ? (
            <button onClick={() => updateNodeData(id, { completed: true })}>
              mark as complete
            </button>
          ) : (
            <span>
              complete{" "}
              {incompleteIncomers
                .map(({ data: { name } }) => "`" + name + "`")
                .join(", ")}{" "}
              to proceed
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            onChange={(evt) => updateNodeData(id, { name: evt.target.value })}
            value={data.name}
            style={{ display: "block", marginTop: "5px" }}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="quantity">Quantity</label>
          <input
            name="quantity"
            type="number"
            onChange={(evt) =>
              updateNodeData(id, { quantity: evt.target.value })
            }
            value={data.quantity}
            style={{ display: "block", marginTop: "5px" }}
          />
        </div>

        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    );
  }
);
