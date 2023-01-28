module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-typescript', 'babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@': './src',
            '@navigators': './src/navigators',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@components': './src/components',
          },
        },
      ],
      'nativewind/babel',
    ],
  };
};
