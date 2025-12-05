"use strict";

// Scrolling
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var navbar = document.getElementById("navbar123");
    if (navbar) {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-60px";
        }
        prevScrollpos = currentScrollPos;
    }
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const navbar = document.getElementById("navbar123");
    if (navbar && !document.querySelector('.mobile-menu-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle mobile menu');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function() {
            navbar.classList.toggle('mobile-open');
            const icon = this.querySelector('i');
            if (navbar.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && !toggleBtn.contains(event.target)) {
                navbar.classList.remove('mobile-open');
                toggleBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
});


// Head
class Head extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <!-- Moved stylesheet and meta tags to main HTML head. -->
        `
    }
}


// Header (Navigation bar)
class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="navbar" id="navbar123">
            <div class="logo">
                <a href="index.html" style="text-decoration: none; color: inherit;">bill.ai</a>
            </div>
            <div class="button"><a href="pages/about.html" style="color: #e6e6e6; text-decoration: none;">About Me</a></div>
            <div class="dropdown">
                <a href="pages/experience.html" class="dropbtn">
                    <span>Experience</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="pages/research.html">Research & Publications</a>
                    <a href="https://www.kinaxis.com/en">Machine Learning Engineer - Kinaxis</a>
                    <a href="https://kangleelab.com/">Machine Learning Lead - University of Toronto</a>
                    <a href="https://www.nuralogix.ai/">Data Science Software Developer - Nuralogix</a>
                    <a href="pages/capstone.html">Data Scientist - Public Health Ontario</a>
                    <a href="pages/transit.html">Transportation Modelling Research - University of Toronto</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="pages/projects.html" class="dropbtn">
                    <span>Projects</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="https://llm-psych-assessment.onrender.com/">Mental Health LLM Chatbot</a>
                    <a href="https://kangleelab-surveys.vercel.app/">Machine Learning Psychometrics</a>
                    <a href="https://github.com/billyhsun/MusicGenre">Music Genre Classifier</a>
                    <a href="https://devpost.com/software/surroundsound-1u9ljk">Music Sharing App</a>
                    <a href="pages/game.html">Boxhead Video Game</a>
                    <a href="pages/parking.html">Parking Manager App Simulator</a>
                    <a href="pages/aer201.html">Autonomous Pill Packaging Machine</a>
                </div>
            </div>
            <div class="button"><a href="pages/blogs.html" style="color: #e6e6e6; text-decoration: none;">Blog</a></div>
        </div>
        `
    }
}
  
