const API_URL = "http://localhost:8000/api/auth";

//registration
document.getElementById("registerForm").addEventListener("submit", async(e)=>{
    e.preventDefault();

    const name=document.getElementById("regName").value;
    const email=document.getElementById("regEmail").value;
    const mobile=document.getElementById("regMobile").value;
    const password=document.getElementById("regPassword").value;
    const confirmPassword=document.getElementById("regConPassword").value;
    const isNgo = document.getElementById("userTypeToggle").checked;
    if(password!==confirmPassword){
        alert("Passwords do not match");
        return;
    }

    const payload={
        name,
        email,
        mobile,
        password,
        role:isNgo? "ngo":"adopter"
    };

    try {
        const res= await fetch(`${API_URL}/register`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data=await res.json();

        if(!res.ok){
            alert("registration failed try again later");
            return;
        }
        alert("registration successful .....");
        

    } catch (error) {
        console.error(error);
        alert("server error please try again later...");
    }
});


//login
document.getElementById("loginForm").addEventListener("submit",async(e)=>{
    e.preventDefault();

    const email=document.getElementById("logEmail").value;
    const password=document.getElementById("logPassword").value;

    const payload={
        email,password
    }

    try {
        const res=await fetch(`${API_URL}/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        });
        const data=await res.json();

        if(!res.ok){
            alert(data.message || "Login failed");
            return;
        }

        localStorage.setItem("token", data.token);

        alert("login successful....");
        window.location.href="/FrontEnd/home.html";
    } catch (error) {
        console.error(error);
        alert("server error : try again");
    }
});

async function socketConnection(){
    
}