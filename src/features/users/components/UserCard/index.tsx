import { memo } from 'react';
import { Card, CardContent, Avatar, Typography, Link, Box } from '@mui/material';
import type { GithubUser } from '@features/users/types';

interface UserCardProps {
  user: GithubUser;
}

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
  return (
    <Card 
      sx={{ mb: 2, '&:hover': { boxShadow: 6 } }}
      data-testid={`user-card-${user.id}`}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={user.avatar_url}
          alt={`Avatar of ${user.login}`}
          sx={{ width: 60, height: 60 }}
        />
        <Box>
          <Link 
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            aria-label={`Visit ${user.login}'s GitHub profile`}
          >
            <Typography variant="h6">{user.login}</Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}); 
