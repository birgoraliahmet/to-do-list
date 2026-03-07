/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#6366f1'; // Indigo 500
const tintColorDark = '#818cf8'; // Indigo 400

export const Colors = {
  light: {
    text: '#1e293b', // Slate 800
    background: '#f8fafc', // Slate 50
    card: '#ffffff',
    tint: tintColorLight,
    icon: '#64748b', // Slate 500
    tabIconDefault: '#94a3b8', // Slate 400
    tabIconSelected: tintColorLight,
    border: '#e2e8f0', // Slate 200
    success: '#10b981', // Emerald 500
    danger: '#ef4444', // Red 500
  },
  dark: {
    text: '#f1f5f9', // Slate 100
    background: '#0f172a', // Slate 900
    card: '#1e293b', // Slate 800
    tint: tintColorDark,
    icon: '#94a3b8', // Slate 400
    tabIconDefault: '#64748b', // Slate 500
    tabIconSelected: tintColorDark,
    border: '#334155', // Slate 700
    success: '#34d399', // Emerald 400
    danger: '#f87171', // Red 400
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
