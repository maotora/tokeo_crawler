fs.readFile('htmlfile.html', 'utf-8', (err, file) => {
    
    if(err) { return err }

    document = Parser(file)

    const tables = jsonQuery('children[name=body].children[*name=table]', {data: document})

    let tableOneTd
    let tableOneData

    _.each(tables.value, (table, index) => {
        if(index === 0) {
            tableOneTd = jsonQuery('children[name=tr].next.next.children[*name=td]', {data: table})
        } else {
            return
        }
    })

    _.each(tableOneTd.value, (td, index) => {
        tableOneData = jsonQuery('children[name=font].children[name=p].children', {data: td})

        _.each(tableOneData.value, (column, index) => {
            console.log(column.data)
        })
    })

    // const students = jsonQuery('value[0]
})


//------------------------------ Next the version with many results --------------------------------------------------------

fs.readFile('htmlfile.html', 'utf-8', (err, file) => {
    
    if(err) { return err }

    document = Parser(file)

    const tables = jsonQuery('children[name=body].children[*name=table]', {data: document})

    let tableOneTd
    let tableOneTdData

    _.each(tables.value, (table, index) => {
        if(index === 0) {
            tableOneTd = jsonQuery('children[*name=tr].children[*name=td]', {data: table})
        } else {
            return
        }
    })

    _.each(tableOneTd.value, (tds, index) => {
        tableOneTdData = jsonQuery('children[*name=font].children[*name=p].children', {data: tds})

        _.each(tableOneTdData.value, (column, index) => {
            console.log(column.data)
        })
    })

})

//------------ AFter jsdom and stuff -----------------------------------------------

fs.readFile('htmlfile.html', 'utf-8', (err, file) => {
    
    if(err) { return err }

    document = Parser(file)

    const tables = jsonQuery('children[name=body].children[*name=table]', {data: document})

    let tableOneTr
    let tableOneTd
    let tableOneTrData = {}

    function tableTds(trs) {

        let studentInfo = {}

        _.each(trs, (tds, index) => {
            let tableOneTdData = jsonQuery('children[*name=td]', {data: tds})
            //- removed data: 

            _.each(tableOneTdData.value, (column, i) => {
                // studentInfo = _.reduce(column, (acc, current, index) => {
                //     return jsonQuery('children[*name=font].children[*name=p].children', {data:column})
                // }, studentInfo)
                console.log(jsonQuery('children[*name=font].children[*name=p].children', {data:column})
)
            })
        })

        return studentInfo
    }

    _.each(tables.value, (table, index) => {
        if(index === 0) {
            tableOneTr = jsonQuery('children[*name=tr]', {data: table})
        } else {
            return
        }
    })

    _.each(tableOneTr, (trs, index) => {
        console.log(tableTds(trs))
    })

})
