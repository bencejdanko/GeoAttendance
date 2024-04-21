migrate((db) => {
    const dao = new Dao(db)

    let admin = new Admin()
    admin.email = "BENCEJDANKO@GMAIL.COM"
    admin.setPassword('}N;9q$9P&3>l')
    dao.saveAdmin(admin)

    admin = new Admin()
    admin.email = "example@example.COM"
    admin.setPassword('&J$3R-h9*m3u')
    dao.saveAdmin(admin)
})