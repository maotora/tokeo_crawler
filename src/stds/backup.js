function executor(err, result) {
    if(err) { return err }
    
    const subjectsArray = _.map(result, student => {
        const subjects = student.subjects

        return subjects
    })

    const splitedSubjectsArray = _.map(subjectsArray, subject => {
        const subjectsArray = _.split(subject, '-')
        return trimer(subjectsArray)
    })

    const toObjLogic = _.map(splitedSubjectsArray, (curr) => {
        return _.reduce(curr, (acc, currentSubj, index, array) => {
            const obj = {}
            if(currentSubj.length === 1) {
                //- Grade
                return _.concat(acc, acc[--index].grade = currentSubj)
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
    })

    //- Remove white spaces.
    
    const cleanList = _.map(toObjLogic, (studentResults, studentIndex) => {
        return _.map(studentResults, (eachSubjectObj, subjectIndex) => {
            const obj = {}
            const cleanSubject = whiteSpaceRomover(eachSubjectObj.subject)

            obj.subject = flattenArray(cleanSubject)
            obj.grade = flattenArray(eachSubjectObj.grade)

            if(_.isEmpty(obj.subject) != true) { return obj }
        })
    })


    _.each(nonObjRemover(cleanList), (curr) => console.log('info ', curr))

}
