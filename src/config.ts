export const config = () => ({
    app: {
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    db: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
    }
});
