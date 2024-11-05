const loginForm=document.querySelector("#container-login");
const inputEmail=document.querySelector("#email");
const inputPassword=document.querySelector("#password");
const errorMessage=document.querySelector("#form__error");

const users=JSON.parse(localStorage.getItem("users")) || [];

const saveToSessionStorage = (user) =>{
    sessionStorage.setItem("activeUser",JSON.stringify(user));
};

const showError= (message)=>{
    errorMessage.textContent=message;
}


const isEmpty = (input)=> {
    return !input.value.trim().length;
};


const isExistingEmail = (input) =>{
    let flag=users.some((user)=>user.email===input.value.trim());
    console.log(flag);
    return flag ;
};

const isMatchingPass = (input) =>{
    const user= users.find((user)=>user.email===inputEmail.value.trim());
    return user.password===input.value.trim();
};


const isValidAccount= ()=>{
    let valid=false;

    if(isEmpty(inputEmail)){
        showError("Por favor, complete los campos")
        return;
    }
    if(!isExistingEmail(inputEmail)){
        showError("El email ingresado no existe");
        return;
    }
    if(isEmpty(inputPassword)){
        showError("Por favor complete los campos");
        return;
    }
    if(!isMatchingPass(inputPassword)){
        showError("Los datos ingresados son incorrectos")
        return;
    }

    alert("Ya iniciaste sesión!");
    valid=true;
    errorMessage.textContent="";
    loginForm.reset;
    return valid;

}


const login = (e)=>{
    e.preventDefault();

    if(isValidAccount()){
        const user=users.find(user=>user.email===inputEmail.value.trim());
        saveToSessionStorage(user);
        window.location.href="./index.html";
    }
};

const init = ()=>{
    loginForm.addEventListener("submit",login);
};
init();
