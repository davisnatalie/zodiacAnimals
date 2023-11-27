// Chinese Zodiac Animals


const section = document.querySelector('section');

// making the set of 12 Chinese Zodiac Animals
// Now that we have that working, let's use a loop to make all 12 divs.

// 14. Wrap the code that made the div in a for loop that runs 12 times. For text output, number the divs with the counter, **i**:

// moved to top of scope since const playSound isn't hoisted
// doesn't work do "this" not being recognized in arrow func
// const playSound = () => {
//     sound.pause(); // stop the sound that may be playing
//     sound.src = `audio/${this.eng}.mp3`;
//     sound.play();
// }

// for(let i = 0; i < 12; i++) {
animals.forEach((animal, i) => {
    
    const divvy = document.createElement('div');
    divvy.className = 'divvy';
    // divvy.textContent = 'div ' + i;
    section.appendChild(divvy);

    // 15. Reload the page. All 12 divs should appear, in two rows of six. The divvy class has *display: inline-block* to arrange the divs side-by-side.

    // 23. We will be using the **animals** array a lot, so to simplify property access, save the current animal **animals[i]** to a variable, **animal**. Update the concatenation to use the more streamlined **animal.eng**:
    // let animal = animals[i]; // replaced by forEach()

    // 16. Still in the loop, make an image for each div, using*new Image():
    const pic = new Image();

    // 17. Set the source of the image to **cow.jpg**. The result will be 12 cows: 
    // pic.src = 'images/animals/cow.jpg';

    // 21. Change the source to be dynamic, so that we get all 12 animals--not just the cow. Concatenate the **eng** property into the file path. The current animal is available as **animals[i]** and its English name is **animals[i].eng**:
    // 22. Reload the page. We should have 12 divs, each with a different animal.
    pic.src = `images/animals/${animal.eng}.jpg`;

    // 18. Apply the **.animal-pic** class to the image:
    pic.className = 'animal-pic';

    // 19. Delete the text and output the image inside the div. In terms of nesting, **divvy** goes inside **section** and **pic** goes inside **divvy**:
    divvy.textContent = '';
    divvy.appendChild(pic);

    // 24. Still in the loop, make the **input** box:
    const inputBox = document.createElement('input');

    // 25. Assign the input box a type of **search**. This will give the box a little X to clear it, and it also provides a **search** event, which fires when the user hits Enter: 
    inputBox.type = 'search';

    // 26. Assign the box a **placeholder** to prompt the user to enter the animal name:
    inputBox.placeholder = 'name';

    // 27. Assign **eng**, **chi** and **also** properties to the input box. These will be used by the **checkSpelling** function to see if the user input matches any of the three accepted spellings:
    inputBox.eng = animal.eng;
    inputBox.chi = animal.chi;
    inputBox.also = animal.also;

    // 28. Also save the current index as a property of the input box. This will come in handy down the road (next lesson):
    inputBox.indx = i;

    // 29. Have the input box call the function when its search event is fired:
    inputBox.addEventListener('search', checkSpelling);

    // 30. Also the input box call the function on **blur**, and event which fires when the user hits **Tab** to leave an input box. Tab moves the cursor to the next input box, so it's a handy way to navigate from one animal div to the next:
    inputBox.addEventListener('blur', checkSpelling);

    // 31. Output the input box to the div. It will appear under the animal image:
    divvy.appendChild(inputBox);

    // make the image to hold the Chinese character
    const chineseChar = new Image();
    chineseChar.src = `images/chars/char-${animal.chi}.jpg`;
    chineseChar.className = 'chinese-char';
    divvy.appendChild(chineseChar);

    // Chinese Zodiac Years: 

    const pTag = document.createElement('p');
    pTag.className = 'zodiac-year';
    divvy.appendChild(pTag);

    let yearSeries = (animal.year - 156) + " "; // start w the starting year, which is 144 years before the nearest animal year
    for(let y = 144; y >= -12; y-=12) {
        yearSeries += (animal.year - y) + " ";
    }

    pTag.textContent = yearSeries;

    // make a span tag to hold the English name of the animal
    const pinyin = document.createElement('span');
    pinyin.className = 'pinyin';
    pinyin.innerHTML = animal.pin;
    pinyin.id = 'pin' + i; // pin0, pin1, pin2 ... 
    divvy.appendChild(pinyin);

    // make a span tag to hold the English name of the animal
    const english = document.createElement('span');
    english.className = 'english';
    english.textContent = animal.eng;
    english.id = 'eng' + i; // eng0, eng1, eng2, ... eng10, eng11
    divvy.appendChild(english);

    // make the image to hold the sound icon
    const soundIcon = new Image();
    soundIcon.src = "images/sound-icon.png";
    soundIcon.className = 'sound-icon';
    soundIcon.eng = animal.eng;
    // attempt to make playSound function recognizable "this" as soundIcon 
    // soundIcon.addEventListener('click', playSound.bind(this));
    soundIcon.addEventListener('click', playSound);
    divvy.appendChild(soundIcon);

// } // end loop
}); // end forEach()

// instantiate an Audio object -- only have ONE so that only ONE sound can ever play at a time
const sound = new Audio();

// convert function playSound() to arrow function just for sake of comparison (arrow func not necessarily better BUT some programmers prefer that way of writing funcs) -- CAVEAT: this has implications for hoisting..!

function playSound() {
// Error: Cannot access 'playSound' before initialization
// const playSound = () => {
    sound.pause(); // stop the sound that may be playing
    sound.src = `audio/${this.eng}.mp3`;
    sound.play();
}

// 20. Reload the page. We should have 12 divs, each with the cow.

// We need to make the **checkSpelling** function before reloading the page in the browser. If the function referred to in the listener does not exist at that point, we'll get an error.

// this keyword

// Inside a function, the **this** keyword refers to the object that called the function. In the **checkSpelling** function, **this** is the input box:

// 32. Define the **checkSpelling** function and start by getting the **value** of the input element--whatever the user typed into the box:
function checkSpelling() {

    let input = this.value;

    // 33. Compare the user input to the English, pinyin and alternate (also) spelling. The user input needs to match *one* of the three correct spellings:
    if(input == this.eng || input == this.chi || input == this.also) {
        // 34. If user input is correct, turn input box green; else turn box red:
        this.style.backgroundColor = '#0B0';
        this.style.color = '#fff';
        // show english spelling when animal name is spelled correctly
        let engTagId = "eng" + this.indx; // eng0, eng1, eng2
        document.getElementById(engTagId).style.display = "inline"; // show the english
        let pinTagId = "pin" + this.indx; // pin0, pin1, pin2
        document.getElementById(pinTagId).style.display = "inline"; // show the pinyin
    } else {
        this.style.backgroundColor = '#921';
        this.style.color = '#fff';
    }
}
 
// 35. Reload the page. Each box should have an animal pic and an input box.

// 36. Enter a spelling in a box and hit Enter. 
// - if the spelling is correct, the input box turns green. 
// - else, the spelling is incorret, so the box turns red.

// END: Lesson 06.02
// NEXT: Lesson 06.03