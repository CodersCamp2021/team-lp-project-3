import { useState } from 'react';
import {
  createStyles,
  MantineProvider,
  AppShell,
  Header,
  Navbar,
  Burger,
  MediaQuery,
  Anchor,
} from '@mantine/core';

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
}));

function Demo() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        fixed
        navbarOffsetBreakpoint="sm"
        header={
          <Header height={50}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
            <div className={classes.links}>
              <Anchor>Home</Anchor>
              <Anchor>Features</Anchor>
              <Anchor>Pricing</Anchor>
            </div>
          </Header>
        }
        navbar={
          <Navbar
            className={classes.navbar}
            width={{ base: '100%', sm: 0 }}
            hidden={!opened}
          >
            <Anchor>Home</Anchor>
            <Anchor>Features</Anchor>
            <Anchor>Pricing</Anchor>
          </Navbar>
        }
      >
        App
      </AppShell>
    </MantineProvider>
  );
}

export default Demo;
