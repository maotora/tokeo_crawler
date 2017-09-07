import fs from 'fs'
import docxTemplater from 'docxtemplater'
import JsZip from 'jszip'
import path from 'path'

export default function(fileName) {
    const content = fs.readFileSync(fileName, 'binary')
    const zip = new JsZip(content)
    const doc = new docxTemplater()
    const dirName = path.dirname(fileName)

    doc.loadZip(zip)

    doc.setData({
        name: 'Jajuja',
        myname: 'yeayueah'
    })

    try {
        doc.render()
    } catch(err) {
        console.log(err)

        throw err
    }

    const buf = doc.getZip().generate({type: 'nodebuffer'})
    fs.writeFileSync(path.resolve(dirName, 'output.docx'), buf)

    console.log('Done!')
}
