const connectDB = require('../config/connectDB'); 

async function studentDetails(req, res) {
    console.log('Entered student detail page');
    const studentId = String(req.params.id);
    console.log(studentId, 'This is student Id')
    try {
        const db = await connectDB();
        console.log(db,' git This is db')
        const lmfCollection = db.collection('studentsLMF');
        const alefCollection = db.collection('studentsALEF');

        // Fetch data from both collections
        const lmfStudent = await lmfCollection.findOne({ 'Student ID': studentId });
        const alefStudent = await alefCollection.findOne({ 'Student ID': studentId });

        console.log(lmfStudent, ' this is lmf student')
        console.log(alefStudent, ' this is alef student')


        // Ensure data from either collection exists
        if (!lmfStudent && !alefStudent) {
            return res.status(404).json({
                message: 'Student not found',
                error: true
            });
        }

        // Create the response with selective data
        const response = {
            firstName: alefStudent?.FirstName_EN || null,
            middleName: alefStudent?.MiddleName_EN || null,
            lastName: alefStudent?.LastName_EN || null,
            section: alefStudent?.Section || null,
            grade: alefStudent?.Grade || null,
            studentId: alefStudent?.['Student ID'] || null,
            alefUserId: alefStudent?.['Alef User ID'] || null,
            alefPassword: alefStudent?.['Alef Password'] || null,
            lmsUserId: lmfStudent?.['LMS User ID'] || null,
            lmsPassword: lmfStudent?.['LMS Password'] || null,
        };

        console.log(response)

        return res.status(200).json(response);

    } catch (error) {
        console.error("Error in studentDetails:", error);
        return res.status(500).json({
            message: error.message || 'Server error',
            error: true
        });
    }
}

module.exports = studentDetails;
