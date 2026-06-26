/* Custom Particles.js override tracking engine */
particlesJS("particles-js", {
  "particles": {
    "number": { 
      "value": 80 // Distant stars background catalog count
    },
    "color": { 
      "value": "#888888" 
    },
    "shape": { 
      "type": "circle" 
    },
    "opacity": { 
      "value": 0.4,
      "random": true // Simulates varying star magnitudes
    },
    "size": { 
      "value": 1.5,
      "random": true 
    },
    "line_linked": {
      "enable": true, // Draws the tracking lines between proximal nodes
      "distance": 130,
      "color": "#666666",
      "opacity": 0.25,
      "width": 0.8
    },
    "move": {
      "enable": true,
      "speed": 0.8, // Slow, elegant drift
      "direction": "right", // Simulates general orbital passing sweep
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": { 
        "enable": true, 
        "mode": "grab" // Converges tracking vectors seamlessly on your mouse pointer
      }
    },
    "modes": {
      "grab": { 
        "distance": 160, 
        "line_linked": { "opacity": 0.6 } 
      }
    }
  },
  "retina_detect": true
});
