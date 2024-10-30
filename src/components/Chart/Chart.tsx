import {
  ReactFlow,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
} from "@xyflow/react";
import type { EdgeType, TextNode as TextNodeType } from "../../App";
import { TextNode } from "../TextNode";

const nodeTypes = {
  text: TextNode,
};

interface Props {
  nodes: TextNodeType[];
  onNodesChange: OnNodesChange<TextNodeType>;
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
        nodeTypes={nodeTypes}
      />
    </div>
  );
};
