//Initialization and Language Content Update

document.addEventListener('DOMContentLoaded', () => {
    const languages = {
        en: {
            title: "We are on the hunt for the One!",
            ad: "Are you the One?!",
            join: "Our team will respond within 48 hours!",
            videoSrc: "video-placeholder.mp4",
            moreJobs: "Generate your QR Code & Apply Now!"
        },
        zh: {
            title: "寻找TA！",
            ad: "你是TA吗？！",
            join: "我们的团队将在48小时内回复！",
            videoSrc: "video-placeholder.mp4",
            moreJobs: "生成您的QR码并立即申请！"
        },
        jp: {
            title: "THE ONEを探しています！",
            ad: "あなたはTHE ONEですか？！",
            join: "チームからの回答まで48時間以内にお返事いたします！",
            videoSrc: "video-placeholder.mp4",
            moreJobs: "QRコードを生成して今すぐ応募！"
        }
    };
    const hotJobLink = document.getElementById('hot-job');
    const applyBtn = document.getElementById('apply-btn');

    hotJobLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = applyBtn.getAttribute('href');
    });
    const dropdown = document.querySelector('.language-dropdown');
    const selectDropdown = document.getElementById('languages');
    const title = document.querySelector('.intro-text h1');
    const adSticker = document.querySelector('.hot-job p');
    const footerText = document.querySelector('.find-job p');
    const video = document.querySelector('.intro-video video');
    const moreJobsButton = document.querySelector('.generate-btn');

    // Function to update content based on selected language
    function updateContent(language) {
        const langContent = languages[language];
        if (langContent) {
            title.textContent = langContent.title;
            adSticker.textContent = langContent.ad;
            footerText.textContent = langContent.join;
            video.src = langContent.videoSrc;
            moreJobsButton.textContent = langContent.moreJobs;
        }
    }

    // Event listener for language selection in dropdown menu
    dropdown.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.tagName === 'A') {
            const selectedLanguage = event.target.dataset.lang;
            updateContent(selectedLanguage);
            updateURLParameter('lang', selectedLanguage);
        }
    });

    // Event listener for language selection in select#languages dropdown
    selectDropdown.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateContent(selectedLanguage);
        updateURLParameter('lang', selectedLanguage);
    });

    // Function to update URL parameter
    function updateURLParameter(param, value) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set(param, value);
        window.history.replaceState(null, '', currentUrl);
    }
});


//Generating Final URL with UTM Parameters
// Function to generate final URL with UTM parameters
function generateFinalURL(baseURL, source, medium) {
    let finalURL = new URL(baseURL);
    let iisValue, iisnValue;

    switch (medium) {
        case 'social':
            iisValue = "Social Media";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'career':
            iisValue = "Career Fair";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'digital':
            iisValue = "Digital Ad";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'mobile':
            iisValue = "Mobile Stand";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'poster':
            iisValue = "Poster";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'email':
            iisValue = "Email Blast";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'physical':
            iisValue = "Physical QR";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'banner1':
            iisValue = "Banner 1";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'banner2':
            iisValue = "Banner 2";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        case 'fotg':
            iisValue = "FoTG";
            iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
            break;
        default:
            console.error("Unknown medium");
            return baseURL; // Return base URL if medium is not recognized
    }
  // Replace "utm_source=" and "utm_medium=" in source and medium
  source = source.replace('utm_source=', '');
  medium = medium.replace('utm_medium=', '');
    finalURL.searchParams.set('mode', 'job');
    finalURL.searchParams.set('iis', encodeURIComponent(iisValue).replace(/%20/g, '+'));
    finalURL.searchParams.set('iisn', encodeURIComponent(iisnValue).replace(/%2B/g, '+'));

    return decodeURIComponent(finalURL.toString());
}


//Handling Click Event on Generate Button


