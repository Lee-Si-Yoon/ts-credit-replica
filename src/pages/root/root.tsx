import React from 'react';
import { getMe } from '../remotes';

export function Root() {
  const self = getMe();

  React.useEffect(() => {
    self.then((data) => {
      console.log(data);
    });
  }, [self]);

  return <div>root</div>;
}
