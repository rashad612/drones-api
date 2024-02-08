export const config = () => ({
    app: {
      port: parseInt(process.env.PORT, 10) || 3000,
    },
});
