/* High-Speed Multi-Directional Resident Space Object (RSO) Streak Layer */
(function() {
    window.addEventListener('load', () => {
        const targetDiv = document.getElementById('particles-js');
        if (!targetDiv) return;

        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none'; 
        targetDiv.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let rsos = [];
        const maxRSOs = 5; // Total active tracking signatures

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class SatTrack {
            constructor() {
                this.reset(true); // Initial scatter on page load
            }
            reset(initScatter = false) {
                this.history = [];
                this.maxHistory = Math.floor(Math.random() * 25) + 25; 
                this.radius = Math.random() * 1.5 + 1;
                
                // Determine a base movement speed profile
                const speed = Math.random() * 2.5 + 2; 
                // Random angle spanning the full 360-degree orbital grid
                const angle = Math.random() * Math.PI * 2; 
                
                // Break down speed into directional component vectors
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;

                if (initScatter) {
                    // Randomly scatter vectors directly inside the screen view space on first load
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                } else {
                    // Spawn objects just outside one of the 4 screen boundaries based on their path velocity
                    const startEdge = Math.floor(Math.random() * 4);
                    
                    if (startEdge === 0) { // Spawn off Left
                        this.x = -50;
                        this.y = Math.random() * canvas.height;
                        if (this.vx < 0) this.vx *= -1; // Force moving right
                    } else if (startEdge === 1) { // Spawn off Right
                        this.x = canvas.width + 50;
                        this.y = Math.random() * canvas.height;
                        if (this.vx > 0) this.vx *= -1; // Force moving left
                    } else if (startEdge === 2) { // Spawn off Top
                        this.x = Math.random() * canvas.width;
                        this.y = -50;
                        if (this.vy < 0) this.vy *= -1; // Force moving down
                    } else { // Spawn off Bottom
                        this.x = Math.random() * canvas.width;
                        this.y = canvas.height + 50;
                        if (this.vy > 0) this.vy *= -1; // Force moving up
                    }
                }
            }
            update() {
                // Record past tracking position coordinates for trail rendering
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxHistory) this.history.shift();

                // Propagate the orbital coordinates
                this.x += this.vx;
                this.y += this.vy;

                // Recycle object if it flies out of the active observational tracking bounds
                if (this.x < -100 || this.x > canvas.width + 100 || 
                    this.y < -100 || this.y > canvas.height + 100) {
                    this.reset();
                }
            }
            draw() {
                if (this.history.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                    
                    // Create an explicit directional linear gradient trail
                    let gradient = ctx.createLinearGradient(this.history[0].x, this.history[0].y, this.x, this.y);
                    gradient.addColorStop(0, 'rgba(0, 200, 255, 0.0)');
                    gradient.addColorStop(1, 'rgba(0, 180, 255, 0.4)');
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                // Render active target payload core node
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 220, 255, 0.9)';
                ctx.fill();
            }
        }

        for (let i = 0; i < maxRSOs; i++) {
            rsos.push(new SatTrack());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < rsos.length; i++) {
                rsos[i].update();
                rsos[i].draw();
            }
            requestAnimationFrame(animate);
        }
        animate();
    });
})();
