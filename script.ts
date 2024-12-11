// form and display 
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const sharableLinkContainer = document.getElementById('sharable-link-container') as HTMLDivElement;
const sharableLinkElement = document.getElementById('sharable-link') as HTMLAnchorElement;
const downloadPdfButtom = document.getElementById('download-pdf') as HTMLButtonElement;

// form submission
form.addEventListener('submit', (event:Event) => {
    event.preventDefault();
     
    // collecting input stuff
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    //save form data in local storage with username as keyword
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
     };
     localStorage.setItem(username, JSON.stringify(resumeData));

    //generate dynamic resume 
    const resumeHTML = `
    <h2>Editable Resume</h2>
     <h3>Personal information</h3>
     <p><b>Name:</b><span contenteditable="true">${name}</span></p>
     <p><b>Email:</b><span contenteditable="true">${email}</span></p>
     <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

    <h3>Education<h3>
     <p contenteditable="true">${education}</p>

      <h3>Experience<h3>
     <p contenteditable="true">${experience}</p>


      <h3>Skills<h3>
     <p contenteditable="true">${skills}</p>

     `;

    //display
    resumeDisplayElement.innerHTML = resumeHTML;

    // generate sharable link url from username
    const sharableURL = 
    `${window.location.origin}?username=${encodeURIComponent(username)}`;

    //display sharable link
    sharableLinkContainer.style.display = 'block';
    sharableLinkElement.href = sharableURL;
    sharableLinkElement.textContent= sharableURL;
});

//handle pdf download
downloadPdfButtom.addEventListener('click',() => {
    window.print();
});

//prefill the form based on the username in the url
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if(username) {
        const savedResumeData = localStorage.getItem(username);

        if(savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;

        }
    }

});
