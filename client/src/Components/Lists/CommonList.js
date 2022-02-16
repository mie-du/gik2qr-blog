import React from 'react';

export default function CommonList({
  items,
  resourceName,
  itemComponent: ItemComponent
}) {
  return (
    <>
      {items &&
        items.map((item, i) => {
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
