    const some = _.map(splitedSubjectsArray, (studentSubjects, index) => {
        //- Going over each subject
        return _.map(studentSubjects, (subject, innnerIndex, array) => {
            //- removing inner spaces
            const cleanedSubjects = whiteSpaceRomover(subject)

            return _.reduce(array, (acc, currentSub, indexSub) => {
                const obj = {}
                if(currentSub.length === 1 && currentSub[0].length > 1) {
                    //- it's a subject
                    obj.subject = currentSub
                    return _.concat(acc, obj)
                } else if(currentSub.length === 1 && currentSub[0].length === 1) {
                    //- it's a grade
                    const grade = currentSub
                    //console.log(`Grade ${grade}`)
                    //array[--index].grade = currentSub
                    return _.concat(acc, obj)
                } else if(currentSub.length > 1) {
                    //- it's a grade & subject, possibly with three values inside.
                    const grade = _.slice(currentSub, 0, 1)
                    const subjectString = _.slice(currentSub, 1)
                    // console.log(`Grade ${grade}`)
                    //array[--index].grade = grade
                    obj.subject = subjectString
                    return _.concat(acc, obj)
                }
            }, [])
        })
    })
