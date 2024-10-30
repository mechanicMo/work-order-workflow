import { useCallback } from "react";
import {
  addEdge,
  MarkerType,
  useEdgesState,
  useNodesState,
  type OnConnect,
  Node,
} from "@xyflow/react";

import { Chart } from "./components/Chart";
import { AddNodeForm } from "./components/AddNodeForm/AddNodeForm";

import "./App.css";
import "@xyflow/react/dist/style.css";

export type TextNode = Node<{ text: string }, "text">;
const initialNodes: TextNode[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "text",
    data: { text: "1" },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    type: "text",
    data: { text: "2" },
  },
  {
    id: "3",
    position: { x: 0, y: 200 },
    type: "text",
    data: { text: "3" },
  },
];

export type EdgeType = {
  id: string;
  source: string;
  target: string;
  markerend: {
    type: MarkerType;
  };
};
const initialEdges: EdgeType[] = [
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

let nodeId = 3; // last id from initialNodes
const getNextId = () => {
  nodeId++;
  return `${nodeId}`;
};

const createNewNode = (): TextNode => {
  const id = getNextId();

  return {
    id,
    position: { x: 0, y: 0 },
    type: "text",
    data: { text: id },
  };
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = useCallback(() => {
    const node = createNewNode();
    setNodes((nds) => [...nds, node]);
  }, [setNodes]);

  return (
    <>
      <AddNodeForm addNewNode={addNewNode} nodeId={nodeId} />

      <Chart {...{ nodes, onNodesChange, edges, onEdgesChange, onConnect }} />
    </>
  );
}

export default App;
