// form and display 
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var sharableLinkContainer = document.getElementById('sharable-link-container');
var sharableLinkElement = document.getElementById('sharable-link');
var downloadPdfButtom = document.getElementById('download-pdf');
// form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // collecting input stuff
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    //save form data in local storage with username as keyword
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    //generate dynamic resume 
    var resumeHTML = "\n    <h2>Editable Resume</h2>\n     <h3>Personal information</h3>\n     <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n     <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n     <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n    <h3>Education<h3>\n     <p contenteditable=\"true\">").concat(education, "</p>\n\n      <h3>Experience<h3>\n     <p contenteditable=\"true\">").concat(experience, "</p>\n\n\n      <h3>Skills<h3>\n     <p contenteditable=\"true\">").concat(skills, "</p>\n\n     ");
    //display
    resumeDisplayElement.innerHTML = resumeHTML;
    // generate sharable link url from username
    var sharableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //display sharable link
    sharableLinkContainer.style.display = 'block';
    sharableLinkElement.href = sharableURL;
    sharableLinkElement.textContent = sharableURL;
});
//handle pdf download
downloadPdfButtom.addEventListener('click', function () {
    window.print();
});
//prefill the form based on the username in the url
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
