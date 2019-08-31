module.exports = {
    env: 'production',
    db: process.env.DATABASE_URL,
    port: process.env.PORT || 3005,
}