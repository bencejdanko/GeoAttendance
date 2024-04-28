migrate((db) => {
    const dao = new Dao(db)

    let admin = new Admin()
    admin.email = process.env.GEOPB_ADMIN_EMAIL
    admin.setPassword(process.env.GEOPB_ADMIN_PASSWORD)
    dao.saveAdmin(admin)
})