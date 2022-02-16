import React, { useEffect, useState } from 'react';
import ResourceModel from '../../models/ResourceModel';

export default function ResourceList({
  path,
  resourceName,
  itemComponent: ItemComponent
}) {
  const [resource, setResource] = useState([]);
  useEffect(() => {
    const resourceModel = new ResourceModel(path);
    resourceModel.getAll().then((result) => {
      setResource(result);
    });
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
