/* High-Speed Multi-Directional & Multi-Color Resident Space Object (RSO) Streak Layer */
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
        const maxRSOs = 5; 

        // Catalog array of high-visibility aerospace instrument tracking colors
        const trackingColors = [
            { core: 'rgba(0, 220, 255, 0.9)', trail: 'rgba(0, 180, 255, 0.4)' },   // Cyan
            { core: 'rgba(0, 255, 150, 0.9)', trail: 'rgba(0, 255, 120, 0.4)' },   // Neon Green
            { core: 'rgba(255, 180, 0, 0.9)', trail: 'rgba(255, 150, 0, 0.4)' },   // Amber / Gold
            { core: 'rgba(255, 60, 100, 0.9)', trail: 'rgba(255, 40, 80, 0.4)' },   // Ruby Red
            { core: 'rgba(200, 100, 255, 0.9)', trail: 'rgba(180, 80, 255, 0.4)' }  // Electric Purple
        ];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class SatTrack {
            constructor() {
                this.reset();
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
            reset() {
                this.history = [];
                this.maxHistory = Math.floor(Math.random() * 25) + 25; 
                this.radius = Math.random() * 1.5 + 1;
                
                // Select a random color profile for this target configuration lifecycle
                this.colorProfile = trackingColors[Math.floor(Math.random() * trackingColors.length)];
                
                const baseSpeed = Math.random() * 2.5 + 2; 
                const edge = Math.floor(Math.random() * 4); 
                
                if (edge === 0) { 
                    this.x = -40;
                    this.y = Math.random() * canvas.height;
                    this.vx = baseSpeed;
                    this.vy = (Math.random() - 0.5) * 1; 
                } else if (edge === 1) { 
                    this.x = canvas.width + 40;
                    this.y = Math.random() * canvas.height;
                    this.vx = -baseSpeed;
                    this.vy = (Math.random() - 0.5) * 1;
                } else if (edge === 2) { 
                    this.x = Math.random() * canvas.width;
                    this.y = -40;
                    this.vx = (Math.random() - 0.5) * 1;
                    this.vy = baseSpeed;
                } else { 
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + 40;
                    this.vx = (Math.random() - 0.5) * 1;
                    this.vy = -baseSpeed;
                }
            }
            update() {
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxHistory) this.history.shift();

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -150 || this.x > canvas.width + 150 || 
                    this.y < -150 || this.y > canvas.height + 150) {
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
                    
                    let gradient = ctx.createLinearGradient(this.history[0].x, this.history[0].y, this.x, this.y);
                    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
                    gradient.addColorStop(1, this.colorProfile.trail);
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.colorProfile.core;
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
