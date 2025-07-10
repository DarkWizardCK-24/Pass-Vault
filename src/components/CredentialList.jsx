import { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaBitbucket,
  FaVimeo,
  FaLink,
  FaGlobe,
  FaCopy,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const socialOptions = [
  { value: "Instagram", icon: FaInstagram },
  { value: "LinkedIn", icon: FaLinkedin },
  { value: "Github", icon: FaGithub },
  { value: "Bitbucket", icon: FaBitbucket },
  { value: "Vercel", icon: FaVimeo },
  { value: "Linktree", icon: FaLink },
  { value: "Other", icon: FaGlobe },
];

const CredentialList = ({
  credentials,
  setEditingCredential,
  deleteCredential,
}) => {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEdit = (cred) => {
    setEditingCredential(cred);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this credential?")) {
      deleteCredential(id);
    }
  };

  const handleSocialIconClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="space-y-4">
      {credentials.length === 0 ? (
        <p className="text-center text-gray-400 text-base sm:text-lg">
          No credentials saved yet.
        </p>
      ) : (
        credentials.map((cred) => {
          const SocialIcon =
            socialOptions.find((opt) => opt.value === cred.socialAccount)
              ?.icon || FaGlobe;
          return (
            <div
              key={cred.id}
              className="bg-gray-800 p-4 sm:p-5 rounded-lg shadow-lg border-l-4 border-green-600 transition-all duration-200 hover:shadow-xl overflow-hidden"
            >
              <div className="flex flex-col space-y-3">
                {/* Header: Social Icon and Title */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleSocialIconClick(cred.url)}
                    className="flex-shrink-0 bg-green-900 p-2 rounded-full hover:bg-green-800 transition duration-200"
                    title={`Open ${cred.socialAccount} URL`}
                  >
                    <SocialIcon className="text-3xl sm:text-4xl text-green-300" />
                  </button>
                  <h3 className="text-base sm:text-lg font-bold text-green-300 truncate">
                    {cred.socialAccount}
                  </h3>
                </div>

                {/* Credential Details */}
                <div className="flex flex-col space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <span className="font-medium w-20 sm:w-24 flex-shrink-0">Username:</span>
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <span className="truncate flex-1">{cred.username}</span>
                      <button
                        onClick={() =>
                          copyToClipboard(cred.username, `username-${cred.id}`)
                        }
                        className="bg-green-700 hover:bg-green-600 text-white p-1.5 rounded-full transition duration-200 flex-shrink-0"
                        title="Copy Username"
                      >
                        <FaCopy
                          className={`text-sm sm:text-base ${
                            copiedField === `username-${cred.id}`
                              ? "text-green-300"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-20 sm:w-24 flex-shrink-0">Password:</span>
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <span className="truncate flex-1">{cred.password}</span>
                      <button
                        onClick={() =>
                          copyToClipboard(cred.password, `password-${cred.id}`)
                        }
                        className="bg-green-700 hover:bg-green-600 text-white p-1.5 rounded-full transition duration-200 flex-shrink-0"
                        title="Copy Password"
                      >
                        <FaCopy
                          className={`text-sm sm:text-base ${
                            copiedField === `password-${cred.id}`
                              ? "text-green-300"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-20 sm:w-24 flex-shrink-0">URL:</span>
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <a
                        href={cred.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline truncate flex-1"
                        title={cred.url}
                      >
                        {cred.url}
                      </a>
                      <button
                        onClick={() =>
                          copyToClipboard(cred.url, `url-${cred.id}`)
                        }
                        className="bg-green-700 hover:bg-green-600 text-white p-1.5 rounded-full transition duration-200 flex-shrink-0"
                        title="Copy URL"
                      >
                        <FaCopy
                          className={`text-sm sm:text-base ${
                            copiedField === `url-${cred.id}`
                              ? "text-green-300"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(cred)}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-md text-sm transition duration-200 flex items-center"
                    title="Edit Credential"
                  >
                    <FaEdit className="text-sm mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cred.id)}
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-1 px-3 rounded-md text-sm transition duration-200 flex items-center"
                    title="Delete Credential"
                  >
                    <FaTrash className="text-sm mr-1" /> Delete
                  </button>
                </div>

                {/* Timestamps */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Created: {new Date(cred.createdAt).toLocaleString()}</p>
                  {cred.updatedAt && (
                    <p>Updated: {new Date(cred.updatedAt).toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CredentialList;