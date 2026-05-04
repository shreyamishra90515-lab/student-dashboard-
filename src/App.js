import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (!name || !score) return;
    setStudents([...students, { name, score: Number(score) }]);
    setName("");
    setScore("");
  };

  const updateScore = (index, value) => {
    const updated = [...students];
    updated[index].score = Number(value);
    setStudents(updated);
  };

  // stats
  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg =
    total === 0
      ? 0
      : Math.round(
          students.reduce((sum, s) => sum + s.score, 0) / total
        );

  return (
    <div className="container">
      {/* 🔥 HEADER */}
      <div className="header">
        <div className="terminal-line"></div>
        <p className="subtitle">ACADEMIC TERMINAL V2.0</p>

        <h1>
          STUDENT <span>SCOREBOARD</span>
        </h1>

        <div className="line"></div>
      </div>

      {/* 📝 REGISTER */}
      <div className="register-box">
        <div className="register-top">
          <span>● REGISTER STUDENT</span>
          <span>NEW ENTRY</span>
        </div>

        <div className="register-form">
          <input
            placeholder="Student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Score (0-100)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <button onClick={addStudent}>+ ADD</button>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="stats">
        <div className="box">
          <p>TOTAL</p>
          <h2>{total}</h2>
        </div>

        <div className="box">
          <p>PASSED</p>
          <h2>{passed}</h2>
        </div>

        <div className="box">
          <p>AVG SCORE</p>
          <h2>{avg}</h2>
        </div>
      </div>

      {/* 📋 TABLE */}
      <div className="table-box">
        <div className="table-header">
          <p>STUDENT RECORDS</p>
          <span>{students.length} entries</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>SCORE</th>
              <th>STATUS</th>
              <th>UPDATE</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td className="name">{s.name}</td>

                <td className="score">{s.score}</td>

                <td>
                  <span
                    className={
                      s.score >= 40 ? "status pass" : "status fail"
                    }
                  >
                    ● {s.score >= 40 ? "PASS" : "FAIL"}
                  </span>
                </td>

                <td>
                  <input
                    value={s.score}
                    onChange={(e) =>
                      updateScore(i, e.target.value)
                    }
                  />
                  <button className="save-btn">SAVE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}