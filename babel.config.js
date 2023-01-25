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
            '@app/config': './app/config',
            '@app/context': './app/context',
            '@app/constants': './app/constants',
            '@app/layout': './app/layout',
            '@navigators': './src/navigators',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@components': './src/components',
            '@app/utils': './app/utils',
          },
        },
      ],
      'nativewind/babel',
    ],
  };
};
