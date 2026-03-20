let user = { name: "Gemini", email: "old@example.com" };

function updateEmail(person, newEmail) {
    person.email = newEmail;
    return person;
}

console.log(updateEmail(user, "new@google.com"));