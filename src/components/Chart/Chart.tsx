import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  MarkerType,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";

import "reactflow/dist/style.css";

let nodeId = 0;
const getNextId = () => {
  nodeId++;
  return nodeId.toString();
};

const initialNodes = [
  {
    id: getNextId(),
    position: { x: 0, y: 0 },
    data: { label: "1" },
  },
  {
    id: getNextId(),
    position: { x: 0, y: 100 },
    data: { label: "2" },
  },
  {
    id: getNextId(),
    position: { x: 0, y: 200 },
    data: { label: "3" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const createNewNode = (): Node => {
  const id = getNextId();

  return {
    id,
    position: { x: 0, y: 0 },
    data: { label: id },
  };
};

export const Chart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = () => {
    const node = createNewNode();
    setNodes((nds) => [...nds, node]);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={addNewNode}>click to add a new node</button>

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
