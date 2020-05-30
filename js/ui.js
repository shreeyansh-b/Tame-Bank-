anime({
    targets: '.background__pig',
    translateX: 50,
    easing: 'easeInOutExpo',
    direction: 'alternate',
    loop: true
});

anime({
  targets: '.background__stroked',
  scale: [1, 4],
  rotateZ: [0, 360],
  duration: 400000,
  direction: 'alternate',
  loop: true
});


anime({
  targets: '.background__filled',
  translateX: '60vw',
  translateY: '50vh',
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: [-360, 360],
  delay: function() { return anime.random(0, 400); },
  direction: 'alternate',
  duration: 600000,
  loop: true
});
anime({
  targets: '.background__filled-2',
  translateX: '20vw',
  translateY: '80vh',
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: [-360, 360],
  delay: function() { return anime.random(0, 400); },
  direction: 'alternate',
  delay: 500,
  duration: 800000,
  loop: true
});



//particles

var options = {
  "particles": {
    "number": {
      "value": 28,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#c200be"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.15782952832645453,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 0.07992007992007992,
        "opacity_min": 0.07192807192807193,
        "sync": false
      }
    },
    "size": {
      "value": 23.67442924896818,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 40,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 2000,
        "rotateY": 1100
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};
particlesJS("particle", options);


//login animation  @ https://blog.prototypr.io/how-to-create-the-snake-highlight-animation-with-anime-js-bf9c6cb66434

// var current = null;
// document.querySelector('#uID').addEventListener('focus', function(e) {
//   if (current) current.pause();
//   current = anime({
//     targets: 'path',
//     strokeDashoffset: {
//       value: 0,
//       duration: 700,
//       easing: 'easeOutQuart'
//     },
//     strokeDasharray: {
//       value: '240 1386',
//       duration: 700,
//       easing: 'easeOutQuart'
//     }
//   });
// });
// document.querySelector('#pass').addEventListener('focus', function(e) {
//   if (current) current.pause();
//   current = anime({
//     targets: 'path',
//     strokeDashoffset: {
//       value: -336,
//       duration: 700,
//       easing: 'easeOutQuart'
//     },
//     strokeDasharray: {
//       value: '240 1386',
//       duration: 700,
//       easing: 'easeOutQuart'
//     }
//   });
// });
// document.querySelector('#user_signin').addEventListener('focus', function(e) {
//   if (current) current.pause();
//   current = anime({
//     targets: 'path',
//     strokeDashoffset: {
//       value: -730,
//       duration: 700,
//       easing: 'easeOutQuart'
//     },
//     strokeDasharray: {
//       value: '530 1386',
//       duration: 700,
//       easing: 'easeOutQuart'
//     }
//   });
// });







