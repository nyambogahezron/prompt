// Manage the theme color of the app
import { useGlobalContext } from '@/context/GlobalProvider';
import { Colors } from '@/constants/Colors';

type ThemeProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ThemeProps,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useGlobalContext();
  const colorFromProps = props[theme as keyof ThemeProps];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme as 'light' | 'dark'][colorName];
  }
}
