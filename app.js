const firebaseConfig = {
  apiKey: "AIzaSyEXEMPLE-T9F0Gi7Y...",
  authDomain: "paynreceive.firebaseapp.com",
  projectId: "paynreceive",
  storageBucket: "paynreceive.appspot.com",
  messagingSenderId: "123456789000",
  appId: "1:123456789000:web:abcd1234efgh"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
function checkStatus() {
  const code = document.getElementById("trackingCode").value.trim();
  const resultDiv = document.getElementById("result");
  if (!code) {
    resultDiv.innerText = "Veuillez entrer un code valide.";
    return;
  }
  db.collection("colis").doc(code).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        resultDiv.innerText = `Statut : ${data.statut} | Destination : ${data.destination}`;
      } else {
        resultDiv.innerText = "Code introuvable. Vérifiez votre code.";
      }
    })
    .catch(error => {
      resultDiv.innerText = "Erreur de connexion.";
      console.error("Erreur :", error);
    });
}
