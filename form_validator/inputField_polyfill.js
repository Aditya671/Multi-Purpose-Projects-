function InputText(value,type,className,id,labelName){
   this.value = value,
   this.type = type,
   this.className = className,
   this.id = id,
   this.labelName = labelName
   this.min = minLength || null,
   this.max = maxLength || null
}
InputText.proptotype.min = function(){
   
}