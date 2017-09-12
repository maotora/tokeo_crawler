import fs from 'fs'
import docxTemplater from 'docxtemplater'
import JsZip from 'jszip'
import path from 'path'
import { remote } from 'electron'
import moment from 'moment'
const { dialog } = remote

export default function(props) {
    //- Opening the file
    const { customer, users, properties } = props
    const filesArray = dialog.showOpenDialog({
        title: 'Open Contract Template File',
        filters: [{name: 'Documents', extensions: ['doc', 'docx']}]
    })

    if(filesArray) {
        const filename = filesArray[0]

        const [ propertyIndex, ownerIndex ] = [ customer.property, properties[customer.property]['owner'] ]

        const [ property_location, price, property_type, property_name, owner_name, owner_email, owner_phone] = [ 
            properties[propertyIndex]['location'],
            properties[propertyIndex]['price'],
            properties[propertyIndex]['propertyType'],
            properties[propertyIndex]['name'],
            users[ownerIndex]['names'],
            users[ownerIndex]['email'],
            users[ownerIndex]['phone'],
        ]

        const [
            customer_email, customer_name, customer_phone, startDate
        ] = [ customer.email, customer.names, customer.phone, customer.startDate ]

        const options = {
            customer_name, customer_email, customer_phone,
            owner_name, owner_phone, owner_email,
            property_location,
            startDate, price, property_type, property_name
        }

        //- Parsing the file.
        const content = fs.readFileSync(filename, 'binary')
        const zip = new JsZip(content)
        const doc = new docxTemplater()
        const dirName = path.dirname(filename)

        doc.loadZip(zip)

        doc.setData(options)

        try {
            doc.render()
        } catch(err) {
            console.log(err)
            dialog.showErrorBox('Error rendering document', err.message)
        }

        try {
            const outputName = `${customer_name}_${moment(startDate).format('DD-MM-YY')}'s_contract-for ${property_name}`
            const outputPath = path.resolve(dirName, `${outputName}.docx`)
            const buf = doc.getZip().generate({type: 'nodebuffer'})

            fs.writeFileSync(outputPath, buf)

            dialog.showMessageBox({
                type: 'info',
                title: 'Contract Created',
                message: `Congratulations, the contract has been created.`,
                detail: `Located at ${outputPath}`
            })

            return outputPath

        } catch (err) {
            console.log(err)
            dialog.showErrorBox('Error writing to file', err.message)
        }

    } else {
        console.log('File failed/didn\'t open')
    }
}
