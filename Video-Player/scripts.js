// --------------- Get our elements ------------------------
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// --------------- Build our functions --------------------- 
function togglePlay() {
    const method = video.paused ? 'play' : 'pause'; // Uses in built paused method to check if video is paused or playing 
    video[method](); // calling the variable
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('Update the button')
}

function skip() {
    // console.log(this.dataset.skip) // accessing the value skip from the dataset to give 25 or -10. Needs to be defined as dataset in order to access that specific element 
    video.currentTime += parseFloat(this.dataset.skip) // parseFloat converts it into a true number which you can use to increment/decrement(if negative) you video according to where it is
}

function handleRangeUpdate() {
    video[this.name] = this.value
    console.log(this.name);
    console.log(this.value)
}

function handleProgress() {
    // current time and duration are properties on that video
    const percent = (video.currentTime / video.duration) * 100 // multiply by 100 to get a percent
    progressBar.style.flexBasis = `${percent}%`  // flex basis gives us the percentage of how far the progress of the video is. 
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(e);
    video.currentTime = scrubTime;
}

// ----------------Hook up the event listeners ----------------
video.addEventListener('click', togglePlay); // Play/Pause function for when we click on the video 
video.addEventListener('play', updateButton); // Changes the button icon to play upon play  
video.addEventListener('pause', updateButton); // Changes the button icon to pause upon pause  
toggle.addEventListener('click', togglePlay); // Play/Pause function for when we click on the play button 
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)) // Listens for a change event in the volume controls and playback rates
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)) // Listens for a change event in the volume controls 
video.addEventListener('timeupdate', handleProgress); // Triggers when video is updating its time code 
let mousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)) // check to see if the mouse down is true before initiating scrub
progress.addEventListener('mousedown', () => mousedown = true) // Mouse down means mouse is clicked
progress.addEventListener('mouseup', () => mousedown = false) // Mouse up means mouse is not clicked
