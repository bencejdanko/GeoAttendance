migrate((db) => {
    const dao = new Dao(db)

    const admin = new Admin()
    admin.email = "test@example.com"
    admin.setPassword('123456789')
    dao.saveAdmin(admin)

})