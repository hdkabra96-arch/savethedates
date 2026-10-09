/**
 * Julia & Charles - Save the Date Web Application
 * Interactive Logic, 3D Drawer Animation, Countdown Timer, Audio Synthesizer, & RSVP System
 */

document.addEventListener('DOMContentLoaded', () => {

    // Target Wedding Date: Saturday, February 27, 2027 at 12:30:00
    const targetWeddingDate = new Date('2027-02-27T12:30:00').getTime();

    // DOM Elements
    const redBoxWrapper = document.getElementById('redBoxWrapper');
    const redBoxCover = document.getElementById('redBoxCover');
    const pullTab = document.getElementById('pullTab');
    
    // Nav & Controls
    const btnSimulateWhatsapp = document.getElementById('btnSimulateWhatsapp');
    const btnAudioToggle = document.getElementById('btnAudioToggle');
    const btnViewRsvps = document.getElementById('btnViewRsvps');
    const btnRefreshApp = document.getElementById('btnRefreshApp');

    // Sections
    const whatsappSimSection = document.getElementById('whatsappSimSection');
    const mainWebsiteSection = document.getElementById('mainWebsiteSection');
    const whatsappLinkCard = document.getElementById('whatsappLinkCard');
    const linkDirectOpen = document.getElementById('linkDirectOpen');
    const btnCloseWhatsapp = document.getElementById('btnCloseWhatsapp');

    // Modals
    const locationModal = document.getElementById('locationModal');
    const btnViewLocation = document.getElementById('btnViewLocation');
    const btnCloseLocationModal = document.getElementById('btnCloseLocationModal');

    const rsvpModal = document.getElementById('rsvpModal');
    const btnOpenRsvpModal = document.getElementById('btnOpenRsvpModal');
    const btnCloseRsvpModal = document.getElementById('btnCloseRsvpModal');
    const rsvpForm = document.getElementById('rsvpForm');

    const rsvpListModal = document.getElementById('rsvpListModal');
    const btnCloseRsvpListModal = document.getElementById('btnCloseRsvpListModal');
    const rsvpTableContainer = document.getElementById('rsvpTableContainer');
    const btnClearRsvps = document.getElementById('btnClearRsvps');

    // Countdown Elements
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');

    // Audio & Sound Effects
    let audioContext = null;
    let isMusicPlaying = false;
    let musicInterval = null;

    // ==========================================================================
    // 1. 3D RED BOX INTERACTIVE DRAWER LOGIC
    // ==========================================================================
    function toggleRedBox() {
        const isOpened = redBoxWrapper.classList.toggle('opened');
        
        if (isOpened) {
            playOpenSound();
            createBurstSparkles();
            // Scroll down slightly so drawer content is visible
            setTimeout(() => {
                const drawerElem = document.getElementById('redBoxDrawer');
                if (drawerElem) {
                    drawerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    }

    if (redBoxCover) redBoxCover.addEventListener('click', toggleRedBox);
    if (pullTab) pullTab.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleRedBox();
    });

    if (btnRefreshApp) {
        btnRefreshApp.addEventListener('click', () => {
            redBoxWrapper.classList.remove('opened');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 2. LIVE COUNTDOWN TIMER
    // ==========================================================================
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetWeddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
            if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
            if (cdMins) cdMins.textContent = String(minutes).padStart(2, '0');
            if (cdSecs) cdSecs.textContent = String(seconds).padStart(2, '0');
        } else {
            if (cdDays) cdDays.textContent = "00";
            if (cdHours) cdHours.textContent = "00";
            if (cdMins) cdMins.textContent = "00";
            if (cdSecs) cdSecs.textContent = "00";
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================================================
    // 3. WHATSAPP INTRO SIMULATION TRANSITION
    // ==========================================================================
    function showWhatsappIntro() {
        whatsappSimSection.classList.remove('hidden');
        mainWebsiteSection.classList.add('hidden');
        window.scrollTo(0, 0);
    }

    // Hero Video One-Time Play & Auto-Scroll Logic
    const heroSaveTheDateVideo = document.getElementById('heroSaveTheDateVideo');

    function scrollToNextSection() {
        const scrollContainer = document.querySelector('.scrollable-content');
        const drawerElem = document.getElementById('redBoxDrawer');
        if (scrollContainer && drawerElem) {
            drawerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (heroSaveTheDateVideo) {
        // When video finishes playing ONCE, automatically scroll down to reveal the rest!
        heroSaveTheDateVideo.addEventListener('ended', () => {
            scrollToNextSection();
        });

        // Also if user clicks anywhere on video wrapper, play/pause
        heroSaveTheDateVideo.parentElement.addEventListener('click', () => {
            if (heroSaveTheDateVideo.paused) {
                heroSaveTheDateVideo.play();
            } else {
                heroSaveTheDateVideo.pause();
            }
        });
    }

    function openMainWebsiteFromWhatsapp() {
        whatsappSimSection.classList.add('hidden');
        mainWebsiteSection.classList.remove('hidden');
        window.scrollTo(0, 0);

        if (heroSaveTheDateVideo) {
            heroSaveTheDateVideo.currentTime = 0;
            heroSaveTheDateVideo.muted = false; // Unmute original video audio track!
            heroSaveTheDateVideo.play().catch(e => console.log('Autoplay handled', e));
        }

        // Start background romantic music bits
        if (!isMusicPlaying) {
            startRomanticMelody();
        }

        // Ensure red box drawer is opened and synchronized
        if (!redBoxWrapper.classList.contains('opened')) {
            redBoxWrapper.classList.add('opened');
        }
    }

    if (btnSimulateWhatsapp) btnSimulateWhatsapp.addEventListener('click', showWhatsappIntro);
    if (btnCloseWhatsapp) btnCloseWhatsapp.addEventListener('click', openMainWebsiteFromWhatsapp);
    if (whatsappLinkCard) whatsappLinkCard.addEventListener('click', openMainWebsiteFromWhatsapp);
    if (linkDirectOpen) linkDirectOpen.addEventListener('click', (e) => {
        e.preventDefault();
        openMainWebsiteFromWhatsapp();
    });

    // ==========================================================================
    // 4. MODALS (Location, RSVP, Admin)
    // ==========================================================================

    // Location Modal
    if (btnViewLocation) {
        btnViewLocation.addEventListener('click', () => {
            locationModal.classList.remove('hidden');
        });
    }

    if (btnCloseLocationModal) {
        btnCloseLocationModal.addEventListener('click', () => {
            locationModal.classList.add('hidden');
        });
    }

    // RSVP Form Modal
    if (btnOpenRsvpModal) {
        btnOpenRsvpModal.addEventListener('click', () => {
            rsvpModal.classList.remove('hidden');
        });
    }

    if (btnCloseRsvpModal) {
        btnCloseRsvpModal.addEventListener('click', () => {
            rsvpModal.classList.add('hidden');
        });
    }

    // Close modal on outer click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.add('hidden');
            if (reactionVideoPlayer) reactionVideoPlayer.pause();
        }
    });

    // ==========================================================================
    // 5. RSVP FORM SUBMISSION & LOCALSTORAGE
    // ==========================================================================
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const guestName = document.getElementById('guestName').value;
            const guestEmail = document.getElementById('guestEmail').value;
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            const guestCount = document.getElementById('guestCount').value;
            const dietaryNotes = document.getElementById('dietaryNotes').value;
            const songRequest = document.getElementById('songRequest').value;

            const rsvpEntry = {
                id: Date.now(),
                name: guestName,
                email: guestEmail,
                attendance: attendance,
                guests: guestCount,
                dietary: dietaryNotes || 'None',
                song: songRequest || 'None',
                dateSubmitted: new Date().toLocaleString()
            };

            // Save to LocalStorage
            let existingRsvps = JSON.parse(localStorage.getItem('julia_charles_rsvps') || '[]');
            existingRsvps.push(rsvpEntry);
            localStorage.setItem('julia_charles_rsvps', JSON.stringify(existingRsvps));

            // Success feedback
            createBurstSparkles();
            alert(`Thank you, ${guestName}! Your RSVP (${attendance}) has been recorded. We can't wait to see you in Rome!`);

            rsvpForm.reset();
            rsvpModal.classList.add('hidden');
        });
    }

    // View RSVPs Admin Table
    if (btnViewRsvps) {
        btnViewRsvps.addEventListener('click', () => {
            renderRsvpTable();
            rsvpListModal.classList.remove('hidden');
        });
    }

    if (btnCloseRsvpListModal) {
        btnCloseRsvpListModal.addEventListener('click', () => {
            rsvpListModal.classList.add('hidden');
        });
    }

    if (btnClearRsvps) {
        btnClearRsvps.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all RSVPs?')) {
                localStorage.removeItem('julia_charles_rsvps');
                renderRsvpTable();
            }
        });
    }

    function renderRsvpTable() {
        const rsvps = JSON.parse(localStorage.getItem('julia_charles_rsvps') || '[]');
        
        if (rsvps.length === 0) {
            rsvpTableContainer.innerHTML = `<p style="text-align:center; color: #e6cfcd; padding: 20px;">No RSVPs submitted yet.</p>`;
            return;
        }

        let html = `
            <table class="rsvp-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Guests</th>
                        <th>Song</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rsvps.forEach(r => {
            html += `
                <tr>
                    <td><strong>${r.name}</strong><br><small style="color:#aebac1;">${r.email}</small></td>
                    <td><span style="color:${r.attendance === 'Yes' ? '#4cd964' : '#f15c6d'};">${r.attendance}</span></td>
                    <td>${r.guests}</td>
                    <td>${r.song}</td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        rsvpTableContainer.innerHTML = html;
    }

    // ==========================================================================
    // 6. AMBIENT BACKGROUND MUSIC SYNTHESIZER (Web Audio API)
    // ==========================================================================
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playChordTone(freq, duration, delay) {
        if (!audioContext || !isMusicPlaying) return;

        setTimeout(() => {
            try {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();

                osc.type = 'sine';
                osc.frequency.value = freq;

                gain.gain.setValueAtTime(0.01, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

                osc.connect(gain);
                gain.connect(audioContext.destination);

                osc.start();
                osc.stop(audioContext.currentTime + duration);
            } catch (e) {
                console.log(e);
            }
        }, delay);
    }

    function startRomanticMelody() {
        initAudio();
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        isMusicPlaying = true;

        if (heroSaveTheDateVideo) {
            heroSaveTheDateVideo.muted = false;
        }

        const musicBtnText = document.getElementById('musicBtnText');
        if (btnAudioToggle) {
            btnAudioToggle.style.color = '#25d366';
            btnAudioToggle.style.borderColor = '#25d366';
        }
        if (musicBtnText) musicBtnText.textContent = 'Music On';

        // Arpeggiated romantic chords sequence (A minor, F, C, G)
        const chords = [
            [220, 261.63, 329.63, 440], // Am
            [174.61, 220, 261.63, 349.23], // F
            [261.63, 329.63, 392, 523.25], // C
            [196, 246.94, 293.66, 392]   // G
        ];

        let index = 0;
        musicInterval = setInterval(() => {
            if (!isMusicPlaying) return;
            const currentChord = chords[index % chords.length];
            currentChord.forEach((freq, i) => {
                playChordTone(freq, 2.5, i * 250);
            });
            index++;
        }, 2200);
    }

    function stopMusic() {
        isMusicPlaying = false;
        if (heroSaveTheDateVideo) {
            heroSaveTheDateVideo.muted = true;
        }
        const musicBtnText = document.getElementById('musicBtnText');
        if (btnAudioToggle) {
            btnAudioToggle.style.color = 'var(--gold-light)';
            btnAudioToggle.style.borderColor = 'rgba(212, 175, 55, 0.4)';
        }
        if (musicBtnText) musicBtnText.textContent = 'Music Off';
        if (musicInterval) clearInterval(musicInterval);
    }

    // Global document click listener to unmute & start music on first user touch/gesture
    document.addEventListener('click', () => {
        if (!isMusicPlaying) {
            startRomanticMelody();
        }
    }, { once: true });

    if (btnAudioToggle) {
        btnAudioToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                stopMusic();
            } else {
                startRomanticMelody();
            }
        });
    }

    function playOpenSound() {
        initAudio();
        if (!audioContext) return;
        try {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start();
            osc.stop(audioContext.currentTime + 0.3);
        } catch(e) {}
    }

    // ==========================================================================
    // 7. GOLDEN SPARKLES & ROSE PETALS CANVAS ANIMATION
    // ==========================================================================
    const canvas = document.getElementById('sparklesCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * (canvas ? canvas.width : 1000);
            this.y = Math.random() * (canvas ? canvas.height : 1000);
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.opacity = Math.random() * 0.7 + 0.3;
            this.color = Math.random() > 0.3 ? '#d4af37' : '#f5e4b8';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y > (canvas ? canvas.height : 1000)) {
                this.y = -10;
                this.x = Math.random() * (canvas ? canvas.width : 1000);
            }
        }

        draw() {
            if (!ctx) return;
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#d4af37';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createBurstSparkles() {
        for (let i = 0; i < 30; i++) {
            if (particles.length < 100) {
                const p = new Particle();
                p.y = window.innerHeight / 2;
                p.x = window.innerWidth / 2;
                p.speedX = (Math.random() - 0.5) * 6;
                p.speedY = (Math.random() - 0.5) * 6;
                particles.push(p);
            }
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

});