// Function to open QR modal and display QR code and job URL
function openQrModal(url) {
    const modal = document.getElementById('qr-modal');
    const span = document.querySelector('.close');
    const qrCanvas = document.getElementById('qr-code');
    const jobUrl = document.getElementById('job-url');

    jobUrl.href = url;
    jobUrl.textContent = url;

    new QRious({
        element: qrCanvas,
        value: url,
        size: 200,
    });

    modal.style.display = "block";

    span.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const selectedLanguage = document.getElementById('language-select').value;
            const selectedLocation = document.getElementById('location-select').value;
            const selectedJob = document.getElementById('job-type-select').value;

            // Check if options are selected
            if (!selectedLanguage || !selectedLocation || !selectedJob) {
                alert('Please select all options.');
                return;
            }

            // Ensure jsonData is available
            if (!jsonData) {
                alert('Failed to fetch job data. Please try again later.');
                return;
            }

            const jobData = jsonData.find(item => item.Language === selectedLanguage && item.Location === selectedLocation && item.Positions === selectedJob);

            if (jobData) {
                // Get utm_source and utm_medium from current URL
                const urlParams = new URLSearchParams(window.location.search);
                const sourceParam = urlParams.get('utm_source') || '';
                const mediumParam = urlParams.get('utm_medium') || '';

                const finalLink = generateFinalURL(jobData["Evergreen link"], sourceParam, mediumParam);
                openQrModal(finalLink);
            } else {
                alert('Evergreen link not found for the selected job.');
            }
        });
    } else {
        console.error('#generate-btn button not found.');
    }

    // Fetch JSON data (assuming this part remains unchanged)
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch job data.');
            }
            return response.json();
        })
        .then(data => {
            jsonData = data; // Assign fetched data to jsonData
        })
        .catch(error => {
            console.error('Error fetching job data:', error);
            alert('Failed to fetch job data. Please try again later.');
        });
});




document.addEventListener('DOMContentLoaded', () => {

    // Function to open QR modal
    function openQrModal(url) {
        const modal = document.getElementById('qr-modal');
        const span = document.querySelector('.close');
        const qrCanvas = document.getElementById('qr-code');
        const jobUrl = document.getElementById('job-url');

        jobUrl.href = url;
        jobUrl.textContent = url;

        new QRious({
            element: qrCanvas,
            value: url,
            size: 200,
        });

        modal.style.display = "block";

        span.onclick = () => {
            modal.style.display = "none";
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});

//Fetching JSON Data and Populating Dropdowns
document.addEventListener('DOMContentLoaded', () => {
    let jsonData = [];
    const languageDropdown = document.getElementById('language-select');
    const locationDropdown = document.getElementById('location-select');
    const jobDropdown = document.getElementById('job-type-select');

    // Fetch JSON data and populate dropdowns
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown(languageDropdown, ['Select your language', ...getUniqueValues(data, 'Language')]);
            populateDropdown(locationDropdown, ['Choose your location']);
            populateDropdown(jobDropdown, ['Choose your job']);
            jsonData = data;
        })
        .catch(error => console.error('Error loading JSON data:', error));

    // Event listeners for dropdown changes
    languageDropdown.addEventListener('change', handleLanguageChange);
    locationDropdown.addEventListener('change', handleLocationChange);

    function handleLanguageChange() {
        const selectedLanguage = languageDropdown.value;
        const locations = getUniqueValues(jsonData.filter(item => item.Language === selectedLanguage), 'Location');
        populateDropdown(locationDropdown, ['Choose your location', ...locations]);
        populateDropdown(jobDropdown, ['Choose your job']);
    }

    function handleLocationChange() {
        const selectedLanguage = languageDropdown.value;
        const selectedLocation = locationDropdown.value;
        const jobs = getUniqueValues(jsonData.filter(item => item.Language === selectedLanguage && item.Location === selectedLocation), 'Positions');
        populateDropdown(jobDropdown, ['Choose your job', ...jobs]);
    }

    function populateDropdown(selectElement, options) {
        selectElement.innerHTML = '';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }

    function getUniqueValues(data, key) {
        return [...new Set(data.map(item => item[key]))];
    }
});

//Handling Click Event on Apply Button

