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
            navbar.style.top = "-56px";
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


// Unified Header (Navigation bar)
// Automatically detects if we're in root or pages directory
class Header extends HTMLElement {
    connectedCallback() {
        // Detect if we're in the root directory or pages directory
        const isInPages = window.location.pathname.includes('/pages/');
        const pathPrefix = isInPages ? '' : '/pages/';
        const homeLink = isInPages ? '/index.html' : '/index.html';
        
        this.innerHTML = `
        <div class="navbar" id="navbar123">
            <div class="logo">
                <a href="${homeLink}" style="text-decoration: none; color: inherit;">bill.ai</a>
            </div>
            <div class="navbar-spacer" aria-hidden="true"></div>
            <div class="button"><a href="${pathPrefix}about.html" style="color: #e6e6e6; text-decoration: none;">About Me</a></div>
            <div class="dropdown">
                <a href="${pathPrefix}experience.html" class="dropbtn">
                    <span>Experience</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="${pathPrefix}research.html">Research & Publications</a>
                    <a href="https://www.guidepoint.com/">AI Engineer - Guidepoint</a>
                    <a href="https://www.kinaxis.com/en">Machine Learning and AI Engineer - Kinaxis</a>
                    <a href="https://www.oise.utoronto.ca/aphd/centre-smart-learning-and-development">Machine Learning Lead - University of Toronto Center for Smart Learning</a>
                    <a href="https://www.nuralogix.ai/">Data Science Software Engineer - Nuralogix</a>
                    <a href="${pathPrefix}capstone.html">Data Scientist - Public Health Ontario</a>
                    <a href="${pathPrefix}transit.html">Transportation Modelling Research - University of Toronto</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="${pathPrefix}projects.html" class="dropbtn">
                    <span>Projects</span>
                    <i class="fa fa-caret-down" style="margin-left: 5px;"></i>
                </a>
                <div class="dropdown-content">
                    <a href="https://llm-psych-assessment-demo.onrender.com/">Mental Health LLM Chatbot</a>
                    <a href="https://kang-lee-lab-surveys.vercel.app/">Machine Learning Psychometrics</a>
                    <a href="https://github.com/billyhsun/MusicGenre">Music Genre Classifier</a>
                    <a href="https://devpost.com/software/surroundsound-1u9ljk">Music Sharing App</a>
                    <a href="${pathPrefix}game.html">Boxhead Video Game</a>
                    <a href="${pathPrefix}parking.html">Parking Manager App Simulator</a>
                    <a href="${pathPrefix}aer201.html">Autonomous Pill Packaging Machine</a>
                </div>
            </div>
            <div class="button"><a href="${pathPrefix}blogs.html" style="color: #e6e6e6; text-decoration: none;">Blog</a></div>
            <div class="button"><a href="${pathPrefix}mentorship.html" style="color: #e6e6e6; text-decoration: none;">Mentorship</a></div>
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
				<font color=#cccccc>Copyright 2026 © Bill Yuan Hong Sun</font>
			</p>
			<div class="socialmedia">
                <a href="https://www.linkedin.com/in/bill-yuan-hong-sun/"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
				<a href="https://github.com/billyhsun"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
                <a href="https://www.facebook.com/billyhsun"><i class="fa-brands fa-facebook" aria-hidden="true"></i></a>
				<a href="https://www.instagram.com/billyhsun/"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                <a href="https://www.threads.com/@billyhsun"><i class="fa-brands fa-threads" aria-hidden="true"></i></a>
                <a href="https://x.com/billyhsun"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
				<a href="mailto:billyuanhong.sun@mail.utoronto.ca"><i class="fas fa-envelope" aria-hidden="true"></i></a>
                <a href="https://linktr.ee/billyhsun"><i class="fa-solid fa-link" aria-hidden="true"></i></a>
			</div>
		</div>
        `
    }
}

