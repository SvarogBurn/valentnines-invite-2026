// Email notification via Formspree
function sendEmailNotification(date, activity, wishes) {
    const formData = new FormData();
    
    formData.append('_subject', 'They said yes');
    formData.append('date', date);
    formData.append('activity', activity);
    formData.append('wishes', wishes || 'None specified');
    formData.append('message', buildEmailMessage(date, activity, wishes));
    
    fetch('https://formspree.io/f/xqellzwn', { //xqellzwn
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Notification sent successfully!');
        } else {
            console.warn('Notification failed:', response.status);
        }
    })
    .catch(err => {
        console.warn('Notification error:', err);
    });
}

function buildEmailMessage(date, activity, wishes) {
    return `Your Valentine accepted! 🎉\n\nDate: ${date}\nActivity: ${activity}\nWishes: ${wishes || 'None specified'}\n\nTime to prepare! 💌`;
}
