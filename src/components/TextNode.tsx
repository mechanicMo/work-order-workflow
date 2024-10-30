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
import { TextNode as TextNodeType } from "../App";

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
          borderRadius: 10,
          outline: selected ? "2px solid blue" : "",
        }}
      >
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
              .map(({ data: { text } }) => "`" + text + "`")
              .join(", ")}{" "}
            to proceed
          </span>
        )}

        <input
          onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
          value={data.text}
          style={{ display: "block", marginTop: "5px" }}
        />

        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    );
  }
);
