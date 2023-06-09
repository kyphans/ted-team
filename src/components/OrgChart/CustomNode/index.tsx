import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data } :any) {
  // console.log('data', data);
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 w-[200px]">
      <div className="flex flex-col items-center">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">{data.emoji}</div>
        <div className="flex text-center">
          <div className="ml-2">
            <div className="text-lg font-bold">{data.lastName + ' ' + data.firstName}</div>
            <div className="text-gray-500">{data.department} - {data.role}</div>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="!bg-teal-500" />
      {data.role !=="Member" && <Handle type="source" position={Position.Bottom} className="!bg-teal-500" />}
    </div>
  );
}

export default memo(CustomNode);
