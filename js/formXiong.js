 //maxLength
 function keyupForMaxLength(obj, num) {
     if (obj.value == "")
         return;

     if (obj.value.length > num)
         obj.value = (obj.value2) ? obj.value2 : '';
     else
         obj.value2 = obj.value;
 }


 function keyupForNum(obj) {
     var c = obj;
     if (/[^\d]/.test(c.val())) { //替换非数字字符
         var temp_amount = c.val().replace(/[^\d]/g, '');
         obj.val(temp_amount);
     }
 }

 //小数点前七位，小数点后两位
 function keyupForFloatFormat(obj) {
     if (obj.value == "")
         return;
     if (obj.value.search(/^\d{0,7}(?:\.\d{0,2})?$/) == -1)
         obj.value = (obj.value2) ? obj.value2 : '';
     else
         obj.value2 = obj.value;
 }

 function keyupForFloat(obj) {
     if (obj.value == "")
         return;
     if (obj.value.search(/^\d*(?:\.\d*)?$/) == -1)
         obj.value = (obj.value2) ? obj.value2 : '';
     else
         obj.value2 = obj.value;
 }
 //七位数字
 function keyupForNumFormat(obj) {
     if (obj.value == "")
         return;
     if (obj.value.search(/^\d{0,7}$/) == -1)
         obj.value = (obj.value2) ? obj.value2 : '';
     else
         obj.value2 = obj.value;
 }

 function keyupForNumLen(obj,len) {
     var c = obj;
	 var temp_amount ;
     if (/[^\d]/.test(c.val())) { //替换非数字字符
         temp_amount = c.val().replace(/[^\d]/g, ''); 
     }else{
		 temp_amount =c.val();
	 }
	 if(temp_amount.length>len){
		 temp_amount =temp_amount.substring(0,len);
	 }
	  obj.val(temp_amount);
 }
 $('.onlyFloat').live('keyup', function() {
     keyupForFloat(this);
 });
 $('.onlyFloatFormat').live('keyup', function() {
     keyupForFloatFormat(this);
 });
 $('.onlyNum').live('keyup', function() {
     keyupForNum($(this));
 });
 $('.onlyNumFormat').live('keyup', function() {
     keyupForNumFormat(this);
 });