// Footer
class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
		<div class="footer">
			<p style="margin: 0; padding: 0;">
				<font color=#cccccc>Copyright 2018-2025 © Bill Yuan Hong Sun</font>
			</p>
			<div class="socialmedia">
                <a href="https://www.linkedin.com/in/bill-yuan-hong-sun/"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
				<a href="https://github.com/billyhsun"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
                <a href="https://scholar.google.com/citations?hl=en&user=bbtplDkAAAAJ&view_op=list_works&gmla=AJsN-F4COolLEfdgE4iCWldQ-NS9XYUCR5fAPNxaEnJmw0C_VnRX9D0330aSstBiPzdrgi9lJ_ueu85EiVneGUbauuNtqvL3uSWMXhNprQDV_4_cdGrDhYA"><i class="fa-brands fa-google"></i></a>
                <a href="https://www.researchgate.net/profile/Yuan-Hong-Sun"><i class="fa-brands fa-researchgate"></i></a>
                <a href="https://www.facebook.com/billyhsun"><i class="fa-brands fa-facebook" aria-hidden="true"></i></a>
				<a href="https://www.instagram.com/billyhsun/"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                <a href="https://calendly.com/billyhsun/30min"><i class="fa fa-calendar" aria-hidden="true"></i></a>
				<a href="mailto:billyuanhong.sun@mail.utoronto.ca"><i class="fas fa-envelope" aria-hidden="true"></i></a>
                <a href="https://linktr.ee/billyhsun"><i class="fa-solid fa-link" aria-hidden="true"></i></a>
			</div>
		</div>
        `
    }
}

// Publications
class Publications extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
		<div class="publications">
            <p>[1] Sun, Y.H., Luo, H. & Lee, K. (2022). A Novel Approach for Developing Efficient and Convenient Short Assessments to Approximate a Long Assessment. Behavior Research Methods, 54, 2802–2828.
                <a href="https://doi.org/10.3758/s13428-021-01771-7">doi.org/10.3758/s13428-021-01771-7</a>
            </p>
            <p>[2] Sun, Y.H., Liu, Q., Lee, N.Y., Li, X., & Lee, K. (2022). A novel machine learning approach to shorten depression risk assessment for convenient uses. Journal of Affective Disorders, 312, 275–291.
                <a href="https://doi.org/10.1016/j.jad.2022.06.035">doi.org/10.1016/j.jad.2022.06.035</a>
            </p>
            <p>[3] Yang, H.C., Sun, Y.H., Lee, K. (2025). Concise multi-class anxiety disorder risk assessment: A novel advanced machine learning approach. Journal of Anxiety Disorders, 112, 103018.
                <a href="https://doi.org/10.1016/j.janxdis.2025.103018">doi.org/10.1016/j.janxdis.2025.103018</a>
            </p>
            <p>[4] Liu, S., Sun, Y.H., Waese-Perlman, A.A., Lee, N.Y., Zhang, H., Lee, K. (2022). Symptom Based Models of COVID-19 Infection Using AI. In: Lidströmer, N., Eldar, Y.C. (eds) Artificial Intelligence in Covid-19. Springer, Cham. 
                <a href="https://doi.org/10.1007/978-3-031-08506-2_8">doi.org/10.1007/978-3-031-08506-2_8</a>
            </p>
            <p>[5] Yasin, Y., Sun, Y.H., & Lee, K. (2022). A machine learning approach for predicting children's future BMI. Canadian Developmental Psychology Conference 2022.
                (Conference proceeding). <a href="files/poster-childbmi.pdf">Poster</a>
            </p>
            <p>
                <a href="https://scholar.google.com/citations?hl=en&user=bbtplDkAAAAJ&view_op=list_works&gmla=AJsN-F4COolLEfdgE4iCWldQ-NS9XYUCR5fAPNxaEnJmw0C_VnRX9D0330aSstBiPzdrgi9lJ_ueu85EiVneGUbauuNtqvL3uSWMXhNprQDV_4_cdGrDhYA">
                Google Scholar</a>
                &emsp; <a href="https://www.researchgate.net/profile/Yuan-Hong-Sun">ResearchGate</a>
                &emsp; <a href="https://orcid.org/0000-0002-2343-0340">ORCiD</a>
            </p>
		</div>
        `
    }
}

/* More links
<a href="https://devpost.com/billyhsun"><i class="fab fa-dev"></i></a>
<a href="https://angel.co/bill-sun-1"><i class="fab fa-angellist"></i></a>
<a href="https://stackoverflow.com/users/11026180/bill-sun"><i class="fab fa-stack-overflow"></i></a>
<a href="https://www.kaggle.com/billyhsun"><i class="fab fa-kaggle"></i></a>
<a href="https://twitter.com/byhsun"><i class="fab fa-twitter"></i></a>
<a href="https://thewanderingengineer.medium.com/"><i class="fab fa-medium-m"></i></a>

            <div class="dropdown">
                <button class="dropbtn"><a href="pages/clubs.html"
                        style="color: #e6e6e6; text-decoration: none; padding: 15px 0px">Extracurriculars</a>
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="pages/toastmasters.html">Toastmasters</a>
                    <a href="pages/ewb.html">Engineers Without Borders - High School / University of Toronto</a>
                    <a href="pages/solarcar.html">Blue Sky Solar Racing Team - University of Toronto</a>
                    <a href="pages/ilead.html">iLead The Game - University of Toronto</a>
                    <a href="pages/deep.html">DEEP Summer Academy - High School / University of Toronto</a>
                    <a href="pages/swim.html">Swimming and Lifeguarding - High School / City of Toronto</a>
                    <a href="pages/weather.html">Hobbies</a>
                </div>
            </div>
*/

