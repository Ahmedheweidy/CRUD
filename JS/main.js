

let employeeName = document.getElementById("employeeName");
let employeeposition = document.getElementById("employeeposition");
let employeeAddress = document.getElementById("employeeAddress");
let employeePhone = document.getElementById("employeePhone");
let mainBtn = document.getElementById("mainBtn");
let UpdateBtn = document.getElementById("UpdateBtn");
let warningName = document.getElementById("warningName");
let warningPosition = document.getElementById("warningPosition");
let warningAddress = document.getElementById("warningAddress");
let warningPhone = document.getElementById("warningPhone");
let employeesList;


// check the data on the localStorage

if (localStorage.getItem("employeeList") != null) {
    employeesList = JSON.parse(localStorage.getItem("employeeList"));
    displayEmployees(employeesList)
} else {
    employeesList = [];
}


// Validation 


// Validate Employee Name

function ValidateEmployeeName() {

    var regexName = /^[A-z][a-z]{3,20}( [a-zA-Z]{1,20}$|)/;

    if (regexName.test(employeeName.value)) {
        warningName.classList.replace("d-inline-block", "d-none");
        return true
    } else {
        warningName.classList.replace("d-none", "d-inline-block");
    }

}

// Validate Employee Position

function ValidateEmployeePosition() {

    var regexPosition = /[A-Za-z]{2,20}$/;

    if (regexPosition.test(employeeposition.value)) {
        warningPosition.classList.replace("d-inline-block", "d-none");
        return true
    } else {
        warningPosition.classList.replace("d-none", "d-inline-block");
    }

}

// Validate Employee Address

function ValidateEmployeeAddress() {

    var regexAddress = /[A-Za-z]{4,30}$/;

    if (regexAddress.test(employeeAddress.value)) {
        warningAddress.classList.replace("d-inline-block", "d-none");
        return true
    } else {
        warningAddress.classList.replace("d-none", "d-inline-block");
    }

}

// Validate Employee Phone

function ValidateEmployeePhone() {

    var regexPhone = /^01[0125][0-9]{8}$/;

    if (regexPhone.test(employeePhone.value)) {
        warningPhone.classList.replace("d-inline-block", "d-none");
        return true

    } else {
        warningPhone.classList.replace("d-none", "d-inline-block");

    }
}


// Add Product

function addProduct() {
    if (ValidateEmployeeName() & ValidateEmployeePhone() &
        ValidateEmployeePosition() & ValidateEmployeeAddress()) {
        let employee = {
            name: employeeName.value,
            position: employeeposition.value,
            Address: employeeAddress.value,
            Phone: employeePhone.value
        };
        employeesList.push(employee);
        addToLocalStorage()
        clearForm();
        displayEmployees(employeesList);

    }
}

// Add to localStorage
function addToLocalStorage() {
    localStorage.setItem("employeeList", JSON.stringify(employeesList));
}

// Display the data on the table

function displayEmployees(list) {
    let cartona = ""
    for (let i = 0; i < list.length; i++) {
        cartona += `<tr>
        <th class="text-start" scope="row">${i + 1}</th> 
        <td>${list[i].newName ? list[i].newName : list[i].name}</td>
        <td>${list[i].position}</td>
        <td>${list[i].Address}</td>
        <td>${list[i].Phone}</td>
        <td class="text-center">
        <button type="button" onclick="updateEmployee(${i})" class="btn btn-info mediaq me-md-3">Update <i
        class="fa-regular fa-pen-to-square"></i></button>
        <i  type="button" onclick="updateEmployee(${i})" 
        class="fa-regular text-info fa-pen-to-square me-md-3 btn mediaqS"></i>
        <button type="button" onclick="deleteEmployee(${i})" class="btn mediaq btn-danger">Delete <i
        class="fa-solid ms-1 fa-eraser"></i></button>
        
    <i type="button" onclick="deleteEmployee(${i})" type="button"
    class="fa-solid ms-1 fa-eraser btn mediaqS text-danger"></i>
        </td>
    </tr>`;


    }

    document.getElementById("myData").innerHTML = cartona;
}


// Delete BTN to delete data

function deleteEmployee(deleteIndex) {
    employeesList.splice(deleteIndex, 1);
    addToLocalStorage()
    displayEmployees(employeesList);
}

// clear the form after Submit

