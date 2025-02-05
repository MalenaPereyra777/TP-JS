const registerForm=document.querySelector("#container-singin");
const inputName=document.querySelector("#name");
const inputLastname=document.querySelector("#lastname");
const inputEmail=document.querySelector("#email");
const inputPassword=document.querySelector("#password");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage=()=> {
    localStorage.setItem("users",JSON.stringify(users));
};

const isEmpty= (input)=> {  
    return !input.value.trim().length;
};

const isBetween=(input,min,max) => {
    return input.value.length>=min && input.value.length < max;
};

const isEmailValid= (input)=>{
    const re= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim());
};

const isExistingEmail = (input) =>{
    return users.some(user=>user.email===input.value.trim())
};


const isPasswordSecure = (input) =>{
    const re= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(input.value.trim());
};

const showError = (input,message) =>{
    const formField=input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error=formField.querySelector("small");
    error.style.display="block";
    error.textContent=message;

};
const showSuccess = (input) =>{
    const formField=input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error=formField.querySelector("small");
   
    error.textContent="";

};

const checkTextInput=(input) =>{
    let valid=false;
    const minCharacters=3;
    const maxCharacters=25;

    if(isEmpty(input)){
        showError(input, "Este campo es obligatorio")
        return;
    }
    if(!isBetween(input,minCharacters,maxCharacters)){
        showError(input,`Ingresa entre ${minCharacters} y ${maxCharacters} caracteres`);
        return;
    }

    showSuccess(input);
    valid=true;
    return valid;
}

const checkEmail = (input)=>{

    let valid=false;
    if(isEmpty(input)){
        showError(input, "El email es obligatorio")
        return;
    }

    if (!isEmailValid(input)){
        showError(input,"El email es ivalido");
        return;
    }

    if (isExistingEmail(input)){
        showError(input,"El email ya está registrado");
        return;
    }

    showSuccess(input);
    valid=true;
    return valid;

}

const checkPassword= (input) =>{
    let valid=false;

    if(isEmpty(input)){
        showError(input, "Por favor, ingrese su contraseña")
        return;
    }
    if(!isPasswordSecure(input)){
        showError(input,"Ingrese 8 caracteres, una mayuscula, una minuscula y un simbolo");
        return;
    }
    showSuccess(input);
    valid = true;
    return valid;

}


const validateForm= (e)=>{
    e.preventDefault();
    

    let isNameValid=checkTextInput(inputName);
    let isLastNameValid=checkTextInput(inputLastname);
    let isEmailValid=checkEmail(inputEmail);
    let isPasswordValid=checkPassword(inputPassword);

    let isValidForm= isNameValid && isLastNameValid && isEmailValid && isPasswordValid;

    if(isValidForm){
        users.push({
            name: inputName.value,
            lastname: inputLastname.value,
            email: inputEmail.value,
            password: inputPassword.value,
        });
        saveToLocalStorage(users);
        alert("Te has registrado con éxito");
        window.location.href="inicio.html";
    }
};


const init= ()=>{
    registerForm.addEventListener("submit", validateForm);
    inputName.addEventListener("input", () => checkTextInput(inputName));
    inputLastname.addEventListener("input", () => checkTextInput(inputLastname));
    inputEmail.addEventListener("input", () => checkEmail(inputEmail));
    inputPassword.addEventListener("input", () => checkPassword(inputPassword));
};

init();