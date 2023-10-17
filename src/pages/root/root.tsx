import { useQuery } from 'react-query';
import { getMe } from '../remotes';

export function Root() {
  const { data } = useQuery('getMe', getMe);

  return <div>{data?.name ?? '-'}</div>;
}
