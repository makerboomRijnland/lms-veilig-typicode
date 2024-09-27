const API_URL = "https://my-json-server.typicode.com/makerboomRijnland/lms-veilig-typicode";

class Contact {
    static resource = '/contacts';

    constructor(properties = {}) {
        this.name = properties.name;
        this.phone = properties.phone;
    }

    static async getAll() {
        const url = `${API_URL}/${this.resource}`;

        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Failed to fetch contacts: ${response.status}`);
        }
        const result = await response.json();
        const contacts = [];
        
        for(const object of result) {
            const contact = new Contact(object);
            contacts.push(contact);
        }

        return contacts;
    }
}

const contactsPromise = Contact.getAll();

function showContactList() {
    const list = document.getElementById('contact-list');
    const template = document.getElementById('contact-template');

    contactsPromise.then(contacts => {
        for(const contact of contacts) {
            const element = template.content.cloneNode(true);
            element.querySelector('.name').innerHTML = contact.name;
            element.querySelector('.phone').innerHTML = contact.phone;
            element.querySelector('.phone').href = `tel:${contact.phone}`;
            list.appendChild(element);
        }
    });
    
}

showContactList();