// Header for index.html (root)
class HeaderRoot extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="navbar" id="navbar123">
            <div class="logo">
                <a href="/index.html" style="text-decoration: none; color: inherit;">bill.ai</a>
            </div>
            <div class="button"><a href="/pages/about.html" style="color: #e6e6e6; text-decoration: none;">About Me</a></div>
            <div class="dropdown">
                <a href="/pages/experience.html" class="dropbtn">
                    <span>Experience</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="/pages/research.html">Research & Publications</a>
                    <a href="https://www.kinaxis.com/en">Machine Learning Engineer - Kinaxis</a>
                    <a href="https://kangleelab.com/">Machine Learning Lead - University of Toronto</a>
                    <a href="https://www.nuralogix.ai/">Data Science Software Developer - Nuralogix</a>
                    <a href="/pages/capstone.html">Data Scientist - Public Health Ontario</a>
                    <a href="/pages/transit.html">Transportation Modelling Research - University of Toronto</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="/pages/projects.html" class="dropbtn">
                    <span>Projects</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="https://llm-psych-assessment.onrender.com/">Mental Health LLM Chatbot</a>
                    <a href="https://kangleelab-surveys.vercel.app/">Machine Learning Psychometrics</a>
                    <a href="https://github.com/billyhsun/MusicGenre">Music Genre Classifier</a>
                    <a href="https://devpost.com/software/surroundsound-1u9ljk">Music Sharing App</a>
                    <a href="/pages/game.html">Boxhead Video Game</a>
                    <a href="/pages/parking.html">Parking Manager App Simulator</a>
                    <a href="/pages/aer201.html">Autonomous Pill Packaging Machine</a>
                </div>
            </div>
            <div class="button"><a href="/pages/blogs.html" style="color: #e6e6e6; text-decoration: none;">Blog</a></div>
        </div>
        `
    }
}

// Header for pages/*.html
class HeaderPages extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="navbar" id="navbar123">
            <div class="logo">
                <a href="/index.html" style="text-decoration: none; color: inherit;">bill.ai</a>
            </div>
            <div class="button"><a href="about.html" style="color: #e6e6e6; text-decoration: none;">About Me</a></div>
            <div class="dropdown">
                <a href="experience.html" class="dropbtn">
                    <span>Experience</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="research.html">Research & Publications</a>
                    <a href="https://www.kinaxis.com/en">Machine Learning Engineer - Kinaxis</a>
                    <a href="https://kangleelab.com/">Machine Learning Lead - University of Toronto</a>
                    <a href="https://www.nuralogix.ai/">Data Science Software Developer - Nuralogix</a>
                    <a href="capstone.html">Data Scientist - Public Health Ontario</a>
                    <a href="transit.html">Transportation Modelling Research - University of Toronto</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="projects.html" class="dropbtn">
                    <span>Projects</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="https://llm-psych-assessment.onrender.com/">Mental Health LLM Chatbot</a>
                    <a href="https://kangleelab-surveys.vercel.app/">Machine Learning Psychometrics</a>
                    <a href="https://github.com/billyhsun/MusicGenre">Music Genre Classifier</a>
                    <a href="https://devpost.com/software/surroundsound-1u9ljk">Music Sharing App</a>
                    <a href="game.html">Boxhead Video Game</a>
                    <a href="parking.html">Parking Manager App Simulator</a>
                    <a href="aer201.html">Autonomous Pill Packaging Machine</a>
                </div>
            </div>
            <div class="button"><a href="blogs.html" style="color: #e6e6e6; text-decoration: none;">Blog</a></div>
        </div>
        `
    }
}

customElements.define('main-head', Head);
customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('publications-list', Publications);
customElements.define('main-header-root', HeaderRoot);
customElements.define('main-header-pages', HeaderPages);

