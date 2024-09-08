"use strict";

// Scrolling
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar123").style.top = "0";
    } else {
        document.getElementById("navbar123").style.top = "-60px";
    }
    prevScrollpos = currentScrollPos;
}


// Head
class Head extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <head>
            <!--Website Information -->
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="description" content="Bill Sun's Portfolio">
            <meta name="author" content="Bill (Yuan Hong) Sun">
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
            <link rel="stylesheet" href="styles.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        </head>

        `
    }
}


// Header (Navigation bar)
class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="navbar" id="navbar123" style="z-index: 2;">
            <div class="button"><a href="blogs.html" style="color: #e6e6e6; text-decoration: none; padding: 15px 15px">Blog</a>
            </div>
            <div class="dropdown">
                <button class="dropbtn"><a href="projects.html"
                        style="color: #e6e6e6; text-decoration: none; padding: 15px 0px">Projects</a>
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="https://survey-demo.deepaffex.ai/login">Mental Health Questionnaire Website</a>
                    <a href="https://github.com/billyhsun/MusicGenre">Music Genre Classifier</a>
                    <a href="https://devpost.com/software/surroundsound-1u9ljk">Music Sharing App</a>
                    <a href="game.html">Boxhead Video Game</a>
                    <a href="parking.html">Parking Manager App Simulator</a>
                    <a href="aer201.html">Autonomous Pill Packaging Machine</a>
                </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn"><a href="experience.html"
                        style="color: #e6e6e6; text-decoration: none; padding: 15px 0px">Experience</a>
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="research.html">Research & Publications</a>
                    <a href="https://www.kinaxis.com/en">Machine Learning Engineer - Kinaxis</a>
                    <a href="https://www.nuralogix.ai/">Data Science Software Developer - Nuralogix</a>
                    <a href="capstone.html">Capstone Project - Public Health Ontario</a>
                    <a href="transit.html">Transportation Modelling Research - University of Toronto</a>
                </div>
            </div>
            <div class="button"><a href="about.html" style="color: #e6e6e6; text-decoration: none; padding: 15px 15px">About
                    Me</a></div>
            <div class="logo">
                <h1 style="margin:1px;">
                    <a href="index.html" style="text-decoration: none;">bill.</a></h1>
            </div>
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
			<br>

			<p style="margin-left: 2%;">
				<font color=#cccccc>Copyright 2018-2023 © Bill Yuan Hong Sun</font>

			<div class="socialmedia">
                <a href="https://www.linkedin.com/in/bill-yuan-hong-sun/"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
				<a href="https://github.com/billyhsun"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
                <a href="https://scholar.google.com/citations?hl=en&user=bbtplDkAAAAJ&view_op=list_works&gmla=AJsN-F4COolLEfdgE4iCWldQ-NS9XYUCR5fAPNxaEnJmw0C_VnRX9D0330aSstBiPzdrgi9lJ_ueu85EiVneGUbauuNtqvL3uSWMXhNprQDV_4_cdGrDhYA"><i class="fa-brands fa-google"></i></a>
                <a href="https://www.researchgate.net/profile/Yuan-Hong-Sun"><i class="fa-brands fa-researchgate"></i></a>
                <a href="https://www.facebook.com/billyhsun"><i class="fa-brands fa-facebook" aria-hidden="true"></i></a>
				<a href="https://www.instagram.com/billyhsun/"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                <a href="https://www.threads.net/@billyhsun"><i class="fa-brands fa-threads" aria-hidden="true"></i></a>
				<a href="mailto:billyuanhong.sun@mail.utoronto.ca"><i class="fas fa-envelope" aria-hidden="true"></i></a>
                <a href="https://linktr.ee/billyhsun"><i class="fa-solid fa-link" aria-hidden="true"></i></a>
			</div>

			</p>
			<br><br>
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
            <p>[1] Sun, Y.H., Luo, H. & Lee, K. (2022). A Novel Approach for Developing Efficient and Convenient Short Assessments to Approximate a Long Assessment. Behavior Research Methods. 
                <a href="https://doi.org/10.3758/s13428-021-01771-7">doi.org/10.3758/s13428-021-01771-7</a>
            </p>
            <p>[2] Sun, Y.H., Liu, Q., Lee, N.Y., Li, X., & Lee, K. (2022). A novel machine learning approach to shorten depression risk assessment for convenient uses. Journal of Affective Disorders, 312, 275–291.
                <a href="https://doi.org/10.1016/j.jad.2022.06.035">doi.org/10.1016/j.jad.2022.06.035</a>
            </p>
            <p>[3] Liu, S., Sun, Y.H., Waese-Perlman, A.A., Lee, N.Y., Zhang, H., Lee, K. (2022). Symptom Based Models of COVID-19 Infection Using AI. In: Lidströmer, N., Eldar, Y.C. (eds) Artificial Intelligence in Covid-19. Springer, Cham. 
                <a href="https://doi.org/10.1007/978-3-031-08506-2_8">doi.org/10.1007/978-3-031-08506-2_8</a>
            </p>
            <p>[4] Yasin, Y., Sun, Y.H., & Lee, K. (2022). A machine learning approach for predicting children's future BMI. Canadian Developmental Psychology Conference 2022.
                (Conference proceeding). <a href="files/poster-childbmi.pdf">Poster</a>
            </p>
            <!-- <p>[5] Zhou, W., Sun, Y.H., Huang, W., Liu, Q., Lee, N.Y., Yasin, Y., Chen, Z., Wang, J., Cai, P., Feng, Z.P. & Lee, K. (In press). Risk prediction of fatty liver disease by machine learning using physical and blood biomarkers independent of liver biopsy. Metabolism.
                (<a href="files/NAFLD-Manuscript-Lancet.pdf">Submission</a>)
            </p> -->
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
                <button class="dropbtn"><a href="clubs.html"
                        style="color: #e6e6e6; text-decoration: none; padding: 15px 0px">Extracurriculars</a>
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="toastmasters.html">Toastmasters</a>
                    <a href="ewb.html">Engineers Without Borders - High School / University of Toronto</a>
                    <a href="solarcar.html">Blue Sky Solar Racing Team - University of Toronto</a>
                    <a href="ilead.html">iLead The Game - University of Toronto</a>
                    <a href="deep.html">DEEP Summer Academy - High School / University of Toronto</a>
                    <a href="swim.html">Swimming and Lifeguarding - High School / City of Toronto</a>
                    <a href="weather.html">Hobbies</a>
                </div>
            </div>
*/

customElements.define('main-head', Head);
customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('publications-list', Publications);

