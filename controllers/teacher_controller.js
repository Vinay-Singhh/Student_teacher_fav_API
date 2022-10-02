const Teacher = require('../models/teacher');
const Student = require('../models/student');
const teacher = require('../models/teacher');


module.exports.add = async function (req, res) {

    console.log('inside .add :', req.user._id)
    const { name, email, phoneNo, subject } = req.body
    //check if teacher already exist in collection
    const findTeacher = await Teacher.findOne({ email: email })
    if (findTeacher) {
        //add existing document to favourites
        try {
            const student = await Student.findByIdAndUpdate(req.user._id, { $addToSet: { "favouriteTeachers": findTeacher._id } })
            res.json(student)
        } catch {
            res.status(400).send('Error')
        }
    } else {
        if (name && email && phoneNo && subject) {
            try {
                const teacher = new Teacher({ ...req.body })
                //create a new document and add to favourites
                try {
                    const savedTeacher = await teacher.save()
                    const student = await Student.findByIdAndUpdate(req.user._id, { $push: { "favouriteTeachers": savedTeacher._id } })
                    res.json(student)
                } catch (error) {
                    console.log(error)
                    res.status(400).send('Error')
                }
            } catch (error) {
                console.log('inside catchh', error);
                res.send({ 'status': 'failed', 'message': 'Unable to register' })
            }
        } else {
            res.send({ 'status': 'failed', 'message': 'All fields required' })
        }
    }
}


module.exports.fav = async function (req, res) {
    //querying for most favourite teacher 
    try {
        const mostFavouriteTeacher = await Student.aggregate([{ $unwind: "$favouriteTeachers" },
        { $sortByCount: "$favouriteTeachers" }])

        const result = [await Teacher.findById(mostFavouriteTeacher[0]._id)]
        // handing same number of counts
        for (var i = 1; i < mostFavouriteTeacher.length; i++) {
            if (mostFavouriteTeacher[i].count == mostFavouriteTeacher[0].count) {
                result.push(await Teacher.findById(mostFavouriteTeacher[i]._id))
            }
            else {
                break
            }
        }
        res.json(result)
    } catch {

        res.status(500).send('Error')
    }
}