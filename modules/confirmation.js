const form = document.getElementById('form')
const fullname = localStorage.getItem('fullName')
const email = localStorage.getItem('email')
const otp = localStorage.getItem('otp')
//
console.log(otp)
let count = 0;


const otpinput = document.getElementById('OTP')
const firstName =  fullname.split(' ')
let ver = 0;

//adding event
form.addEventListener('submit', (e)=>{
    
    if(ver===otp){
        alert('Application Submited')
        e.preventDefault();
    } 
    // if(ver !=otp && count>=3){
    //     e.preventDefault(); 
    //     alert("page no found")
    //     form.action = '../pages/404.html'
          
    // }
    else{
        count++
        form.action = '/pages/404.html'
        e.preventDefault(); 
    }

})


otpinput.addEventListener('input',validate)
function validate(e){
    console.log(count)
    // console.log(e.target.value )

    if(e.target.value === otp && count<3){
        form.action = '/pages/homepage.html' 
        ver = e.target      
      }
    else{
        ver = e.target.value;
        form.action = '/pages/404.html'
    }

    }
 

//
function OTP(){
    let a = Math.floor(Math.random()*10000)
    localStorage.setItem('otp',a)} 


const header = document.getElementById('header');
header.innerHTML = 
            `
            Dear <b>${firstName[0]}</b>,
            <p> 
                Thank you for your inquiry.
          
                A Four digit verification number has been sent to your <br>
                email: <b>${email}</b>  ,
            </p>
            `;
