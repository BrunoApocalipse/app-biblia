module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@context": "./src/context",
            "@models": "./src/models",
            "@utils": "./src/utils"            
          }
        }
      ],
      "react-native-reanimated/plugin"
    ]
  }
}