const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const matchPassword = async function (enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Function to get the total student count based on studyStatus
function getTotalStudentsByStudyStatus(students) {
  const studyStatusCount = {};

  students.forEach((student) => {
    const studyStatus = student.studyStatus;
    if (studyStatusCount.hasOwnProperty(studyStatus)) {
      studyStatusCount[studyStatus]++;
    } else {
      studyStatusCount[studyStatus] = 1;
    }
  });

  return studyStatusCount;
}

function groupStudentsByNationality(students) {
  const studentsByNationality = {};

  students.forEach((student) => {
    const nationality = student.country;
    if (studentsByNationality.hasOwnProperty(nationality)) {
      studentsByNationality[nationality]++;
    } else {
      studentsByNationality[nationality] = 1;
    }
  });

  return studentsByNationality;
}

module.exports = {
  hashPassword,
  matchPassword,
  getTotalStudentsByStudyStatus,
  groupStudentsByNationality,
};
