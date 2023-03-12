window.onload = () => {
  base_url = "http://localhost/hospital_backend/";

  const getPatients = () => {
    const patients_dropdown = document.getElementById("patients_dropdown");
    const hospitals_dropdown = document.getElementById("hospitals_dropdown");
    const assign_btn = document.getElementById("assign_btn");
    const token = localStorage.getItem("jwt");

    const config = {
      headers: { Authorization: `${token}` },
    };
    let data = "";
    axios.get(`${base_url}get_patients.php`, config).then((result) => {
      result.data.forEach((element) => {
        console.log(element.name);
        data += `
          <option value="${element.name}">${element.name}</option>
                `;
      });
      patients_dropdown.innerHTML = data;
    });
  };

  getPatients();
};
