

(function(win, doc){
    var poemSection = doc.getElementById("poem-section");
    var poemNav = doc.getElementById("poem-nav");

    function function1(){ //THIS WILL BUILD YOUR NAV BAR
        /*
        Hi Emily! The following code will build your nav bar automatically. It does this within any element with the tag "id = poem-nav".
        This works because the variable at the top uses the doc.getElementById function (with id as an input parameter) in order to fetch
        the element from a given page to populate with the code below. 

        To create the elements in javascript to then be put on the page when it's loaded, we use the "createElement" function. You can give
        this function the tag name (ex. p for a <p> element or section for a <section> element) to create that item as a javascript variable.

        After we create it, we use a host of functions to populate it (as described and performed below) and finally we use the "appendChild" function
        to append elements together(if we want to put a few we created in javascript together before putting it on the page) 
        and ultimately append it to our poem-nav element that we got from the document using it's id.

        All the code below recreates what you had written for your nav bar (your code shown below):
             <ul>
                 <li><a href="index.html">Back to Home</a></li>
                 <li><a href="poem2.html">Next Poem</a></li>
             </ul>
        */  



        //Creating the Back to Home button
        var ul = doc.createElement("ul");       // creating the outer "ul" wrapper
        var listItem1 = doc.createElement("li"); // Creating a li element 
        var buttonLink = doc.createElement("a"); // Creating the inner "a" element
        buttonLink.href = "index.html" // setting the href attribute to point to index.html
        buttonLink.innerText = "Back to Home " // setting the inner text of the element to "Back to Home"

        //Building the button up compositionally(i.e. nesting peice by peice)
        listItem1.appendChild(buttonLink); // adding the "a" to the "li"
        ul.appendChild(listItem1); // adding the "li" to the "ul"

        //But... we're not going to append it to the main "poemNav" element yet that would actually make it show up in the document
        //Next, we will add the second list element: the "next poem" button. We will do this in exactly the same way as the first one

        // We don't need to make a new ul element  and we will use differnet names for our new button elements so we don't overwrite the old ones
        var listItem2 = doc.createElement("li"); 
        var buttonLink2 = doc.createElement("a"); 
        buttonLink2.href = "poem2.html" 
        buttonLink2.innerText = "Next Poem" 

        //Building the second button up compositionally again
        listItem1.appendChild(buttonLink2); // adding the "a" to the "li"
        ul.appendChild(listItem2); // adding the "li" to the "ul"

        //Now we've made everything we need to. So we will add the ul element that now contains both of your buttons, and add it to the nav element in our document
        // that we had given the id of "poem-nav" which we used to retreive it fromthe document with the doc.getElementByID function.
        poemNav.appendChild(ul);

        //Eureka! We've added our nav buttons with Javascript!!! 
        //But, this is kind of simplifed and broken down so it's easily understandable
        //A few limiation of this implementation include:
        /*
        1. This, if applied to each page, would always have "next poem" link back to poem2.html since it's hard coded in. 
            We can devise another function that can "calculate" which poem it should point to next.
        2. We can make this even more automatic than before, cause right now we have to name all our elements differently. 
            This is best so I could show you how it works, but we can make another version that is even more seamless. 
        */
    }


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

        fetch('poems/poem1.json') //This uses the fetch function to get the json file
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
            }

            if(i == json.length-1) {
                newParagraph.appendChild(spacer);
                poemSection.appendChild(newParagraph); 
            }
        })


    }






    //Here we will call all of the functions we made above. By doing this, we are actually telling the file to run the functions.
    function1();
    function2();


}
)

(window, document);