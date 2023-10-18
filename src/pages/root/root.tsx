import { useQuery } from 'react-query';
import Spacing from '../../components/spacing';
import { getMe } from '../remotes';

export function Root() {
  const { data } = useQuery('getMe', getMe);

  return (
    <>
      <Spacing size={20} />
      {data?.name ?? '-'}
    </>
  );
}
