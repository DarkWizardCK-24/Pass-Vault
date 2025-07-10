import { useState, useEffect } from "react";
import CredentialForm from "./components/CredentialForm";
import CredentialList from "./components/CredentialList";

function App() {
  const [credentials, setCredentials] = useState([]);
  const [editingCredential, setEditingCredential] = useState(null);

  useEffect(() => {
    const storedCredentials = localStorage.getItem("passVaultCredentials");
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passVaultCredentials", JSON.stringify(credentials));
  }, [credentials]);

  const addCredential = (credential) => {
    setCredentials([
      ...credentials,
      { ...credential, id: Date.now(), createdAt: new Date().toISOString() },
    ]);
  };

  const updateCredential = (updatedCredential) => {
    setCredentials(
      credentials.map((cred) =>
        cred.id === updatedCredential.id
          ? { ...updatedCredential, updatedAt: new Date().toISOString() }
          : cred
      )
    );
    setEditingCredential(null);
  };

  const deleteCredential = (id) => {
    setCredentials(credentials.filter((cred) => cred.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-6 text-center">
          <i className="ri-shield-keyhole-line mr-2 text-2xl sm:text-3xl md:text-4xl"></i>
          PassVault
        </h1>
        <CredentialForm
          addCredential={addCredential}
          updateCredential={updateCredential}
          editingCredential={editingCredential}
          setEditingCredential={setEditingCredential}
        />
        <CredentialList
          credentials={credentials}
          setEditingCredential={setEditingCredential}
          deleteCredential={deleteCredential}
        />
      </div>
    </div>
  );
}

export default App;
