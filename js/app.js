
$(document).ready(function(){
	// Initial 
	var newQuizz = new Quizz();
	newQuizz.init();  

	// Animation
	$(".styleTitle").fadeIn(1000);
	$(".styleQuestion").delay(500).fadeIn(2000);
	$(".styleChoices").delay(1500).slideDown(500);
	$(".styleStatus").delay(1500).fadeIn(500);
 
	// Elements Events 
	$(".styleChoices").on("click", ".buttonChoice", function(e){
		newQuizz.click($(this).val());
	});
	$(".buttonReset").on("click", function(){
		newQuizz.numQuestion = 0;
		newQuizz.reset();
	});
	$(".buttonNext").on("click", function(){
		newQuizz.next();
	}); 
}); 

// ======================================================

function Quizz(totalQuestion){

	// Set Variables
	this.data = quizzData;	// file -> data.js
	this.totalQuestion = totalQuestion || Object.keys(quizzData).length;
	
	this.correct = 0; 
	this.numQuestion = 0;
	this.answered = false;

	// Create Element Title
	this.Etitle = document.createElement('div');
	this.Etitle.setAttribute("class","styleTitle");
	this.Etitle.innerHTML = "<font size=5>Welcome to...</font><br>"+multiColor("Google Quizz!");
	
	// Create Element Question
	this.Equestion = document.createElement('div');
	this.Equestion.innerHTML = "Question: ";
	this.Equestion.setAttribute("class","styleQuestion");

	// Create Elements Choices
	this.EChoices = document.createElement('div');
	this.EChoices.innerHTML = "Choices: ";
	this.EChoices.setAttribute("class","styleChoices");

	// Create Element Message
	this.EStatus = document.createElement('div');
	this.EStatus.setAttribute("class","styleStatus");

	// Create Element Panel
	this.EPanel = document.createElement('div'); 
	this.EPanel.innerHTML = "<input type='button' class='buttonReset' value='Reset'> <input type='button' class='buttonNext' value='Next'> ";
	this.EPanel.setAttribute("class","stylePanel");

	// Reset Question
	this.reset = function(){
		this.correct = 0;
		this.numQuestion++;
		this.EStatus.innerHTML = "Waiting for an answer...";
		this.answered=false;
		this.current();
	}

	this.next = function(){ 
		if (this.numQuestion >= this.totalQuestion) {
			this.numQuestion=0;  
			this.EStatus.innerHTML = "Congratulation! You've completed the Quizz";
			return; 
		}
		this.numQuestion++;
		this.EStatus.innerHTML = "Waiting for an answer...";
		this.EPanel.style.display = "none"; 
		this.answered=false;
		this.current(); 
	}
 
	// Display current Question
	this.current = function(){
		var list = this.data["q"+this.numQuestion].choices;
		var output = "";

		// Generate Question
		this.Equestion.innerHTML = "Question #"+this.numQuestion+": "+this.data["q"+this.numQuestion].question;

		// Generate Choices
		for (var a=0; a<list.length; a++){
			output+= "<input type='button' class='buttonChoice' value='"+list[a]+"'>";
		}
		this.EChoices.innerHTML = output;
	}

	// Event for Choices buttons
	this.click = function(choice){
		if (this.answered==true) return;
		var status;
		var answer=this.data["q"+this.numQuestion].answer;

		if (answer==choice){
			msg = "Your answer is Correct! <br>";
			this.correct++;
		}else{
			msg = "Your answer is Incorrect! <br>";
		}
		
		status = msg+ "<br> Correct Answer: "+this.correct+"<BR>("+this.numQuestion+ "/"+this.totalQuestion+") ";
		
		this.EStatus.innerHTML=status;
		$(".stylePanel").fadeIn(500);
		this.answered=true;
	}

	 // Run the initial function
	this.init = function(){
		// Append Elements
		document.body.appendChild(this.Etitle);
		document.body.appendChild(this.Equestion);
		document.body.appendChild(this.EChoices);
		document.body.appendChild(this.EStatus);
		document.body.appendChild(this.EPanel);
		this.reset();
	}
}

function multiColor (text,colorList){
	var cIndex=0, output="";
	var text = text || "Google";
	var colorList = colorList || ["blue","red","yellow","blue","green","red"];

	for (var a=0;a<text.length;a++){
		output += "<font color='"+colorList[cIndex]+"'>"+text.charAt(a)+"</font>";
		// console.log(a + ": "+output);
		cIndex++;
		if (cIndex >= colorList.length) cIndex=0;
	}

	return output;
}