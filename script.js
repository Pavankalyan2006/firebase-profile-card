// Firebase config (replace with your project values)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwNcuNy36VPHzV5o0RGYbUNx0EHIk5g7Q",
  authDomain: "heartfund-cf797.firebaseapp.com",
  projectId: "heartfund-cf797",
  storageBucket: "heartfund-cf797.firebasestorage.app",
  messagingSenderId: "112363029723",
  appId: "1:112363029723:web:b5a15620153644b26ff8fe",
  measurementId: "G-C3CLDW034V"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function toggleForm() {
  const form = document.getElementById('formContainer');
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
}

async function createProfileCard() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const bio = document.getElementById('bio').value.trim();

  if (!name || !email) {
    alert("Name and Email are required.");
    return;
  }

  await db.collection("profiles").add({ name, email, bio });

  displayProfileCard({ name, email, bio });

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('bio').value = '';
  document.getElementById('formContainer').style.display = 'none';
}

function displayProfileCard(data) {
  const card = document.createElement('div');
  card.className = 'profile-card';
  card.innerHTML = `
    <h3>${data.name}</h3>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Bio:</strong> ${data.bio || "N/A"}</p>
  `;
  document.getElementById('cardContainer').appendChild(card);
}

// Load existing cards on page load
window.onload = async function() {
  const snapshot = await db.collection("profiles").get();
  snapshot.forEach(doc => {
    displayProfileCard(doc.data());
  });
};
