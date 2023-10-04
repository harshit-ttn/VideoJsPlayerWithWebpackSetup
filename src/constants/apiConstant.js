let envKey = {};

export const envSetKeysMeth = () => {
  switch (process.env.TARGET_ENV) {
    case "preprod":
      envKey = {
        baseUrl: "https://subs-api-demo.ottplay.com/",
      };
      break;
    case "production":
      envKey = {
        baseUrl: "https://api2.ottplay.com/",
      };
      break;
    default:
      envKey = {
        baseUrl: "https://subs-api.ottplay.com/",
      };
  }
  return envKey;
};
