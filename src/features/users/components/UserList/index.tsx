import { List as VirtualizedList, AutoSizer } from 'react-virtualized';
import { Alert, Box, useTheme } from '@mui/material';
import { useGithubUsers } from '@features/users/hooks';
import { UserCard } from '@features/users/components/UserCard';
import { LoadingState } from '@shared/components/LoadingState';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import { useEffect, useState } from 'react';

interface UserListProps {
  username: string;
}

export function UserList({ username }: UserListProps) {
  const theme = useTheme();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  
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
    <Box 
      ref={setContainerRef}
      sx={{ 
        width: '100%',
        maxWidth: theme.breakpoints.values.md,
        margin: '0 auto',
        height: 'calc(100vh - 200px)',
        maxHeight: '600px',
        '& .ReactVirtualized__List::-webkit-scrollbar': {
          width: '8px',
          backgroundColor: 'transparent'
        },
        '& .ReactVirtualized__List::-webkit-scrollbar-thumb': {
          backgroundColor: (theme) => theme.palette.grey[300],
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.grey[400]
          }
        },
        '& .ReactVirtualized__List': {
          scrollbarWidth: 'thin',
          scrollbarColor: (theme) => `${theme.palette.grey[300]} transparent`
        }
      }}
    >
      <AutoSizer>
        {({ width, height }) => (
          <VirtualizedList
            height={height}
            width={width}
            rowHeight={80}
            rowCount={users.length}
            overscanRowCount={5}
            rowRenderer={({ index, key, style }) => (
              <div key={key} style={{ ...style, paddingRight: '8px' }}>
                <UserCard user={users[index]} />
              </div>
            )}
            onEndReached={fetchNextPage}
            hasMore={!!hasNextPage}
          />
        )}
      </AutoSizer>
    </Box>
  );
} 