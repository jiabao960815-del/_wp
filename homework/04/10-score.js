let studentsData = '[{"name": "小明", "scores": [80, 90, 70]}, {"name": "小華", "scores": [50, 40, 60]}]';
let students = JSON.parse(studentsData);

function checkStudentStatus(searchName) {
    for (let student of students) {
        if (student.name === searchName) {
            let sum = 0;
            for (let s of student.scores) sum += s;
            let avg = sum / student.scores.length;
            let status = avg >= 60 ? "及格" : "不及格";
            return `${student.name} 平均為 ${avg.toFixed(1)}，結果：${status}`;
        }
    }
    return "找不到該學生";
}

console.log(checkStudentStatus("小華"));