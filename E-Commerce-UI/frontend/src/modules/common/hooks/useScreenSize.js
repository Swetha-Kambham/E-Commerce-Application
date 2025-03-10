import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const MOBILE_SCREEN_SIZE = 'sm';

export const useIsMobile = () => {
  const theme = useTheme();

  const screen = { isMobile: false };

  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    screen.isMobile = true;
  }

  return screen;
};

export const useScreenSize = () => {
  const theme = useTheme();

  const screen = {};

  if (useMediaQuery(theme.breakpoints.down('xs'))) {
    screen.size = { min: 0, max: 599 };
    screen.label = 'extra-small';
  }

  if (useMediaQuery(theme.breakpoints.between('xs', 'sm'))) {
    screen.size = { min: 600, max: 960 };
    screen.label = 'small';
  }

  if (useMediaQuery(theme.breakpoints.between('sm', 'md'))) {
    screen.size = { min: 960, max: 1280 };
    screen.label = 'medium';
  }

  if (useMediaQuery(theme.breakpoints.between('md', 'lg'))) {
    screen.size = { min: 1280, max: 1920 };
    screen.label = 'large';
  }

  if (useMediaQuery(theme.breakpoints.up('lg'))) {
    screen.size = { min: 1920 };
    screen.label = 'extra-large';
  }

  return screen;
};

export const useColumnCapacity = () => {
  const theme = useTheme();

  const screen = {};

  if (useMediaQuery(theme.breakpoints.down(400))) {
    screen.size = { min: 0, max: 399 };
    screen.capacity = 1;
  }

  if (useMediaQuery(theme.breakpoints.between(400, 800))) {
    screen.size = { min: 400, max: 799 };
    screen.capacity = 2;
  }

  if (useMediaQuery(theme.breakpoints.between(800, 1200))) {
    screen.size = { min: 799, max: 1199 };
    screen.capacity = 3;
  }

  if (useMediaQuery(theme.breakpoints.between(1200, 1600))) {
    screen.size = { min: 1200, max: 1599 };
    screen.capacity = 4;
  }

  if (useMediaQuery(theme.breakpoints.between(1600, 2000))) {
    screen.size = { min: 1600, max: 1999 };
    screen.capacity = 5;
  }

  if (useMediaQuery(theme.breakpoints.up(2000))) {
    screen.size = { min: 2000 };
    screen.capacity = 6;
  }

  return screen;
};

export const useIsScreenDown = (size) => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down(size));
};

export const useIsScreenBetween = (low, high) => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down(low, high));
};

export const useIsScreenUp = (size) => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.up(size));
};
