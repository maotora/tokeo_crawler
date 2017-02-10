import _ from 'lodash'

export function getResultsLinks($) {
    const value = $('li').text()
    let list = _.split(value, ' ')

    const linkLists = _.filter(_.map(list, (value) => {
        if(/[psPS]{1}[0-9]{4}/.test(value))
            return value 
    }), (value) => (value))

    return linkLists
}
