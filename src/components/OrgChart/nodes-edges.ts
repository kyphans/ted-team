// import NodeUser from './components/NodeUser';
import { Node, Edge } from 'reactflow';
import { getDepartmentLead, getDepartmentMembers } from './parseData';
import data from '../../common/fakeData/orgChart.json';


// console.log('MB:', getDepartmentMembers(data, 'MB'));
// console.log('PD:', getDepartmentMembers(data, 'PD'));
// console.log('DD:', getDepartmentMembers(data, 'DD'));
// console.log('PRD:', getDepartmentMembers(data, 'PRD'));

// console.log('Lead PRD:', getDepartmentLead(data, 'PRD'));


const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
// export const nodeTypes = { textUpdater: NodeUser };

let initialNodes: Node[] = [
  ...convertData(getDepartmentMembers(data, 'MB')),
  ...convertData(getDepartmentLead(data, 'PD')),
  ...convertData(getDepartmentLead(data, 'DD')),
  ...convertData(getDepartmentLead(data, 'PRD')),
];

function convertData(data:any[]) {
  const result:any[] = data.map((e)=>{
    return {
      id: e.mssv,
      type: 'custom',
      data: e,
      position,
    }
  });
  return result
};

console.log('initialNodesA', initialNodes);

let initialEdges: Edge[] = [];

function addNodeChild(initialNodes:Node[], initialEdges:Edge[], data:any[], department:string) {
  // Thêm vào node con của node PRD.
  for (let i = 0; i < getDepartmentMembers(data, department).length; i++) {
    initialNodes.push({
      id: getDepartmentMembers(data, department)[i].mssv,
      type: 'custom',
      data: getDepartmentMembers(data, department)[i],
      position,
    });

    // Thêm edge từ node cha đến node con mới.
    initialEdges.push({
      id: `e${getDepartmentLead(data, department)[0].mssv}-${getDepartmentMembers(data, department)[i].mssv}`,
      source: `${getDepartmentLead(data, department)[0].mssv}`,
      target: `${getDepartmentMembers(data, department)[i].mssv}`,
      type: edgeType,
      animated: true,
    });
  }
}

addNodeChild(initialNodes, initialEdges, data, "PRD");
addNodeChild(initialNodes, initialEdges, data, "PD");
addNodeChild(initialNodes, initialEdges, data, "DD");

console.log('initialNodesA', initialNodes);
console.log('initialEdgesA', initialEdges);

initialEdges.push({
  id: `e10000-10001`,
  source: '10000',
  target: '10001',
  type: edgeType,
  animated: true,
});

// Connect MB to PRD
initialEdges.push({
  id: `e10001-${getDepartmentLead(data, 'PRD')[0].mssv}`,
  source: '10001',
  target: `${ getDepartmentLead(data, 'PRD')[0].mssv}`,
  type: edgeType,
  animated: true,
});

// Connect MB to PD
initialEdges.push({
  id: `e10001-${getDepartmentLead(data, 'PD')[0].mssv}`,
  source: '10001',
  target: `${getDepartmentLead(data, 'PD')[0].mssv}`,
  type: edgeType,
  animated: true,
});

// Connect MB to DD
initialEdges.push({
  id: `e10001-${getDepartmentLead(data, 'DD')[0].mssv}`,
  source: '10001',
  target: `${getDepartmentLead(data, 'DD')[0].mssv}`,
  type: edgeType,
  animated: true,
});

export { initialEdges, initialNodes };
