const classes = [
  { id: "class_001", name: "Primary 4" },
  { id: "class_002", name: "Primary 5" },
];

const students = [
  {
    id: "STU001",
    fname: "John",
    lname: "Michael",
    classId: "class_001",
    status: "active",
  },
  {
    id: "STU002",
    fname: "Mary",
    lname: "James",
    classId: "class_001",
    status: "active",
  },
  {
    id: "STU003",
    fname: "Peter",
    lname: "David",
    classId: "class_002",
    status: "active",
  },
  {
    id: "STU004",
    fname: "Grace",
    lname: "Samuel",
    classId: "class_001",
    status: "inactive",
  },
];

const sessions = [
  { classId: "class_001", date: "2026-10-12", isFinalized: true },
  { classId: "class_001", date: "2026-10-13", isFinalized: true },
  { classId: "class_001", date: "2026-10-14", isFinalized: false },
  { classId: "class_001", date: "2026-10-15", isFinalized: true },
  { classId: "class_002", date: "2026-10-12", isFinalized: true },
];

const attendance = [
  {
    studentId: "STU001",
    classId: "class_001",
    date: "2026-10-12",
    isPresent: true,
  },
  {
    studentId: "STU001",
    classId: "class_001",
    date: "2026-10-13",
    isPresent: false,
  },
  {
    studentId: "STU001",
    classId: "class_001",
    date: "2026-10-14",
    isPresent: true,
  },
  {
    studentId: "STU001",
    classId: "class_001",
    date: "2026-10-15",
    isPresent: true,
  },
  {
    studentId: "STU002",
    classId: "class_001",
    date: "2026-10-12",
    isPresent: true,
  },
  {
    studentId: "STU002",
    classId: "class_001",
    date: "2026-10-13",
    isPresent: true,
  },

  {
    studentId: "STU002",
    classId: "class_001",
    date: "2026-10-15",
    isPresent: true,
  },
  {
    studentId: "STU003",
    classId: "class_002",
    date: "2026-10-12",
    isPresent: true,
  },
];
// get student function test

function getStudentsByClass(classId) {
  return students.filter((student) => {
    return student.classId === classId && student.status === "active";
  });
}
// get finalized date function
function getFinalizedDates(classId) {
  // returns an array of date strings, finalized sessions only
  return sessions
    .filter((session) => {
      return session.classId === classId && session.isFinalized === true;
    })
    .map((session) => session.date);
}

// count present day function
function countPresentDays(student_id, class_id) {
  const finalizedDate = getFinalizedDates(class_id);
  const presentRows = attendance.filter((row) => {
    return (
      row.studentId === student_id &&
      row.classId === class_id &&
      row.isPresent === true &&
      finalizedDate.includes(row.date)
    );
  });
  return presentRows.length;
}

// get attendance percent function 
function getAttendancePercent(studentID, classId){
  const finalizedDates = getFinalizedDates(classId)
  if(finalizedDates.length === 0){
    return null;
  } else {
    const attendancePercent = (countPresentDays(studentID,classId) / finalizedDates.length ) * 100;
    return Number(attendancePercent.toFixed(2));
  }
}


// testing 
console.log(getAttendancePercent("STU001","class_001"))
console.log(getAttendancePercent("STU002","class_001"))
console.log(getAttendancePercent("STU001","class_999"))


console.log(countPresentDays("STU003", "class_002"));
// console.log(getFinalizedDates("class_001"));
// console.log(getStudentsByClass("class_001"));
