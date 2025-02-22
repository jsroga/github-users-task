import { memo } from 'react';
import { Card, CardContent, Avatar, Typography, Link, Box } from '@mui/material';
import type { GithubUser } from '@features/users/types';

interface UserCardProps {
  user: GithubUser;
}

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
  return (
    <Card 
      sx={{ 
        mb: 1,
        mx: 1,
        transition: 'all 0.3s ease-in-out',
        transform: 'translateY(0)',
        backgroundColor: 'background.paper',
        '&:hover': { 
          boxShadow: (theme) => `0 4px 12px ${theme.palette.action.hover}`,
          transform: 'translateY(-2px)',
          '& .MuiAvatar-root': {
            transform: 'scale(1.05)',
          },
          '& .MuiTypography-root': {
            color: 'primary.main',
          }
        }
      }}
      data-testid={`user-card-${user.id}`}
      elevation={1}
    >
      <CardContent 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          py: 1.5,
          px: 2,
          '&:last-child': { pb: 1.5 }
        }}
      >
        <Avatar
          src={user.avatar_url}
          alt={`Avatar of ${user.login}`}
          sx={{ 
            width: 48,
            height: 48,
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Link 
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              display: 'block',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                textDecoration: 'none'
              }
            }}
            aria-label={`Visit ${user.login}'s GitHub profile`}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                transition: 'color 0.3s ease-in-out',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user.login}
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}); 
