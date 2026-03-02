
const API_URL = "https://pawsandhome.onrender.com/api/contact";


document.getElementById("contactForm").addEventListener("submit",async(e)=>{
    
    const form=document.getElementById("contactForm");
        e.preventDefault();
        const userName=document.getElementById("repoterName").value;
        const email=document.getElementById("repoterEmail").value;
        const subject=document.getElementById("reportSubject").value;
        const Message=document.getElementById("reportNote").value;

         const data={
            userName,
            email,
            subject,
            Message
        }
    try {
        const res= await fetch(`${API_URL}/reportAdmin`,{
            method:"POST",
            
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },

            body:JSON.stringify(data)
        });

        if(!res.ok){
            return alert("server error");

        }

         alert("Message sent successfully");
        form.reset();

    } catch (error) {
        console.log(error);
        return alert(error);
    }
});

