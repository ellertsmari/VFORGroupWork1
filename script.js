// Define variables at the top
const revealVideo = document.getElementById('reveal-video');
const revealGroups = document.getElementById('reveal-groups');
const introImage = document.getElementById('intro-image');
const fightVideo = document.getElementById('fight-video');

let slideIndex = 1;
showSlides(slideIndex);

// Console Easter Egg
console.log("%cLooking for a fight?", "font-size: 20px; color: red; font-weight: bold;");
console.log("Try clicking the picture of people fighting on the first slide...");

// ---------------------------------------------------------
// NEW EASTER EGG LOGIC
// ---------------------------------------------------------
if (introImage && fightVideo) {
    introImage.style.cursor = "pointer"; // Make it look clickable
    
    introImage.addEventListener('click', function() {
        console.log("FIGHT!");
        
        // Show and play the fight video
        fightVideo.style.display = "block";
        fightVideo.classList.add('fullscreen-video');
        fightVideo.style.zIndex = "2000"; // Ensure it's on top of everything
        fightVideo.currentTime = 0;
        fightVideo.play();
    });

    // Hide video when it ends
    fightVideo.onended = function() {
        fightVideo.style.display = "none";
        fightVideo.pause();
    };

    // Also hide if clicked (to exit early)
    fightVideo.addEventListener('click', function() {
        fightVideo.pause();
        fightVideo.style.display = "none";
    });
}

// ---------------------------------------------------------
// SLIDESHOW LOGIC
// ---------------------------------------------------------

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";

  // Video and Reveal Logic (Slide 2)
  if (revealVideo && revealGroups) {
      if (slideIndex === 2) { // 2nd Slide is the Reveal
          
          revealGroups.style.display = "none";
          revealVideo.style.display = "block";
          revealVideo.classList.add('fullscreen-video');
          revealVideo.currentTime = 0;
          
          // Play Video
          let playPromise = revealVideo.play();
          
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              revealVideo.muted = false;
            })
            .catch(error => {
              console.log("Autoplay prevented:", error);
              revealVideo.muted = true;
              revealVideo.play();
            });
          }

          revealVideo.onended = function() {
             revealVideo.style.display = "none";
             revealVideo.classList.remove('fullscreen-video');
             if (revealGroups) revealGroups.style.display = "block";
          };

      } else {
          // Leaving the slide
          revealVideo.pause();
          revealVideo.classList.remove('fullscreen-video');
      }
  }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        plusSlides(1);
    } else if (event.key === 'ArrowLeft') {
        plusSlides(-1);
    }
});
