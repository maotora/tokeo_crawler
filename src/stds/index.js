import { updateStudents } from './../db/'
import _ from 'lodash'
//- Standards for the app.

//- Search for all student's subjects and turn them into arrays of objects.
const trimer = (arr) => _.map(arr, curr => _.trim(curr))
const whiteSpaceRomover = (array) => {
    return _.filter(array, (curr, index) => {
        return (_.isEmpty(curr)) ? false : true
    })
}

const nonObjRemover = (array) => {
    return _.map(array, arrays => {
        return _.filter(arrays, current => {
            return current && _.isObject(current)
        })
    })
}

const flattenArray = (array) => {
    if(_.isArray(array)) {
        if(array.length > 1) {
            return _.reduce(array, (acc, curr, index) => {
                if(index > 0) {
                    return acc + ' ' + curr
                }
                return acc + curr
            }, '')
        } else {
            return _.reduce(array, (acc, curr) => {
                return acc + curr
            }, '')
        }
    } else {
        return array
    }
}

const splitSubject = (subject) => {
    const subjectsArray = _.split(subject, '-')
    return trimer(subjectsArray)
}

const splitToObject = (subjectArr) => {
    return _.reduce(subjectArr, (acc, currentSubj, index, array) => {
        const obj = {}
        if(currentSubj.length === 1) {
            //- Grade
            const lastSubject = acc[--index].grade = currentSubj
            return _.concat(acc, lastSubject)
        } else if(currentSubj.length > 1) {
            //- Grade &/Or subject

            const chunk = _.split(currentSubj, ' ')
            const gradeChunk = _.slice(chunk, 0, 1)
            let grade = ''
            let subj = ''

            if(gradeChunk[0].length > 1) {
                subj = gradeChunk
            } else {
                grade = gradeChunk
                subj = _.slice(chunk, 1)
            }

            if(index > 0) {
                acc[--index].grade = grade
            }

            obj.subject = subj
            return _.concat(acc, obj)
        }
    }, [])
}

const cleanDirtySubjects = (dirtySubjects) => {
    return _.map(dirtySubjects, (eachSubjectObj, subjectIndex) => {
        const obj = {}
        const cleanSubject = whiteSpaceRomover(eachSubjectObj.subject)

        obj.subject = flattenArray(cleanSubject)
        obj.grade = flattenArray(eachSubjectObj.grade)

        if(_.isEmpty(obj.subject) != true || _.isUndefined(obj.grade) != true) { return obj }
    })
}

const unstupidify = (arrayWithSomeStupid) => {
    return _.filter(arrayWithSomeStupid, (curr, index) => {
        return curr && _.isObject(curr)
    })
}

const logger = ({schoolName, schoolNumber}, info) => {
    if(schoolNumber != info.number) {
        info = {name: schoolName, number: schoolNumber}
        console.log(`Currently Updating\nSchool Name: ${info.name} School Number: ${info.number}`)
    }
}

const savingResults = (results) => {
    _.each(results, student => {

        logger(student, {})
        const subjects = student.subjects
        const splitedSubject = splitSubject(subjects)
        const dirtySubjectsObj = splitToObject(splitedSubject)
        const cleanSubjectsObj = cleanDirtySubjects(dirtySubjectsObj)
        const evenCleanerSubjects = unstupidify(cleanSubjectsObj)

        student.subjects = evenCleanerSubjects
        student.save()

    })
}

function executor(err, results) {
    if(err) { return err }

    if(results.length === 0) {
        console.log('Done!')
        return 'Done'
    }
    
    savingResults(results)

}

export default async function() {
    await updateStudents(executor)
}
