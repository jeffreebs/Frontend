const student = {
    name: "Jeffree Berrocal",
    grades: [
        { name: "Math", grade: 80 },
        { name: "Tech", grade: 90 },
        { name: "Science", grade: 85 },
        { name: "History", grade: 90 },
    ]
};

let total = 0;
for (const materia of students.grades){
    total= total + materia.grade;
}
const  gradeAvg = total / student.grades.length;


let highest =  student.grades[0];
let lowest = student.grades[0];

for (const materia of student.grades){
    if (materia.grade > highest.grade){
        highest= materia;
    }

    if (materia.grade < lowest.grade){
        lowest = materia;
    }
}
const result = {
    name: student.name,
    gradeAvg: gradeAvg,
    highestGrade: highest.name,
    lowestGrade: lowest.name
};

console.log(result);
