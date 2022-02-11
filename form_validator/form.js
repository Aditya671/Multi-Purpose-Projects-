const form = document.querySelector("#form");
const inputSubmitControl = document.querySelectorAll('.form-control');
const textField = document.querySelectorAll('input');
const inputRequired = document.querySelectorAll('.isRequired');

textField.forEach(function(ele){
   ['keypress','keydown','keyup'].forEach(function(eve){
      ele.addEventListener(eve,function(){ 
         let prevClass = ele.getAttribute('class'); 
         let value = ele.value;
         let labelName = ele.getAttribute('label') || ele.id;
         let eleId = ele.getAttribute('id');
         let minLength = ele.getAttribute('min') || null;
         let maxLength = ele.getAttribute('max') || null;
         if(ele.id === 'confirm_password'){
            let mainpass = document.getElementById('password').value;
            let checkPass = document.getElementById('confirm_password').value;
            if(!checkPass.match(mainpass)){
               ele.parentElement.children[2].children[0].innerHTML =  `${labelName} is not same as the password`   
            }
         }
         else if(prevClass.includes('isRequired') && value.length < 1){
            ele.className = 'form-control isRequired form-error-border';
            // ele.style.padding ='2px 0 0 4px';
            ele.parentElement.children[2].children[0].innerHTML =  `${labelName} should not be empty`
         }
         else if(minLength !== null && value.length < minLength){
            ele.className = 'form-control isRequired form-error-border';
            // ele.style.padding ='2px 0 0 4px';
            ele.parentElement.children[2].children[0].innerHTML =  `${labelName} should not be less than ${minLength}`
         }
         else if(maxLength !== null && value.length > maxLength){
            ele.className = 'form-control isRequired form-error-border';
            // ele.style.padding ='2px 0 0 4px';
            ele.parentElement.children[2].children[0].innerHTML =  `${labelName} should not be less than ${maxLength}`
            return;
         }
         else{
            eleId.className = 'form-control isRequired';
            ele.parentElement.children[2].children[0].innerHTML = ''
            ele.parentElement.children[2].children[0].style.padding = '0'            
         }
      })
   })      
});


form.addEventListener('submit',function (ele) { 
   ele.preventDefault();
   ele.currentTarget.childNodes.forEach(function(ele) {
      if(ele.className === 'form-group'){
         if(ele.children.length > 1){
            if(ele.children[1].nodeName === 'INPUT' || ele.children[1].nodeName === 'TEXTAREA'){
               let field = ele.children[1];
               let fieldname = ele.children[0].innerHTML;
               console.log(field.parent)
               let inputValue = field.value;
               if(inputValue === ''){
                  alert('Please fill the ' + fieldname + ' field value');
                  return false;
               }
               if(field.hasAttributes('min')){
                  let min = field.getAttribute('min')
                  inputValue.length < min ? alert('length should be of '+min+' words') : true;
               }
               if(field.hasAttributes('max')){
                  let max = field.getAttribute('max')
                  inputValue.length < max ? alert('length should not exceed '+max+' words') : true;
               }
               
            }
         }
      }
   })
});



