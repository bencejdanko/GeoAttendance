migrate((db) => {
    const dao = new Dao(db)

    let admin = new Admin()
    admin.email = "BENCEJDANKO@GMAIL.COM"
    admin.setPassword('123456789')
    dao.saveAdmin(admin)

    admin = new Admin()
    admin.email = "example@example.COM"
    admin.setPassword('123456789')
    dao.saveAdmin(admin)

})