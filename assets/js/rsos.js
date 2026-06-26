/* High-Speed Resident Space Object (RSO) Streak Layer */
(function() {
    // Wait for particles-js canvas to initialize so we can overlay safely
    window.addEventListener('load', () => {
        const targetDiv = document.getElementById('particles-js');
        if (!targetDiv) return;

        // Create a secondary overlay canvas for the streaking objects
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none'; // Lets clicks pass through to particles.js
        targetDiv.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let rsos = [];
        const maxRSOs = 4; // Number of active satellite streaks crossing at once

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class SatTrack {
            constructor() {
                this.reset();
                this.x = Math.random() * canvas.width; // Stagger initial load across viewport
            }
            reset() {
                this.x = -100;
                this.y = Math.random() * (canvas.height * 0.7); // Keep tracks in upper/mid atmosphere
                this.speed = Math.random() * 3 + 2; // Noticeably faster than background stars
                this.angle = (Math.random() - 0.1) * 0.15; // Realistic low-inclination path vector
                this.history = [];
                this.maxHistory = Math.floor(Math.random() * 30) + 25; // Controls length of the fading streak
            }
            update() {
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxHistory) this.history.shift();

                this.x += this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                if (this.x > canvas.width + 100) this.reset();
            }
            draw() {
                if (this.history.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                    
                    // High-contrast tracking colors (cyan/teal instrumented glow)
                    let gradient = ctx.createLinearGradient(this.history[0].x, this.history[0].y, this.x, this.y);
                    gradient.addColorStop(0, 'rgba(0, 210, 255, 0.0)');
                    gradient.addColorStop(1, 'rgba(0, 180, 255, 0.4)');
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                // Render active tracking beacon payload head
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 230, 255, 0.9)';
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
