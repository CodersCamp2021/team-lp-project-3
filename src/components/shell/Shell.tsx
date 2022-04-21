import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { createStyles, AppShell, Text } from '@mantine/core';
import { useGames } from '../../utils/useGames';

import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';

import Home from '../Home/Home';
import SignIn from '../sign-in/SignIn';
import SignUp from '../sign-up/SignUp';

const useStyles = createStyles((theme) => ({
  navbar: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    [theme.fn.smallerThan('sm')]: {
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
}));

const endpoints = [
  {
    name: 'Games',
    endpoint: '/games',
  },
  {
    name: 'Sign in',
    endpoint: '/login',
  },
  {
    name: 'Sign up',
    endpoint: '/register',
  },
];

const Shell = () => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const { data, status } = useGames();

  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="sm"
      padding={0}
      sx={{ border: 'none', overflow: 'hidden' }}
      navbar={
        <AppNavbar
          opened={opened}
          setOpened={setOpened}
          classes={classes}
          endpoints={endpoints}
        ></AppNavbar>
      }
      header={
        <AppHeader
          opened={opened}
          classes={classes}
          setOpenedCallback={setOpened}
        ></AppHeader>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/games"
          element={
            <div>
              <>
                {status === 'success' &&
                  data.map((game) => <Text key={game._id}>{game.title}</Text>)}
              </>
            </div>
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </AppShell>
  );
};

export default Shell;
