
const fs = require('fs')

const CheckingPP = (userid) => {
    console.log('Checking Pending...')
    return new Promise((resolve, reject) => {

        fs.exists(`../../../public/upload/img/pp/${userid}.png`, (existsSync) => {
            if(existsSync) {
                let img = `/store/img/pp/${userid}.png`
                resolve(img)
                console.log('PP exist')
            }else {
                console.log('No PP exist')
                let noppfile = '/asset/img/nopp.png'
                reject(noppfile)

            }
        })




    })

}

exports.CheckingPP = CheckingPP
