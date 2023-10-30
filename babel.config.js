module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.json', '.ios.js', '.android.js'],
          alias: {
            assets: './src/assets',
            constants: './src/constants',
            components: './src/components',
            config: './src/config/index',
            hooks: './src/hooks',
            theme: './src/theme',
            utils: './src/utils',
            routes: './src/routes',
            screens: './src/screens',
            state: './src/state',
            types: './src/types',
          },
        },
      ],
    ],
  }
}
