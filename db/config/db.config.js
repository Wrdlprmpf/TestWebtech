module.exports = {
    HOST: "localhost",
    DB: "myspendings",
    USER: "postgres",
    PASSWORD: "Wrdlprmpf25",
    PORT: "5432",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};