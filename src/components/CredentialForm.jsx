import { useState, useEffect } from "react";

const socialOptions = [
  { value: "Instagram", icon: "FaInstagram" },
  { value: "LinkedIn", icon: "FaLinkedin" },
  { value: "Github", icon: "FaGithub" },
  { value: "Bitbucket", icon: "FaBitbucket" },
  { value: "Vercel", icon: "FaVimeo" },
  { value: "Linktree", icon: "FaLink" },
  { value: "Other", icon: "FaGlobe" },
];

const CredentialForm = ({
  addCredential,
  updateCredential,
  editingCredential,
  setEditingCredential,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    url: "",
    socialAccount: "Instagram",
  });

  useEffect(() => {
    if (editingCredential) {
      setFormData(editingCredential);
    }
  }, [editingCredential]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCredential) {
      updateCredential({ ...formData, id: editingCredential.id });
    } else {
      addCredential(formData);
    }
    setFormData({
      username: "",
      password: "",
      url: "",
      socialAccount: "Instagram",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-green-300">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white text-sm sm:text-base focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-green-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white text-sm sm:text-base focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-green-300">
            URL
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white text-sm sm:text-base focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-green-300">
            Social Account
          </label>
          <select
            name="socialAccount"
            value={formData.socialAccount}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white text-sm sm:text-base focus:ring-green-500 focus:border-green-500"
          >
            {socialOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-sm sm:text-base transition duration-200"
      >
        {editingCredential ? "Update Credential" : "Add Credential"}
      </button>
      {editingCredential && (
        <button
          type="button"
          onClick={() => {
            setEditingCredential(null);
            setFormData({
              username: "",
              password: "",
              url: "",
              socialAccount: "Instagram",
            });
          }}
          className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md text-sm sm:text-base transition duration-200"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CredentialForm;
