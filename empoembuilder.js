

(function(win, doc){
    var poemSection = doc.getElementById("haikus-section");
    


    function function2(){ // THIS POPULATES YOUR POEM SECTION WITH THE POEM WRITTEN IN "POEM1.JSON" in the POEMS folder
        //Alrighty your highness Emily the Emibee, now we're going to populate the poemTEST.html file with your Poem 7, "All the Cabinets are Open".
        /*
            To begin, I have populated the file poem1.json with your poem. 
            Each element in a json file is sectioned of by {} brackets. Within those, there are "fields". 
            Each field can be accessed when you are accessing the json at a specific element. 
            One way of exactly how that is done is shown below, but keep in mind the process can be a little complex 
            so it's okay if it doesn't all make sense at first glance. 

            When you make your own .json files, you can format them however you want (i.e. eact element can have any number of fields). 
            I formatted poem1.json for each element to have a field called "Contents". 
            Each element represents a line of the poem so that it is easy to place the spacers between each paragraph.


            I devised what (at least I think) is a clever way to figure out where the spacers go that allows for a lot of flexibility.
            By having a field in the JSON titled "paragraph" we can store the current paragraph as a variable and anytime the loop detects a change, 
            it will first put in a spacer (the "COVID" class div -- and actually at this very moment I am JUST realizing you probably put COVID because of the 
            "spacer" that was social distancing. 10/10 big brain joke, took me a whole two days to get it...Bravo Emily, Bravo) before placing the first line of the next 
            paragraph.

            There are a muiltitude of ways to do this process, so this is just one method.
        */

        fetch('poems/haikus.json') //This uses the fetch function to get the json file
          .then((response) => response.json()) // This is not super intuitive, but it just turns the fetch repsonse into a json object we can use
          .then((json) => { //Here in this block is where we do all our work reading from the json file and populating the html element

            var currElement; // a recyclable variable we can use to store each json file element as we build each paragraph
            var currParagraphNum = 1; //To help us track where we need to place the breaks
            var oldNum = 1;

            //Premaking our spacer to use whenever we need to place a spacer during the loop
            var spacer = doc.createElement("div")
            spacer.className = "COVID";
            spacer.innerText = " ";
            var breakLine = doc.createElement("br"); // Making a reusable breakline element

            newParagraph = doc.createElement("div"); //A reusable element to
            newLine = doc.createElement("p");

            for (var i = 0; i < json.length; i++) {// A loop to go through each element in the json file


                currElement = json[i];//Storing the current element in our variable
                currParagraphNum = currElement.paragraph;

                if(oldNum != currParagraphNum){ // If the current element paragraph number is not equal to "curr paragraph", we add a spacer, and update currParagraph. And also the edge case for if we are adding the last paragraph.
                    newParagraph.appendChild(spacer);//Add the spacer

                    poemSection.appendChild(newParagraph); //We now add our constructed paragraph since we know it's completed since we've encountered an element from the next paragraph
                     
                    currParagraphNum = currElement.paragraph; //Update the current paragraph tracker

                    //Reset our varaibles so it creates new ones for later additions ,instead of moving the existing ones to new positions
                    newParagraph = doc.createElement("div"); //Reset our reusable newParagraph variable
                    spacer = doc.createElement("div") //Reset our spacer variable
                    spacer.className = "COVID";
                    spacer.innerText = " ";
                }
                newLine = doc.createElement("p");
                newLine.innerText += currElement.content;
                newParagraph.appendChild(newLine); //The [i] is what allows us to access the element at index i (i defined in our loop) of the json.
                // newParagraph.appendChild(breakLine); //Since we formatted our json so that each element is a line, we can safely add a breakline after appending each json[i].contnet
                //This serves as an example of how you can format the way you save things in order to make your job easier when you are actually coding and working with the data.
                oldNum = currParagraphNum;

                if(i == json.length-1) {
                    newParagraph.appendChild(spacer);
                    poemSection.appendChild(newParagraph); 
                }
            }
        })


    }






    //Here we will call all of the functions we made above. By doing this, we are actually telling the file to run the functions.
   
    function2();


}
)

(window, document);