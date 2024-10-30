import {
  ReactFlow,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type ReactFlowInstance,
  useReactFlow,
} from "@xyflow/react";
import type { EdgeType, TextNode as TextNodeType } from "../../App";
import { TextNode } from "../TextNode/TextNode";
import { useCallback, useEffect, useState } from "react";

const storageKey = "hadrian-flow";

const nodeTypes = {
  text: TextNode,
};

interface Props {
  nodes: TextNodeType[];
  setNodes: React.Dispatch<React.SetStateAction<TextNodeType[]>>;
  onNodesChange: OnNodesChange<TextNodeType>;
  edges: EdgeType[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeType[]>>;
  onEdgesChange: OnEdgesChange<EdgeType>;
  onConnect: OnConnect;
}

export const Chart: React.FC<Props> = ({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
  onConnect,
}) => {
  const [rfInstance, setRfInstance] =
    useState<ReactFlowInstance<TextNodeType, EdgeType>>();
  const { setViewport } = useReactFlow();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(storageKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const storageItem = localStorage.getItem(storageKey);
      if (storageItem) {
        const flow = JSON.parse(storageItem);

        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      }
    };
    restoreFlow();
  }, [setEdges, setNodes, setViewport]);

  useEffect(() => {
    onSave();
  }, [edges, nodes, onSave]);

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
        onInit={(rf) => {
          setRfInstance(rf);
          onRestore();
        }}
      />
    </div>
  );
};
