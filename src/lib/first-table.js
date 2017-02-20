import _ from 'lodash'

export default function firstTable($) {
    let firstTableData = []
    let headerInfo = {}

    const trs = $('table:first').contents().find('tr')
    const examHeader = $('h1:first').text()

    if(examHeader) {
        headerInfo = post2003Exams(examHeader, $, {})
    } else {
        headerInfo = around2003Exams($, {})
    }

    $(trs).each(function(trIndex) {
        const tdData = $(this).find('p')
        let state = {}
        const data = {headerInfo, tdData}

        if(trIndex === 0) return //- ignores first row data (table head)

        if(tdData.length === 5) 
            state = withoutName(data, $, {})

        if(tdData.length === 6)
            state = withName(data, $, {})

        firstTableData = _.concat(firstTableData, state)
    })

    return firstTableData
}

function withoutName(data, $, state) {
    const { headerInfo, tdData } = data

    _.each($(tdData), (value, index) => {

        let current = _.trim(_.replace($(value).text(), /\n|\'/g, '')) //- clearing up some nasties.

        switch(index) {
            case 0:
                state.studentNumber = current
                break
            case 1:
                state.gender = current
                break
            case 2:
                state.points = current
                break
            case 3:
                state.division = current
                break
            case 4:
                state.subjects = current
        }

    })

    state = _.extend(state, headerInfo)

    return state
}

function withName(data, $, state) {
    const { headerInfo, tdData } = data

    _.each($(tdData), (value, index) => {

        let current = _.trim(_.replace($(value).text(), /\n|\'/g, '')) //- clearing up some nasties.

        switch(index) {
            case 0:
                state.studentNumber = current
                break
            case 1:
                state.gender = current
                break
            case 2:
                state.studentName = current
                break
            case 3:
                state.points = current
                break
            case 4:
                state.division = current
                break
            case 5:
                state.subjects = current 
        }

    })

    state = _.extend(state, headerInfo)
    return state
}

function aLevelHeaders(examHeadArray, headerInfo) {
    _.each(examHeadArray, (word, index) => {
        
        switch(index) {
            case 0:
                headerInfo.examType = word
                break
            case 1:
                headerInfo.examYear = word
                break
        }
    })

    return headerInfo
}

function oLevelHeaders(examHeadArray, headerInfo) {
    _.each(examHeadArray, (word, index) => {
        
        switch(index) {
            case 1:
                headerInfo.examType = word
                break
            case 2:
                headerInfo.examYear = word
                break
        }
    })

    return headerInfo
}

const isYear = (val) => val && /^[0-9]{4}$/.test(val)

function post2003Exams(examHeader, $, headerInfo) {
    let schoolHeader = $('h3:first').text()
    let schoolHeadWords = _.split(schoolHeader, ' ')
    let examHeadArray = _.split(examHeader, ' ')

    if(isYear(examHeadArray[1])) {
        headerInfo = aLevelHeaders(examHeadArray, headerInfo)
    } else {
        headerInfo = oLevelHeaders(examHeadArray, headerInfo)
    }

    headerInfo.schoolNumber = _.join(_.slice(schoolHeadWords,  0, 1), '')
    headerInfo.schoolName = _.trim(_.replace(_.reduce(_.slice(schoolHeadWords, 1), (acc, curr) => `${acc} ${curr}`, ''), /\n/g, ''))

    return headerInfo
}

function around2003Exams($, headerInfo) {
    const h3Text = $('h3:first').text()
    const examHeader = _.split(h3Text, ' ')

    _.each(examHeader, (word, index) => {

        word = _.trim(word)
        
        switch(index) {
            case 2:
                headerInfo.examType = word
                break
            case 4:
                headerInfo.examYear = word
                break
            case 8:
                headerInfo.schoolNumber = word
                break
        }
    })

    headerInfo.schoolName = _.trim(_.reduce(_.slice(examHeader, 9), (acc, curr) => `${acc} ${curr}`, ''))

    return headerInfo
}
