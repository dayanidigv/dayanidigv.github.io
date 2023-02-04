//.......................................................................declaretions.................................................
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
var spinner = document.getElementById("spinner");
var Output = "";
var lang = "";

//.................................................get questions in json file to display random question..................................................
let file = "questions.json"
fetch (file)
.then(x => x.text())
.then(y => {
     let jsons = JSON.parse(y);
    q_uestion = jsons.question[Math.floor(Math.random()*20)];
    //console.log(q_uestion);
    document.getElementById("Question").innerHTML = q_uestion;
});


//.................................................Set Editor font Size.................................................
editor.setFontSize(15);

		
//.................................................Set Editortheme...................................................
editor.setTheme("ace/theme/ambiance");
themeSelect.addEventListener("change", function() {
    editor.setTheme(this.value);
});

//.................................................view questions..................................................
function openModal() {
        questionModal.style.display = "block";
	question.style.display = "none";
		
    }
//.................................................Hide questions..................................................
function closeModal() {
        questionModal.style.display = "none";
	question.style.display = "block";
		
}



// .................................................update letter count and line count..................................................
editor.getSession().on("change", function() {
  letterCount.innerHTML = editor.getValue().length;
  lineCount.innerHTML = editor.getSession().getLength();
});

//.................................................get Code Language and set editor Mode....................................................
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



//................................................Run Function...................................................
let RunTime = 0;
let dataArray = [];
runButton.addEventListener("click", function() {
	if(languageSelect.value != ""){
		RunTime++;
		spinner.style.display = "block";
		outputArea.style.display = "none";
		//Use fetch API to send a POST request to get output...
		fetch('https://api.codex.jaagrav.in/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ language: lang, code: editor.getValue(), input: inputArea.value })
		})
		.then(res => res.json())
		.then(data => {
		spinner.style.display = "none";
		outputArea.style.display = "block";
			
		// Display the output in the "outputArea" element
		if (data.output != ""){
		outputArea.value = data.output;
		Output = data.output;
		}
		else{
		outputArea.value = data.error;
		Output = data.error;
		}
		const codeLength = editor.getSession().getLength();
       		const codeValueCount = editor.getValue().length;
		// Store the data for each run in array
		dataArray.push({
			runtime: RunTime,
			line: codeLength,
			lettercount: codeValueCount,
			code: editor.getValue(),
			input: inputArea.value,
			output: Output,
			language: lang
		});
			
		// Store the data in session storage
		sessionStorage.setItem("dataArray", JSON.stringify(dataArray));
		}).catch(err => {
			console.error(err);
		});
	}
	else{
		alert("select code language!");
	}
});

//.................................................remove the dataArray in session storage if the page is reloaded.................................................
sessionStorage.removeItem("dataArray")
//Submit function to get LAT report...
function getdata(){
	if(RunTime >= 0)
	{
		let msg = "confirmation to submit";
		if (confirm(msg) == true){
			if(confirm("Submit Successfully \n\n You want to download your report?") == true)
			{
				const fileName = prompt("change to file name...", "LAT_report.pdf");
				if(fileName != null)
				{
						let editorLength = editor.getSession().getLength();
       					let editorValue = editor.getValue().length;
      					let input = inputArea.value;
        				let output = Output;
        				let result = "Question : "+ q_uestion + "\n\nTotal Time = " + value+ "\nQuestion view Time = "+ value1+ "\nTotal Run Counts = "+ RunTime+ "\n" ;
   
					let dataArray = JSON.parse(sessionStorage.getItem("dataArray"));
					dataArray.forEach(data => {
					result += "\n------------------------------------------------------------------------------------------------------" + "\nReport runtime: " + data.runtime +  "\nLanguage: " + data.language + "\nTotal Lines = "+ data.line+ "\nTotal Letters = "+ data.lettercount + "\nCode: \n\n" + data.code + "\n\nInput:\n" + data.input + "\n\nOutput:\n" + data.output  ;
					});
					// Create the pdf
					let doc = new jsPDF();
					// Get the width of the page 
					let pageWidth = doc.internal.pageSize.width; 
					// Calculate the center position 
					let center = pageWidth / 2; 
					// Write the "LAT Report" text centered on the page 
					doc.text("LAT Report", center, 5, { align: "center" });
				    let linesPerPage = 44; // change this to adjust the number of lines per page 
					let lines = result.split('\n');
					for (let i = 0; i < lines.length; i += linesPerPage) {
						doc.text(lines.slice(i, i + linesPerPage).join('\n'), 10, 15);
						if (i + linesPerPage < lines.length) {
							doc.addPage();
						}
					}

       					 // Save the pdf
        				doc.save(fileName, {download: true});
	    			}
	   		 }
   		 }
   		 else{
      			  alert("Submit canceled");
    		}
	}
	else{
		alert("Code is not Run");
	}
}

	
//*****************************************************************Start Time functions*****************************************************************
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
QTime()
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

//Question view Time...
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

//*****************************************************************End Time functions*****************************************************************