function clearForm(x) {
    employeeName.value = x ? x.name : "";
    employeeposition.value = x ? x.position : "";
    employeeAddress.value = x ? x.Address : "";
    employeePhone.value = x ? x.Phone : "";
}

// Update BTN and display the data to update it and get the index of the raw 

function updateEmployee(updateIndex) {
    clearForm(employeesList[updateIndex])

    curentIndexUpdate = updateIndex;
    UpdateBtn.classList.replace("d-none", "d-inline-block");
    mainBtn.classList.add("d-none")
}


// Update BTN remove and save updated data

function updateData() {
    employeesList.splice(curentIndexUpdate, 1, {
        name: employeeName.value,
        position: employeeposition.value,
        Address: employeeAddress.value,
        Phone: employeePhone.value
    })
    UpdateBtn.classList.replace("d-inline-block", "d-none");
    mainBtn.classList.remove("d-none")
    addToLocalStorage()
    displayEmployees(employeesList);
    clearForm();


}



// search by name
function searchByName(userInput) {
    var searcheditems = []
    for (let i = 0; i < employeesList.length; i++) {
        if (employeesList[i].name.toLowerCase().includes(userInput.toLowerCase())) {

            employeesList[i].newName = employeesList[i].name.replace(userInput, `<span class= " text-bg-danger fw-bolder">${userInput}</span> `)

            searcheditems.push(employeesList[i]);
        }
    }
    console.log(searcheditems)
    displayEmployees(searcheditems);
}

// Search By Position
function SearchByPosition(userInput) {
    var searcheditems = []
    for (let i = 0; i < employeesList.length; i++) {
        if (employeesList[i].position.toLowerCase().includes(userInput.toLowerCase())) {

            employeesList[i].newName = employeesList[i].position.replace(userInput, `<span class= " text-bg-danger fw-bolder">${userInput}</span> `)

            searcheditems.push(employeesList[i]);
        }
    }
    console.log(searcheditems)
    displayEmployees(searcheditems);
}

// Search By Address
function SearchByAddress(userInput) {
    var searcheditems = []
    for (let i = 0; i < employeesList.length; i++) {
        if (employeesList[i].Address.toLowerCase().includes(userInput.toLowerCase())) {

            employeesList[i].newName = employeesList[i].Address.replace(userInput, `<span class= " text-bg-danger fw-bolder">${userInput}</span> `)

            searcheditems.push(employeesList[i]);
        }
    }
    console.log(searcheditems)
    displayEmployees(searcheditems);
}

// Search By Phone
function SearchByPhone(userInput) {
    var searcheditems = []
    for (let i = 0; i < employeesList.length; i++) {
        if (employeesList[i].Phone.toLowerCase().includes(userInput.toLowerCase())) {

            employeesList[i].newName = employeesList[i].Phone.replace(userInput, `<span class= " text-bg-danger fw-bolder">${userInput}</span> `)

            searcheditems.push(employeesList[i]);
        }
    }
    console.log(searcheditems)
    displayEmployees(searcheditems);
}

// let BYName = document.getElementById("SearchByNameCheck").value;
// let BYposition = document.getElementById("SearchByPosition").value;
// let BYAddress = document.getElementById("SearchByAddress").value;
// let BYPhone = document.getElementById("SearchByPhone").value;







// let checkEle = document.querySelectorAll(".option");
// let arr = [22, 10, 50, 30, 90, 33, 80, 75, 33, 99, 150, 105];
// let resArr = arr;
// function filterArr() {
//     checkEle.forEach((item, index) => {
//         if (item.checked && index == 0) {
//             searchByName();
//         }
//         else if (item.checked && index == 1) {
//             SearchByPosition();
//         } else if (item.checked && index == 2) {
//             SearchByAddress();
//         }
//         else if (item.checked && index == 3)
//         SearchByPhone();
//     });
// }


//    <h1>Filter an array depending on multiple checkbox conditions</h1>
// <div class="sample">[22,10,50,30,90,33,80,75,33,99,150,105]</div>
// <div class="result"></div>
// <br />
// <input type="checkbox" class="check" onclick="filterArr()" />Number should be greater than 50 < br />
//     <input type="checkbox" class="check" onclick="filterArr()" />Number should divide by 5 < br />
//         <input type="checkbox" class="check" onclick="filterArr()" />Number should divide by 3 < br />
//             <h3>tick the above checkbox to apply filter to the array above</h3>