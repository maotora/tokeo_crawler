import _ from 'lodash'

export function getResultsLinks($) {

    const examTable = $('table')[2]
    let links = []

    //- 2016 gets links in tables, no more directory listing.
    if(examTable) {
        const tableRow = $(examTable).find('tr')
        _.each(tableRow, row => {
            const anchors = $(row).find('a')

            _.each($(anchors), link => {
                links = _.concat(links, ($(link).attr('href')))
            })
        })

        return links
    } else {
        const value = $('li').text()
        let list = _.split(value, ' ')

        const linkLists = _.filter(_.map(list, (value) => {
            if(/[psPS]{1}[0-9]{4}/.test(value))
                return value 
        }), (value) => (value))

        return linkLists
    }
}
