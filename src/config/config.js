module.exports = {
    environment: 'development',
    projectName: 'rishiGurukul',
    db: {
        development: {
            client: 'pdAdmin 4',

            timezone: "UTC",
            connection: {
                host: "143.110.243.238",
                user: "rguser",
                password: "RGUser@123",
                database: "rgurukuldb"
            },
            acquireConnectionTimeout: 180000
        }
    },
};