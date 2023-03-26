// import NodeUser from './components/NodeUser';
import { Node, Edge } from 'reactflow';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
// export const nodeTypes = { textUpdater: NodeUser };

// export const initialNodes: Node[] = [
//   {
//     id: '1',
//     data: { label: 'node 1' },
//     position,
//   },
//   {
//     id: '2',
//     data: { label: 'node 2' },
//     position,
//   },
//   {
//     id: '2a',
//     data: { label: 'node 2a' },
//     position,
//   },
//   {
//     id: '2b',
//     data: { label: 'node 2b' },
//     position,
//   },
//   {
//     id: '2c',
//     data: { label: 'node 2c' },
//     position,
//   },
//   {
//     id: '2d',
//     data: { label: 'node 2d' },
//     position,
//   },
//   {
//     id: '3',
//     data: { label: 'node 3' },
//     position,
//   },
//   {
//     id: '3a',
//     data: { label: 'node 3a' },
//     position,
//   },
//   {
//     id: '3b',
//     data: { label: 'node 3b' },
//     position,
//   },
//   {
//     id: '3c',
//     data: { label: 'node 3c' },
//     position,
//   },
// ];

// export const initialEdges: Edge[] = [
//   { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
//   { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
//   { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
//   { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
//   { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
//   { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
//   { id: 'e33a', source: '3', target: '3a', type: edgeType, animated: true },
//   { id: 'e33b', source: '3', target: '3b', type: edgeType, animated: true },
//   { id: 'e33c', source: '3', target: '3c', type: edgeType, animated: true },
// ];

const numberOfNodes: number = 30;
// Tính toán số lượng node con của 1 node cha.
const numberOfChildNodes: number = Math.floor((numberOfNodes - 1) / 3);

let initialNodes: Node[] = [
  {
    id: '0',
    data: { label: 'node 0' },
    position,
  },
  {
    id: '1',
    data: { label: 'node 1' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
];

let initialEdges: Edge[] = [];

// Thêm vào 3 node con của node gốc.
for (let i = 1; i <= 3; i++) {
  const nodeId = `1${i}`;
  initialNodes.push({
    id: nodeId,
    data: { label: `node ${nodeId}` },
    position,
  });

  // Thêm edge từ node cha đến node con mới.
  initialEdges.push({
    id: `e1${nodeId}`,
    source: '1',
    target: nodeId,
    type: edgeType,
    animated: true,
  });
}

// Thêm các node con của node 2.
for (let i = 1; i <= numberOfChildNodes; i++) {
  const nodeId = `2${i}`;
  initialNodes.push({
    id: nodeId,
    data: { label: `node ${nodeId}` },
    position,
  });

  // Thêm edge từ node 2 đến node con mới.
  initialEdges.push({
    id: `e2${nodeId}`,
    source: '2',
    target: nodeId,
    type: edgeType,
    animated: true,
  });
}

// Thêm các node con của node 3.
for (let i = 1; i <= numberOfChildNodes; i++) {
  const nodeId = `3${i}`;
  initialNodes.push({
    id: nodeId,
    data: { label: `node ${nodeId}` },
    position,
  });

  // Thêm edge từ node 3 đến node con mới.
  initialEdges.push({
    id: `e3${nodeId}`,
    source: '3',
    target: nodeId,
    type: edgeType,
    animated: true,
  });
}

initialEdges.push({
  id: `e01`,
  source: '0',
  target: '1',
  type: edgeType,
  animated: true,
});
initialEdges.push({
  id: `e02`,
  source: '0',
  target: '2',
  type: edgeType,
  animated: true,
});
initialEdges.push({
  id: `e03`,
  source: '0',
  target: '3',
  type: edgeType,
  animated: true,
});
// console.log('initialNodes', initialNodes);
// console.log('initialEdges', initialEdges);

export { initialEdges, initialNodes };