// Publications — card layout (thumbnails & most links are placeholders you can fill in later)
function escapePubHtml(s) {
    return String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderPublicationCard(pub, index, idPrefix) {
    const badges = (pub.badges || []).map(function (b) {
        return '<span class="pub-badge">' + b + '</span>';
    }).join('');

    const thumbInner = pub.thumb
        ? '<img class="pub-thumb-img" src="' + pub.thumb + '" alt="" loading="lazy" />'
        : '<div class="pub-thumb-placeholder" aria-hidden="true"></div>';

    var pubHref = pub.doi || '#';
    var titleHtml = escapePubHtml(pub.title || '');

    const links = (pub.links || []).map(function (l) {
        return (
            '<a class="pub-link" href="' + l.href + '">' +
            '<i class="' + l.iconClass + '" aria-hidden="true"></i>' +
            '<span>' + l.label + '</span>' +
            '</a>'
        );
    }).join('');

    const bibtexEscaped = (pub.bibtex || '').replace(/</g, '&lt;');
    const citationEscaped = escapePubHtml(pub.citation || '');

    var citeIdPlain = idPrefix + '-cite-' + index + '-plain';
    var citeIdBib = idPrefix + '-cite-' + index + '-bib';
    var citeControls =
        '<button type="button" class="pub-link pub-cite-btn" aria-expanded="false" aria-controls="' + citeIdPlain + '">' +
        '<i class="fas fa-book" aria-hidden="true"></i><span>Citation</span></button>' +
        '<button type="button" class="pub-link pub-cite-btn" aria-expanded="false" aria-controls="' + citeIdBib + '">' +
        '<i class="fas fa-code" aria-hidden="true"></i><span>BibTeX</span></button>';

    var citePanels =
        '<div id="' + citeIdPlain + '" class="pub-cite-expand" hidden>' +
        '<div class="pub-cite-expand-inner"><pre class="pub-bibtex pub-cite-as-pre"><code>' + citationEscaped + '</code></pre></div></div>' +
        '<div id="' + citeIdBib + '" class="pub-cite-expand" hidden>' +
        '<div class="pub-cite-expand-inner"><pre class="pub-bibtex"><code>' + bibtexEscaped + '</code></pre></div></div>';

    var thumbOpen =
        pubHref !== '#'
            ? '<a class="pub-thumb" href="' + pubHref + '" target="_blank" rel="noopener noreferrer" aria-label="View publication">'
            : '<div class="pub-thumb" role="presentation">';
    var thumbClose = pubHref !== '#' ? '</a>' : '</div>';

    return (
        '<article class="pub-card">' +
        thumbOpen +
        thumbInner +
        thumbClose +
        '<div class="pub-main">' +
        '<div class="pub-badges">' + badges + '</div>' +
        (pubHref !== '#'
            ? '<h3 class="pub-title"><a class="pub-title-link" href="' + pubHref + '" target="_blank" rel="noopener noreferrer">' + titleHtml + '</a></h3>'
            : '<h3 class="pub-title">' + titleHtml + '</h3>') +
        '<p class="pub-desc">' + pub.desc + '</p>' +
        '<div class="pub-links">' + links + citeControls + '</div>' +
        citePanels +
        '</div>' +
        '</article>'
    );
}

var PUBLICATION_ENTRIES = [
    {
        year: 2022,
        seq: 4,
        badges: ['Behavior Research Methods, 2022'],
        title: 'Efficient short assessments to approximate a long assessment',
        desc: 'A machine-learning pipeline for deriving minimal item sets that preserve the predictive accuracy of a full-length scale, with applications to behavioral and clinical measurement.',
        citation:
            'Sun, Y. H., Luo, H., & Lee, K. (2022).\n\n' +
            'A novel approach for developing efficient and convenient short assessments to approximate a long assessment.\n\n' +
            'Behavior Research Methods, 54, 2802-2828.\n\n' +
            'https://doi.org/10.3758/s13428-021-01771-7',
        doi: 'https://doi.org/10.3758/s13428-021-01771-7',
        thumb: '/assets/images/publication_dass_anxiety.png',
        links: [
            { label: 'Demo', href: 'https://kang-lee-lab-surveys.vercel.app/', iconClass: 'fas fa-play-circle' },
            { label: 'PDF', href: 'https://doi.org/10.3758/s13428-021-01771-7', iconClass: 'fas fa-file-pdf' },
            { label: 'Code', href: 'https://github.com/kang-lee-lab/long_to_short_dass', iconClass: 'fas fa-code' },
        ],
        bibtex:
            '@article{Sun2022Novel,\n' +
            '  title={A Novel Approach for Developing Efficient and Convenient Short Assessments to Approximate a Long Assessment},\n' +
            '  author={Sun, Yuan Hong and Luo, Hong and Lee, Kang},\n' +
            '  journal={Behavior Research Methods},\n' +
            '  volume={54},\n' +
            '  pages={2802--2828},\n' +
            '  year={2022},\n' +
            '  doi={10.3758/s13428-021-01771-7}\n' +
            '}',
    },
    {
        year: 2022,
        seq: 3,
        badges: ['Journal of Affective Disorders, 2022'],
        title: 'Shortening depression risk assessment with machine learning',
        desc: 'Selects compact item subsets and trains models to approximate full-scale depression risk scores while improving convenience for repeated or remote screening.',
        citation:
            'Sun, Y. H., Liu, Q., Lee, N. Y., Li, X., & Lee, K. (2022).\n\n' +
            'A novel machine learning approach to shorten depression risk assessment for convenient uses.\n\n' +
            'Journal of Affective Disorders, 312, 275-291.\n\n' +
            'https://doi.org/10.1016/j.jad.2022.06.035',
        doi: 'https://doi.org/10.1016/j.jad.2022.06.035',
        thumb: '/assets/images/publication_dass_depression.png',
        links: [
            { label: 'Demo', href: 'https://kang-lee-lab-surveys.vercel.app/survey/depression-moderate', iconClass: 'fas fa-play-circle' },
            { label: 'PDF', href: 'https://doi.org/10.1016/j.jad.2022.06.035', iconClass: 'fas fa-file-pdf' },
            { label: 'Code', href: 'https://github.com/kang-lee-lab/long_to_short_dass', iconClass: 'fas fa-code' },
        ],
        bibtex:
            '@article{Sun2022Depression,\n' +
            '  title={A novel machine learning approach to shorten depression risk assessment for convenient uses},\n' +
            '  author={Sun, Yuan Hong and Liu, Qijian and Lee, Nathan Y. and Li, Xiaohong and Lee, Kang},\n' +
            '  journal={Journal of Affective Disorders},\n' +
            '  volume={312},\n' +
            '  pages={275--291},\n' +
            '  year={2022},\n' +
            '  doi={10.1016/j.jad.2022.06.035}\n' +
            '}',
    },
    {
        year: 2025,
        seq: 10,
        badges: ['Journal of Anxiety Disorders, 2025'],
        title: 'Concise multi-class anxiety disorder risk assessment',
        desc: 'An advanced machine learning approach to multi-class anxiety risk prediction using a reduced item set while retaining strong discrimination across disorder classes.',
        citation:
            'Yang, H. C., Sun, Y. H., & Lee, K. (2025).\n\n' +
            'Concise multi-class anxiety disorder risk assessment: A novel advanced machine learning approach.\n\n' +
            'Journal of Anxiety Disorders, vol 112, 103018.\n\n' +
            'https://doi.org/10.1016/j.janxdis.2025.103018',
        doi: 'https://doi.org/10.1016/j.janxdis.2025.103018',
        thumb: '/assets/images/publication_multiclass_anxiety.png',
        links: [
            { label: 'Demo', href: 'https://kang-lee-lab-surveys.vercel.app/survey/anxiety-multiclass', iconClass: 'fas fa-play-circle' },
            { label: 'PDF', href: 'https://doi.org/10.1016/j.janxdis.2025.103018', iconClass: 'fas fa-file-pdf' },
            { label: 'Code', href: 'https://github.com/kang-lee-lab/long_to_short_dass', iconClass: 'fas fa-code' },
        ],
        bibtex:
            '@article{Yang2025Anxiety,\n' +
            '  title={Concise multi-class anxiety disorder risk assessment: A novel advanced machine learning approach},\n' +
            '  author={Yang, Haochong and Sun, Yuan Hong and Lee, Kang},\n' +
            '  journal={Journal of Anxiety Disorders},\n' +
            '  volume={112},\n' +
            '  pages={103018},\n' +
            '  year={2025},\n' +
            '  doi={10.1016/j.janxdis.2025.103018}\n' +
            '}',
    },
    {
        year: 2022,
        seq: 2,
        badges: ['Artificial intelligence in Covid-19, 2022'],
        title: 'Symptom-based models of COVID-19 infection using AI',
        desc: 'Machine learning models that relate self-reported symptoms to COVID-19 infection risk, presented as a chapter on AI in the COVID-19 context.',
        citation:
            'Liu, S., Sun, Y. H., Waese-Perlman, A. A., Lee, N. Y., Zhang, H., & Lee, K. (2022).\n\n' +
            'Symptom based models of COVID-19 infection using AI.\n\n' +
            'In N. Lidströmer & Y. C. Eldar (Eds.), Artificial intelligence in Covid-19. Springer, Cham.\n\n' +
            'https://doi.org/10.1007/978-3-031-08506-2_8',
        doi: 'https://doi.org/10.1007/978-3-031-08506-2_8',
        thumb: '/assets/images/publication_covid.png',
        links: [
            { label: 'Demo', href: 'https://kang-lee-lab-surveys.vercel.app/', iconClass: 'fas fa-play-circle' },
            { label: 'PDF', href: 'https://doi.org/10.1007/978-3-031-08506-2_8', iconClass: 'fas fa-file-pdf' },
            { label: 'Code', href: 'https://github.com/kang-lee-lab/covid-19-prediction', iconClass: 'fas fa-code' },
        ],
        bibtex:
            '@incollection{Liu2022COVID,\n' +
            '  title={Symptom Based Models of {COVID-19} Infection Using {AI}},\n' +
            '  author={Liu, Songqiao and Sun, Yuan Hong and Waese-Perlman, Alex A. and Lee, Nathan Y. and Zhang, Haibo and Lee, Kang},\n' +
            '  booktitle={Artificial Intelligence in Covid-19},\n' +
            '  editor={Lidstr{\\"o}mer, Niklas and Eldar, Yonina C.},\n' +
            '  publisher={Springer},\n' +
            '  address={Cham},\n' +
            '  year={2022},\n' +
            '  doi={10.1007/978-3-031-08506-2_8}\n' +
            '}',
    },
    {
        year: 2026,
        seq: 10,
        badges: ['Preprint 2026'],
        title: 'Concise comprehensive assessment of psychiatric disorder risks',
        desc: 'Machine learning approach to shortening broad-spectrum psychiatric screening while preserving coverage across multiple disorder constructs (preprint).',
        citation:
            'Sun, Y., Zhu, J., Meng, F., Liu, Q., Chiu, Q., Lee, N. Y., … Lee, K. (2026).\n\n' +
            'Concise comprehensive assessment of psychiatric disorder risks using machine learning.\n\n' +
            'PsyArXiv preprint.\n\n' +
            'https://doi.org/10.31234/osf.io/tnwq8_v1',
        doi: 'https://doi.org/10.31234/osf.io/tnwq8_v1',
        thumb: '/assets/images/publication_mmpi.png',
        links: [
            { label: 'Demo', href: 'https://kang-lee-lab-surveys.vercel.app/survey/mmpi', iconClass: 'fas fa-play-circle' },
            { label: 'PDF', href: 'https://doi.org/10.31234/osf.io/tnwq8_v1', iconClass: 'fas fa-file-pdf' },
            { label: 'Code', href: 'https://github.com/kang-lee-lab/long_to_short_mmpi', iconClass: 'fas fa-code' },
        ],
        bibtex:
            '@misc{Sun2026CCAPDR,\n' +
            '  title={Concise Comprehensive Assessment of Psychiatric Disorder Risks Using Machine Learning},\n' +
            '  author={Sun, Yuan Hong and Zhu, Jianli and Meng, Fanqiang and Liu, Qijian and Chiu, Queenny and Lee, Nathan Y. and others and Lee, Kang},\n' +
            '  year={2026},\n' +
            '  howpublished={PsyArXiv preprint},\n' +
            '  doi={10.31234/osf.io/tnwq8_v1}\n' +
            '}',
    },
    {
        year: 2022,
        seq: 1,
        badges: ['Canadian Developmental Psychology Conference, 2022'],
        title: "Predicting children's future BMI with machine learning",
        desc: 'Conference contribution applying machine learning to longitudinal indicators for childhood BMI prediction (poster).',
        citation:
            "Yasin, Y., Sun, Y. H., & Lee, K. (2022).\n\n" +
            "A machine learning approach for predicting children's future BMI [Poster].\n\n" +
            'Canadian Developmental Psychology Conference.',
        doi: '/assets/docs/poster-childbmi.pdf',
        thumb: '/assets/images/publication_childbmi.png',
        links: [
            { label: 'Demo', href: 'https://kang-lee-lab-surveys.vercel.app/survey/child-bmi', iconClass: 'fas fa-play-circle' },
            { label: 'PDF', href: '/assets/docs/poster-childbmi.pdf', iconClass: 'fas fa-file-pdf' },
            { label: 'Code', href: 'https://github.com/kang-lee-lab/child_bmi_prediction', iconClass: 'fas fa-code' },
        ],
        bibtex:
            '@inproceedings{Yasin2022BMI,\n' +
            "  title={A machine learning approach for predicting children's future {BMI}},\n" +
            '  author={Yasin, Yousef and Sun, Yuan Hong and Lee, Kang},\n' +
            '  booktitle={Canadian Developmental Psychology Conference},\n' +
            '  year={2022},\n' +
            '  note={Poster}\n' +
            '}',
    },
];

class Publications extends HTMLElement {
    connectedCallback() {
        var self = this;
        var sorted = PUBLICATION_ENTRIES.slice().sort(function (a, b) {
            if (b.year !== a.year) {
                return b.year - a.year;
            }
            return (b.seq || 0) - (a.seq || 0);
        });
        var idPrefix = 'pcl-' + String(Date.now()) + '-' + String(Math.random()).slice(2, 8);
        var cards = sorted
            .map(function (pub, index) {
                return renderPublicationCard(pub, index, idPrefix);
            })
            .join('');
        this.innerHTML =
            '<div class="publications publications-cards">' +
            cards +
            '<p class="pub-profiles">' +
            '<a href="https://scholar.google.com/citations?hl=en&user=bbtplDkAAAAJ&view_op=list_works&gmla=AJsN-F4COolLEfdgE4iCWldQ-NS9XYUCR5fAPNxaEnJmw0C_VnRX9D0330aSstBiPzdrgi9lJ_ueu85EiVneGUbauuNtqvL3uSWMXhNprQDV_4_cdGrDhYA">Google Scholar</a>' +
            ' · <a href="https://www.researchgate.net/profile/Yuan-Hong-Sun">ResearchGate</a>' +
            ' · <a href="https://orcid.org/0000-0002-2343-0340">ORCID</a>' +
            '</p>' +
            '</div>';

        if (!this._pubCiteClickBound) {
            this._pubCiteClickBound = true;
            this.addEventListener('click', function (e) {
                var btn = e.target.closest('.pub-cite-btn');
                if (!btn || !self.contains(btn)) {
                    return;
                }
                var panelId = btn.getAttribute('aria-controls');
                var panel = panelId ? document.getElementById(panelId) : null;
                if (!panel || !self.contains(panel)) {
                    return;
                }
                var card = btn.closest('.pub-card');
                var willOpen = btn.getAttribute('aria-expanded') !== 'true';

                if (willOpen && card) {
                    card.querySelectorAll('.pub-cite-expand').forEach(function (p) {
                        p.hidden = true;
                    });
                    card.querySelectorAll('.pub-cite-btn').forEach(function (b) {
                        b.setAttribute('aria-expanded', 'false');
                        b.classList.remove('pub-cite-btn--active');
                    });
                }

                if (willOpen) {
                    btn.setAttribute('aria-expanded', 'true');
                    panel.hidden = false;
                    btn.classList.add('pub-cite-btn--active');
                } else {
                    btn.setAttribute('aria-expanded', 'false');
                    panel.hidden = true;
                    btn.classList.remove('pub-cite-btn--active');
                }
            });
        }
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

// Legacy aliases for backward compatibility
class HeaderRoot extends Header {}
class HeaderPages extends Header {}

customElements.define('main-head', Head);
customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('publications-list', Publications);
customElements.define('main-header-root', HeaderRoot);
customElements.define('main-header-pages', HeaderPages);

