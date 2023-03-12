window.onload = () => {
  base_url = "http://localhost/hospital_backend/";

  let department_dropdown = document.getElementById("department_dropdown");
  let choose_department_btn = document.getElementById("choose_department_btn");

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

  const addUserToDepartment = () => {
    let department = department_dropdown.value;

    let data = new FormData();
    data.append("department", department);

    axios
      .post(`${base_url}choose_department.php`, data, config)
      .then((result) => {
        console.log(result.data.response);
        if (result.data.response) {
          alert("department choosen successfuly");
        }
      });
  };

  getDepartments();
  choose_department_btn.addEventListener("click", addUserToDepartment);
};