import React, { useEffect, useState } from 'react';
import ResourceModel from '../models/ResourceModel';

export default function ResourceList({
  modelPath,
  resourceName,
  itemComponent: ItemComponent
}) {
  const [resource, setResource] = useState([]);
  const resourceModel = new ResourceModel(modelPath);

  useEffect(() => {
    resourceModel.getAll().then((result) => setResource(result));
  }, []);

  return (
    <>
      {resource &&
        resource.map((item, i) => {
          return (
            <ItemComponent
              key={`${resourceName}_${i}`}
              {...{ [resourceName]: item }}
            />
          );
        })}
    </>
  );
}