document.addEventListener('DOMContentLoaded', () => {
    const customLink = document.getElementById('apply-btn');

    if (customLink) {
        customLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default action of the link

            const originalUrl = customLink.getAttribute('href');
            const currentUrl = window.location.href;
            const url = new URL(currentUrl);
            const utmSource = url.searchParams.get('utm_source');
            const utmMedium = url.searchParams.get('utm_medium');

            if (utmSource && utmMedium) {
                const finalUrl = generateFinalURL(originalUrl, utmSource, utmMedium);
                customLink.setAttribute('href', finalUrl); // Update the href attribute
                window.open(finalUrl, '_blank'); // Open the modified URL in a new tab
            } else {
                console.error("Missing utm_source or utm_medium parameters in the current URL");
            }
        });
    } else {
        console.error("#apply-btn button not found.");
    }
    function updateURLWithUTMParams(url, source, medium) {
        const finalURL = new URL(url);
        finalURL.searchParams.set('utm_source', encodeURIComponent(source));
        finalURL.searchParams.set('utm_medium', encodeURIComponent(medium));
        finalURL.searchParams.set('utm_campaign', 'your_campaign_value');
        return finalURL.toString();
    }
    function generateFinalURL(baseURL, source, medium) {
        let finalURL = new URL(baseURL);
        let iisValue, iisnValue;

        switch (medium) {
            case 'social':
                iisValue = "Social Media";
                iisnValue = `${encodeURIComponent(source).replace(/%2B/g, '+')}+Ads`;
                break;
           case 'Career':
                iisValue = "Career fair";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'Digital':
                iisValue = "Digital Ad";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'mobile':
                iisValue = "mobile stand";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'Career':
                iisValue = "Career Fair";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'Mobile':
                 iisValue = "Mobile Stand";
                 iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                    break;
            case 'Poster':
                iisValue = "Poster";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                 break;
                    case 'Social':
                iisValue = "Social Media";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'Flyers':
                iisValue = "Flyers";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'Physical':
                iisValue = "Physical QR";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'FoTG':
                iisValue = "FoTG";
                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                break;
            case 'banner1':
                    iisValue = "banner1";
                    iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                    break;
            case 'banner2':
                    iisValue = "banner2";
                    iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                    break;
                    case 'Email':
                                iisValue = "Email Blast";
                                iisnValue = encodeURIComponent(source).replace(/%2B/g, '+');
                                break;  
          
            default:
                console.error("Unknown utm_medium");
                return baseURL;
        }

        finalURL.searchParams.set('mode', 'job');
        finalURL.searchParams.set('iis', encodeURIComponent(iisValue).replace(/%20/g, '+'));
        finalURL.searchParams.set('iisn', encodeURIComponent(iisnValue).replace(/%2B/g, '+'));

        return decodeURIComponent(finalURL.toString());
    }
});

//Handling Click Events for Share Buttons

// Event listeners for share buttons
document.getElementById("share-button-whatsapp").addEventListener("click", function() {
    const message = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
    const message2 = "\n\nLet's grow together! 🚀 #JoinTheTeam";
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message + "\n\n" + document.getElementById('job-url').href + "\n\n" + message2)}`;
    window.open(whatsappLink, "_blank");
});

document.getElementById("share-button-line").addEventListener("click", function() {
    const message = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
    const message2 = "\n\nLet's grow together! 🚀 #JoinTheTeam";
    const lineLink = `https://line.me/R/msg/text/?${encodeURIComponent(message + "\n\n" + document.getElementById('job-url').href + "\n\n" + message2)}`;
    window.open(lineLink, "_blank");
});

document.getElementById("share-button-facebook").addEventListener("click", function() {
    const facebookMessage = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
    const facebookMessage2 = "\n\nLet's grow together! 🚀 #JoinTheTeam";
    const facebookCaption = encodeURIComponent(facebookMessage + "\n\n" + document.getElementById('job-url').href + "\n\n" + facebookMessage2);
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.getElementById('job-url').href)}&quote=${facebookCaption}`;
    window.open(facebookLink, "_blank", "width=600,height=400");
});

document.getElementById("share-button-IG").addEventListener("click", function() {
    const message = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
    const message2 = "\n\nLet's grow together! 🚀 #JoinTheTeam";
    const instagramLink = `https://www.instagram.com/?url=${encodeURIComponent(document.getElementById('job-url').href + "\n\n" + message + "\n\n" + message2)}`;
    window.open(instagramLink, "_blank");
});

