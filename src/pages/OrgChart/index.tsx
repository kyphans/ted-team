import React from 'react';
import OrganizationalChart from '../../components/OrgChart';
import { initialEdges, initialNodes } from '../../components/OrgChart/nodes-edges';

function OrgChart() {
  return (
    <>
      <OrganizationalChart
        className="h-[calc(100vh_-_150px)]"
        initialNodes={initialNodes}
        initialEdges={initialEdges}
      />
    </>
  );
}

export default React.memo(OrgChart);
