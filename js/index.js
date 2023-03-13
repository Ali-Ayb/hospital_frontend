window.onload = () => {
  base_url = "http://localhost/hospital_backend/";

  let department_dropdown = document.getElementById("department_dropdown");
  let rooms_dropdown = document.getElementById("rooms_dropdown");
  let medications_dropdown = document.getElementById("medications_dropdown");
  let choose_department_btn = document.getElementById("choose_department_btn");
  let choose_room_btn = document.getElementById("choose_room_btn");
  let choose_medication_btn = document.getElementById("choose_medication_btn");

  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `${token}` },
  };

  const getDepartments = () => {
    let data = "";
    axios.get(`${base_url}get_departments.php`, config).then((result) => {
      result.data.forEach((element) => {
        data += `
          <option value="${element.name}">${element.name}</option>
                `;
      });
      department_dropdown.innerHTML = data;
    });
  };

  const getRooms = ($department) => {
    let data = "";

    let info = new FormData();
    info.append("department", $department);

    axios.post(`${base_url}get_rooms.php`, info, config).then((result) => {
      result.data.forEach((element) => {
        data += `
          <option value="${element.room_number}">${element.room_number}</option>
                `;
      });
      rooms_dropdown.innerHTML = data;
    });
  };

  const getMedications = () => {
    let data = "";
    axios.get(`${base_url}get_medications.php`, config).then((result) => {
      result.data.forEach((element) => {
        data += `
          <option value="${element.name}">${element.name}</option>
                `;
      });
      medications_dropdown.innerHTML = data;
    });
  };

  const addUserToDepartment = () => {
    let department = department_dropdown.value;

    let data = new FormData();
    data.append("department", department);
    getRooms(department);

    axios
      .post(`${base_url}choose_department.php`, data, config)
      .then((result) => {
        if (result.data.response) {
          alert("department choosen successfuly");
        }
      });
  };

  const assignMedication = () => {
    let medication = medications_dropdown.value;

    let data = new FormData();
    data.append("medication", medication);
    data.append("quantity", quantity);

    axios.post(`${base_url}add_medication.php`, data, config).then((result) => {
      if (result.data.response) {
        alert("medication added successfuly");
      }
    });
  };

  getDepartments();
  getMedications();
  choose_department_btn.addEventListener("click", addUserToDepartment);
  choose_medication_btn.addEventListener("click", assignMedication);
};
