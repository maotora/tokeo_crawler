import fs from 'fs'
import docxTemplater from 'docxtemplater'
import JsZip from 'jszip'
import path from 'path'
import { remote } from 'electron'
import moment from 'moment'
import { userLog } from '../../../sagas/lib'
const { dialog } = remote

export default function(props) {
    //- Opening the file
    const { customer, users, properties } = props
    const propertyObj = properties.filter(property => property.id === customer.property)[0]
    const ownerObj = users.filter(user => user.id === propertyObj.owner)[0]

    const filesArray = dialog.showOpenDialog({
        title: 'Open Contract Template File',
        filters: [{name: 'Documents', extensions: ['doc', 'docx']}]
    })

    if(filesArray) {
        const filename = filesArray[0]

        const [ property_location, price, property_type, property_name, owner_name, owner_email, owner_phone] = [ 
            propertyObj['location'],
            propertyObj['price'],
            propertyObj['propertyType'],
            propertyObj['name'],
            ownerObj['names'],
            ownerObj['email'],
            ownerObj['phone'],
        ]

        const [
            customer_email, customer_name, customer_phone, startDate, endDate
        ] = [ customer.email, customer.names, customer.phone, customer.startDate, customer.endDate ]

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
            userLog('Something went wrong while rendering, please try again', 'Error Rendering', 'error')
        }

        try {
            const outputName = `${customer_name}_${moment(endDate).format('DD-MM-YY')}'s_contract-for ${property_name}`
            const outputPath = path.resolve(dirName, `${outputName}.docx`)
            const buf = doc.getZip().generate({type: 'nodebuffer'})

            fs.writeFileSync(outputPath, buf)

            userLog(`Contract created at: ${outputPath}`, 'Contract created', 'info')

            return outputPath

        } catch (err) {
            userLog('Something went wrong while writing document, please try again', 'Error Writing', 'error')
        }

    } else {
            userLog('Something went wrong while creating contract, please try again', 'System Error', 'error')
    }
}
