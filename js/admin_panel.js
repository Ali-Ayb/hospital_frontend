window.onload = () => {
  base_url = "http://localhost/hospital_backend/";

  let patients_dropdown = document.getElementById("patients_dropdown");
  let employee_dropdown = document.getElementById("employee_dropdown");
  let hospitals_dropdown = document.getElementById("hospitals_dropdown");
  let hospitals_dropdown2 = document.getElementById("hospitals_dropdown2");
  let assign_btn = document.getElementById("assign_btn");
  let assign_btn2 = document.getElementById("assign_btn2");

  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `${token}` },
  };

  const getPatients = () => {
    let data = "";
    axios.get(`${base_url}get_patients.php`, config).then((result) => {
      result.data.forEach((element) => {
        data += `
          <option value="${element.name}">${element.name}</option>
                `;
      });
      patients_dropdown.innerHTML = data;
    });
  };

  const getEmployee = () => {
    let data = "";
    axios.get(`${base_url}get_employee.php`, config).then((result) => {
      result.data.forEach((element) => {
        data += `
          <option value="${element.name}">${element.name}</option>
                `;
      });
      employee_dropdown.innerHTML = data;
    });
  };

  const getHospitals = () => {
    let data = "";
    axios.get(`${base_url}get_hospitals.php`, config).then((result) => {
      result.data.forEach((element) => {
        data += `
          <option value="${element.name}">${element.name}</option>
                `;
      });
      hospitals_dropdown.innerHTML = data;
      hospitals_dropdown2.innerHTML = data;
    });
  };

  const assign_patient = () => {
    let patient = patients_dropdown.value;
    let hospital = hospitals_dropdown.value;

    let data = new FormData();
    data.append("patient", patient);
    data.append("hospital", hospital);

    axios.post(`${base_url}assign_patient.php`, data, config).then((result) => {
      console.log(result.data.response);
      if (result.data.response) {
        alert("patient assigned");
      }
    });
  };

  const assign_employee = () => {
    let employee = employee_dropdown.value;
    let selected_hospitals = [];
    let alert_shown = false;

    for (let i = 0; i < hospitals_dropdown2.options.length; i++) {
      if (hospitals_dropdown2.options[i].selected) {
        selected_hospitals.push(hospitals_dropdown2.options[i].value);
      }
    }
    for (let i = 0; i < selected_hospitals.length + 1; i++) {
      let data = new FormData();
      data.append("employee", employee);
      data.append("hospital", selected_hospitals[i]);

      promise = axios
        .post(`${base_url}assign_employee.php`, data, config)
        .then((result) => {
          if (result.data.response && !alert_shown) {
            alert("employee assigned");
            alert_shown = true;
          }
        });
    }
  };

  getHospitals();
  getHospitals();
  getPatients();
  getEmployee();
  assign_btn.addEventListener("click", assign_patient);
  assign_btn2.addEventListener("click", assign_employee);
};
