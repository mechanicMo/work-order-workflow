import {
  ReactFlow,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
} from "@xyflow/react";
import type { EdgeType, NodeType } from "../../App";

interface Props {
  nodes: NodeType[];
  onNodesChange: OnNodesChange<NodeType>;
  edges: EdgeType[];
  onEdgesChange: OnEdgesChange<EdgeType>;
  onConnect: OnConnect;
}

export const Chart: React.FC<Props> = ({
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  onConnect,
}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
};
