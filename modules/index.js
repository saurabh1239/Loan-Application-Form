

const Name = document.getElementById('FullName');
const email = document.getElementById('Email');
const PAN = document.getElementById('PAN')
const Amount= document.getElementById('Amount')
const form = document.getElementById('form')
const Error = document.getElementById('error')
const Captchainput = document.getElementById('captcha-input')
const captchaValue = document.getElementById('Captcha')
let  sum = 0;

//params to pass
let params = {
    Name:'',
    email:'',
}


//declaring Regex
const email_regex  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PAN_regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

//generating otp
function OTP(){return Math.floor(Math.random()*10000)} 




//adding event listeners for dynamic validation
Name.addEventListener('input',validate)
email.addEventListener('input',validate)
PAN.addEventListener('input',validate)
Amount.addEventListener('input',validate)
captchaValue.addEventListener('input',validate)

// .addEventListener('input',validate)
function validate(e){
      //FullName validation
      if(e.target.id =='FullName'){
        if(e.target.value != '' && e.target.value.length>4){
          setSucessFor(FullName)
          params.Name = e.target.value;          
        }
        else{
          setErrorFor(FullName,'Full Name is Required')
        }
      } 
      //Email validation
      if(e.target.id == 'Email'){
        if(email_regex.test(e.target.value.toUpperCase())){
          setSucessFor(email);
          params.email = e.target.value;      
        }
        else{
          setErrorFor(email,'Email is required')
        }
      }
      //PAN validation
      if(e.target.id ==='PAN'){
        if(e.target.value !='' && PAN_regex.test(e.target.value)){
          setSucessFor(PAN)
        }
        else{
          setErrorFor(PAN,'Check if PAN Number is valid')
        }
      }
      //Amount Validation and conversion
      if(e.target.id ==='Amount'){
          if( e.target.value!=0 &&  e.target.value<999999999){
              conversion(e.target.value)
              setSucessFor(Amount)
          }  
          else if(e.target.value>999999999){
            setErrorFor(Amount,'Amount Limit Excedded')
          }
          else{
            setErrorFor(Amount,'Amount Required')
          }
      }

        //Captcha verification
       if(e.target.id === 'Captcha'){
        if(e.target.value ==sum){
          setSucessFor(captchaValue)
        }
        else{
          setErrorFor(captchaValue,'Check Captcha');
            // getRandom()

        }
      }
      localStorage.setItem('fullName',params.Name)
      localStorage.setItem('email',params.email)
      localStorage.setItem('otp',OTP())
    //   window.document.location = './confirmation.html'

      
}

function setErrorFor(input, message){
    const formControl = input.parentElement; 
    const small = formControl.querySelector('small')
    
    //add error message 
    small.innerText = message;

    // add error class
    formControl.className = 'form-control error';


}

function setSucessFor(input){
    const formControl = input.parentElement;

    formControl.className = 'form-control success'
}





// conversion function
function conversion(num){
    var a = ['', 'One ','Two ','Three ','Four ','Five ','Six ','Seven ','Eight ','Nine ',
            'Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    var b = [' ',' ', 'Twenty ','Thirty ','Forty ','Fifty ','Sixty ','Seventy ','Eighty ','Ninety ']
    ;
    //converting to words
    if((num = num.toString()).length>9) return 'Amount excedded limit';
  console.log(num,"num");
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)

    console.log(n,"n");
    if(!n) return;
    var str = '';
    str += (n[1]!=0) ? (a[Number(n[1])] || b[n[1][0]] + ' '+ a[n[1][1]] ) + 'Crore ': '';
    str += (n[2]!=0) ? (a[Number(n[2])] || b[n[2][0]] + ' '+ a[n[2][1]] ) + 'Lakh ': '';
    str += (n[3]!=0) ? (a[Number(n[3])] || b[n[3][0]] + ' '+ a[n[3][1]] ) + 'Thousand ': '';
    str += (n[4]!=0) ? (a[Number(n[4])] || b[n[4][0]] + ' '+ a[n[4][1]] ) + 'Hundred ': '';
    str += (n[5]!=0) ? ((str != ' ') ? ' and ' : ' ')+ (a[Number(n[5])] || b[n[5][0]]+ ' ' + a[n[5][1]])+ 'only' : 'only';

    str == 'only'? '': str.toUpperCase();

    let putwords = document.getElementById("amount-string")
    putwords.innerText=str;

}


// getting random numbers for captcha
function getRandom(){
    let num1 = Math.floor(Math.random()*100)
    let num2 = Math.floor(Math.random()*100)
    Captchainput.innerText  =  `${num1} + ${num2} = ?   `
    sum = num1+num2
    

}







