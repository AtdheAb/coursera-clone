import { useState , useEffect } from "react"
import { getAll } from "./services/students"
const Students = ()=> {
    const [students, setStudents] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        getAll().then(res => {
            setStudents(res.data)
        }).catch(err => {
            setError(err.message)
        })
    },[])   

    const createStudents = (student) => {
        return (
            <tr>
                <td>{student.fullName}</td>
                <td>{student.email}</td>
            </tr>                 
        )
    }
    return(
        <div>
            <div>
                <a href="/students/add" className="btn btn-success">
                    Register
                </a>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    students.map(createStudents)
                    }
                    
                </tbody>
            </table>           
        </div>
    )
}
export default Students