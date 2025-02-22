import { List as VirtualizedList } from 'react-virtualized';
import { Alert } from '@mui/material';
import { useGithubUsers } from '@features/users/hooks';
import { UserCard } from '@features/users/components/UserCard';
import { LoadingState } from '@shared/components/LoadingState';
import { ErrorMessage } from '@shared/components/ErrorMessage';

interface UserListProps {
  username: string;
}

export function UserList({ username }: UserListProps) {
  const { 
    users, 
    fetchNextPage, 
    hasNextPage, 
    isLoading, 
    isError, 
    error, 
    isEmpty 
  } = useGithubUsers(username);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorMessage error={error as Error} />;
  }

  if (isEmpty) {
    return <Alert severity="info">Brak wyników wyszukiwania</Alert>;
  }

  return (
    <VirtualizedList
      height={600}
      width={window.innerWidth}
      rowHeight={100}
      rowCount={users.length}
      rowRenderer={({ index, key, style }) => (
        <div key={key} style={style}>
          <UserCard user={users[index]} />
        </div>
      )}
      onEndReached={fetchNextPage}
      hasMore={!!hasNextPage}
    />
  );
} 