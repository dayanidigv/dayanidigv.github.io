
var editor = ace.edit("editor");
var questionModal = document.getElementById("questionModal");
var question = document.getElementById("question");
var codeArea = document.getElementById("editor");
var inputArea = document.getElementById("input-area");
var outputArea = document.getElementById("output-area");
var runButton = document.getElementById("run-button");
var languageSelect = document.getElementById("language-select");
var themeSelect = document.getElementById("theme-select");
var letterCount = document.getElementById("letter-count");
var lineCount = document.getElementById("line-count");
var Output = "";
var lang = "";
var RunTime = 0;

editor.setFontSize(15);
editor.setTheme("ace/theme/ambiance");
		



    function openModal() {
        questionModal.style.display = "block";
		question.style.display = "none";
		
    }

    function closeModal() {
        questionModal.style.display = "none";
		question.style.display = "block";
		
    }



//Add event listener on editor change to update letter count and line count
editor.getSession().on("change", function() {
  letterCount.innerHTML = editor.getValue().length;
  lineCount.innerHTML = editor.getSession().getLength();
});

languageSelect.addEventListener("change", function() {
	
	if (this.value == "python")
	{
		editor.session.setMode("ace/mode/python");
		lang = "py";
	}
	else if (this.value == "java")
	{
		editor.session.setMode("ace/mode/java");
		lang = "java";
	}
	else if (this.value == "c")
	{
		editor.session.setMode("ace/mode/c_cpp");
		lang = "c";
	}
	else if (this.value == "cpp")
	{
		editor.session.setMode("ace/mode/c_cpp");
		lang = "cpp";
	}
	else if(this.value == "cs")
	{
		editor.session.setMode("ace/mode/csharp");
		lang = "cs";
	}
    
});

// Use fetch API to send a POST request to the specified URL
runButton.addEventListener("click", function() {
	if(languageSelect.value != ""){
		RunTime = RunTime + 1;
		fetch('https://api.codex.jaagrav.in/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ language: lang, code: editor.getValue(), input: inputArea.value })
		})
		.then(res => res.json())
		.then(data => {
			// Display the output in the "outputArea" element
			if (data.output != ""){
				outputArea.value = data.output;
				Output = data.output;
			}
			else{
				outputArea.value = data.error;
				Output = data.error;
			}
		})
		.catch(err => {
			console.error(err);
		});
	}
	else{
		alert("select code language!");
	}
});

function getdata(){

	let msg = "confirmation to submit";
	if (confirm(msg) == true){
	
	alert("Total Time = "  +  value + "\nQuestion view Time = "  +  value1+ "\nTotal Run Counts = "  +  RunTime  +  "\nTotal Lines = "  +  editor.getSession().getLength() + "\nTotal Letters = "+editor.getValue().length+ "\n Language = "+lang);
    alert("Code:\n"+editor.getValue());
    alert("Input:\n"+inputArea.value);
	alert("Output:\n"+Output);
  const fs = require("fs");
  fs.readFile("/file_27.html","utf8",(err,data)=>{
    if(err){alert(err);return;}
    alert("hello");
  });
	}
	else{
	alert("Submit canceled");
	}

}

themeSelect.addEventListener("change", function() {
    editor.setTheme(this.value);
});

       
	

var s = 0;
var m = 0;
var h = 0;
var value = "";
var S1 = 0;
var M1 = 0;
var H1 = 0;
var value1 = "";
var time = "";

Time()

function Time(){
	if(s <60 && m==0 ){
		value = s + "s ";
		time = s + "s ";
		if(s==59){
			s=0;m = m+1;}
		else{
			s = s + 1;}
	}
	else if (m <60 && h==0 ){
		value =  m+"m"+s + "s ";
		time =m + "m" + s + "s ";
		if(s==59){
			s=0;m=m+1}
		else if(m==59){
			m=0;}
		else{
			s = s + 1;}
	}
	else{
		value = h + "h" + m + "m" + s + "s ";
		time = h + "h" + m + "m" + s + "s ";
		if(s==59){
			s=0;m=m+1}
		else if(m==59){
			m=0;h=h+1}
		else {
			s = s + 1;}
	}
	
	if(questionModal.style.display == "block"){
		QTime();
	}
document.getElementById("time").innerHTML =value;
setTimeout(() => {
	Time()
}, 1000);	
}


function QTime(){
	if(S1 <60 && M1==0 ){
		value1 = S1 + "s ";
		
		if(S1==59){
			S1=0;M1 = M1+1;}
		else{
			S1 = S1 + 1;}
	}
	else if (M1 <60 &&  H1==0 ){
		value1 =  M1 +"m"+S1 + "s ";
		
		if(S1==59){
			S1=0;M1 = M1 +1}
		else if(M1 ==59){
			M1=0;}
		else{
			S1 = S1 + 1;}
	}
	else{
		value1 = H1 + "h" + M1 + "m" + S1 + "s ";
		
		if(S1==59){
			S1=0;M1 =M+1}
		else if(M1==59){
			M1=0;M1=M1+1}
		else {
			S1 = S1 + 1;}
	}
	
	
document.getElementById("questionTime").innerHTML =value1;
	
}

