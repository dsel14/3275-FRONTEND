import http from "../http-common.js";

class UserDataService {
    get(username) {
        return http.get(`/user/username/${username}`);
    }

    create(newCustomer) {
        // (String name, String username, String password, String userrole, String email, boolean enabled)
        // "A new Student", "student1", "std1", "student", "student@example.ca", true);
        // const newCustomer = {
        //     "name": name,
        //     "username": username,
        //     "password": password,
        //     "userrole": "Customer",
        //     "email": email,
        //     enabled: true
        // }
        return http.post('https://three275-finalbackend.onrender.com/api/user/create', newCustomer)
        //   .then(response => {
        //     console.log('Student registered successfully:', response.data);
        //     this.message = 'Registration successful.';
        //     // Optionally, redirect to another page
        //   })
        //   .catch(error => {
        //     console.error('Error registering student:', error);
        //     this.message = 'Registration failed.';
        //   });
        //   const newReg = {
        //     "student.id": student_id,
        //     "section.id": section_id
        // }
        // return http.post('/registrations', newReg);
        // return http.post("/login", data);
    }

    // getRegisteredSections(sid) {
    //     return http.get(`/students/${sid}/sections`);
    // }

    // register(student_id, section_id) {
    //     const newReg = {
    //         "student.id": student_id,
    //         "section.id": section_id
    //     }
    //     return http.post('/registrations', newReg);
    // }
///
}

export default new UserDataService();