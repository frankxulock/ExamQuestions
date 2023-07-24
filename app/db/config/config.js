module.exports = {
  "development": {
    "username": process.env.DEV_DB_USER || "root",
    "password": process.env.DEV_DB_PASS || null,
    "database": process.env.DEV_DB_NAME || "test",
    "host": process.env.DEV_DB_HOST || "127.0.0.1",
    "dialect": process.env.DEV_DB_TYPE || "mysql",
    "port": process.env.DEV_DB_PORT || "33106"
  },
  "local": {
    "username": process.env.LOCAL_DB_USER || "root",
    "password": process.env.LOCAL_DB_PASS || null,
    "database": process.env.LOCAL_DB_NAME || "test",
    "host": process.env.LOCAL_DB_HOST || "127.0.0.1",
    "dialect": process.env.LOCAL_DB_TYPE || "mysql",
    "port": process.env.LOCAL_DB_PORT || "33106"
  }
}
